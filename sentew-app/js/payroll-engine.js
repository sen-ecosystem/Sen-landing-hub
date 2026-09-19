/* ================================================================
   SEN TEW — PAYROLL ENGINE v1.0 (multi-pays / panafricain)
   Moteur générique de calcul de bulletin de paie.
   Les taux par pays sont stockés dans Supabase (table payroll_configs)
   et modifiables depuis l'admin (Paramètres > Pays) sans toucher au code.
   Si la table est vide/inaccessible, on retombe sur les valeurs par
   défaut ci-dessous (DEFAULT_COUNTRY_CONFIGS), pré-remplies à partir
   de sources officielles quand disponibles.
   ================================================================ */

var PAYROLL = { configs: {}, ready: false };

var DEFAULT_COUNTRY_CONFIGS = {
  SN: {
    code:'SN', name:'Sénégal', currency:'XOF', fiable:true,
    pension_name:'IPRES', pension_employee:5.6, pension_employer:8.4, pension_ceiling:432000,
    family_name:'CSS (prestations familiales)', family_employer:7.0,
    at_mp_name:'Accident du travail', at_mp_employer:2.0,
    other_employer:[{name:'CFCE', rate:3.0}],
    trimf:true,
    ir_brackets:[[0,50000,0],[50000,166667,20],[166667,333333,26],[333333,666667,31],[666667,null,37]],
    notes:'Taux IPRES/CSS confirmés (CLEISS). IR mensuel simplifié. TRIMF calculée séparément.'
  },
  CI: {
    code:'CI', name:"Côte d'Ivoire", currency:'XOF', fiable:false,
    pension_name:'CNPS Retraite', pension_employee:6.3, pension_employer:7.7, pension_ceiling:3375000,
    family_name:'CNPS Prestations familiales', family_employer:5.0,
    at_mp_name:'Accident du travail', at_mp_employer:2.0,
    other_employer:[{name:'CMU (forfait/mois)', flat:1000}],
    trimf:false,
    ir_brackets:[[0,75000,0],[75000,240000,15],[240000,800000,20],[800000,2400000,25],[2400000,null,35]],
    notes:'⚠️ Taux CNPS et barème IGR à FAIRE VALIDER par un comptable ivoirien.'
  },
  CM: {
    code:'CM', name:'Cameroun', currency:'XAF', fiable:false,
    pension_name:'CNPS Pension', pension_employee:4.2, pension_employer:4.2, pension_ceiling:750000,
    family_name:'CNPS Allocations familiales', family_employer:7.0,
    at_mp_name:'Risques professionnels', at_mp_employer:2.5,
    other_employer:[],
    trimf:false,
    ir_brackets:[[0,166667,0],[166667,250000,10],[250000,416667,15],[416667,833333,25],[833333,null,35]],
    notes:'⚠️ IRPP annuel converti en mensuel — à FAIRE VALIDER par un comptable camerounais.'
  },
  ML: {
    code:'ML', name:'Mali', currency:'XOF', fiable:false,
    pension_name:'INPS Vieillesse', pension_employee:3.6, pension_employer:5.4, pension_ceiling:0,
    family_name:'INPS Prestations familiales', family_employer:8.0,
    at_mp_name:'AMO (assurance maladie)', at_mp_employer:3.06,
    other_employer:[],
    trimf:false,
    ir_brackets:[[0,175000,0],[175000,600000,5],[600000,1200000,13],[1200000,1800000,20],[1800000,2400000,28],[2400000,3500000,34],[3500000,null,37]],
    notes:'⚠️ Taux INPS/ITS à FAIRE VALIDER par un comptable malien.'
  },
  AUTRE: {
    code:'AUTRE', name:'Autre pays (personnalisé)', currency:'XOF', fiable:false,
    pension_name:'Caisse retraite', pension_employee:0, pension_employer:0, pension_ceiling:0,
    family_name:'Prestations familiales', family_employer:0,
    at_mp_name:'Accident du travail', at_mp_employer:0,
    other_employer:[],
    trimf:false,
    ir_brackets:[[0,null,0]],
    notes:'Configure librement ce pays depuis Paramètres > Pays (aucun taux pré-rempli).'
  }
};

var _PAYROLL_SUPA = (typeof SUPA !== 'undefined') ? SUPA : (typeof SUPA_URL !== 'undefined' ? SUPA_URL : '');

async function payrollInit(){
  PAYROLL.configs = JSON.parse(JSON.stringify(DEFAULT_COUNTRY_CONFIGS));
  try{
    var r = await fetch(_PAYROLL_SUPA+'/rest/v1/payroll_configs?select=*', {headers:{apikey:SUPA_KEY, Authorization:'Bearer '+SUPA_KEY}});
    if(r.ok){
      var rows = await r.json();
      if(Array.isArray(rows) && rows.length){
        rows.forEach(function(row){ PAYROLL.configs[row.code] = row.config_json ? Object.assign({code:row.code,name:row.name,currency:row.currency}, row.config_json) : row; });
      }
    }
  }catch(e){ /* table absente => on garde les defaults */ }
  PAYROLL.ready = true;
  return PAYROLL.configs;
}

async function payrollSaveConfig(code, cfg){
  cfg.code = code;
  try{
    await fetch(_PAYROLL_SUPA+'/rest/v1/payroll_configs', {
      method:'POST',
      headers:{apikey:SUPA_KEY, Authorization:'Bearer '+SUPA_KEY, 'Content-Type':'application/json', 'Prefer':'resolution=merge-duplicates,return=minimal'},
      body: JSON.stringify({code:code, name:cfg.name, currency:cfg.currency, config_json:cfg})
    });
    PAYROLL.configs[code] = cfg;
    return true;
  }catch(e){ return false; }
}

function calcIR(taxable, brackets){
  var ir = 0;
  for(var i=0;i<brackets.length;i++){
    var lo=brackets[i][0], hi=brackets[i][1], rate=brackets[i][2];
    if(taxable<=lo) continue;
    var top = (hi===null || hi===undefined) ? taxable : Math.min(taxable, hi);
    if(top>lo) ir += (top-lo)*rate/100;
  }
  return Math.max(0, Math.round(ir));
}

function calcTRIMF(brut){
  if(brut<=0) return 0;
  if(brut<50000) return 100;
  if(brut<100000) return 300;
  if(brut<150000) return 600;
  if(brut<200000) return 1000;
  if(brut<300000) return 1500;
  if(brut<400000) return 2000;
  if(brut<600000) return 3000;
  return 4000;
}

function calcBulletinPan(countryCode, base, bonus, ded){
  var cfg = (PAYROLL.configs && PAYROLL.configs[countryCode]) || DEFAULT_COUNTRY_CONFIGS.SN;
  var brut = (base||0) + (bonus||0);

  var pensionBase = cfg.pension_ceiling>0 ? Math.min(brut, cfg.pension_ceiling) : brut;
  var pensionEmp   = Math.round(pensionBase * (cfg.pension_employee||0) / 100);
  var pensionPatr  = Math.round(pensionBase * (cfg.pension_employer||0) / 100);

  var familyPatr = Math.round(brut * (cfg.family_employer||0) / 100);
  var atmpPatr    = Math.round(brut * (cfg.at_mp_employer||0) / 100);

  var otherPatr = 0, otherLines = [];
  (cfg.other_employer||[]).forEach(function(o){
    var amt = o.flat!=null ? o.flat : Math.round(brut*(o.rate||0)/100);
    otherPatr += amt;
    otherLines.push({name:o.name, amount:amt});
  });

  var trimf = cfg.trimf ? calcTRIMF(brut) : 0;
  var taxable = brut - pensionEmp;
  var ir = calcIR(taxable, cfg.ir_brackets||[[0,null,0]]);
  var net = brut - pensionEmp - ir - trimf - (ded||0);
  var coutEmployeur = brut + pensionPatr + familyPatr + atmpPatr + otherPatr;

  return {
    country:cfg.name, currency:cfg.currency, pension_name:cfg.pension_name,
    family_name:cfg.family_name, at_mp_name:cfg.at_mp_name, fiable:cfg.fiable,
    brut:brut, pensionEmp:pensionEmp, pensionPatr:pensionPatr,
    familyPatr:familyPatr, atmpPatr:atmpPatr,
    otherLines:otherLines, otherPatr:otherPatr,
    trimf:trimf, ir:ir, ded:ded||0,
    net:Math.round(net), coutEmployeur:Math.round(coutEmployeur)
  };
}

function payrollCountryOptions(selected){
  return Object.keys(PAYROLL.configs).map(function(k){
    var c = PAYROLL.configs[k];
    var flag = c.fiable ? '' : ' ⚠️';
    return '<option value="'+k+'"'+(k===selected?' selected':'')+'>'+c.name+flag+'</option>';
  }).join('');
}
