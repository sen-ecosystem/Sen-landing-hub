// ============================================
// SEN TEW - DATABASE (Version Africaine Premium)
// Ousseynou Lam - SEN ECOSYSTEM 2026
// ============================================

const CATEGORIES = [
  {id:1, name:"Mode & Vêtements", slug:"mode", icon:"👗", count:1245, 
    img:"https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500"},
  {id:2, name:"Électronique", slug:"tech", icon:"📱", count:2345, 
    img:"https://images.unsplash.com/photo-1592286927505-1def25115481?w=500"},
  {id:3, name:"Maison & Déco", slug:"maison", icon:"🏠", count:1876, 
    img:"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500"},
  {id:4, name:"Beauté & Cosmétique", slug:"beaute", icon:"💄", count:1234, 
    img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500"},
  {id:5, name:"Alimentation", slug:"food", icon:"🍎", count:2987, 
    img:"https://images.unsplash.com/photo-1587334207959-c2ee62dab1e2?w=500"},
  {id:6, name:"Bébé & Enfant", slug:"enfant", icon:"👶", count:1654, 
    img:"https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500"},
  {id:7, name:"Sport & Loisirs", slug:"sport", icon:"⚽", count:987, 
    img:"https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500"},
  {id:8, name:"Auto & Moto", slug:"auto", icon:"🚗", count:1234, 
    img:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500"},
  {id:9, name:"Artisanat Africain", slug:"artisanat", icon:"🎨", count:2456, 
    img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500", featured:true},
  {id:10, name:"Livres", slug:"livres", icon:"📚", count:1245, 
    img:"https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500"},
  {id:11, name:"Santé", slug:"sante", icon:"💊", count:1034, 
    img:"https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500"},
  {id:12, name:"Bijoux", slug:"bijoux", icon:"💎", count:1145, 
    img:"https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500"}
];

const PRODUCTS = [
  {
    id:1, name:"Sac à main chic cuir africain",
    price:15000, priceOld:25000, discount:40,
    seller:"Aïcha Couture", sellerRating:4.8, sellerVerified:true,
    category:"Mode & Vêtements", subcategory:"Sacs",
    stock:12, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600",
    rating:4.8, reviews:234,
    delivery:"Livraison 24h à Dakar", featured:true, promo:true,
    description:"Sac à main premium en cuir véritable, coupe élégante avec motifs africains authentiques. Parfait pour toutes occasions."
  },
  {
    id:2, name:"Écouteurs sans fil Pro",
    price:12000, priceOld:20000, discount:40,
    seller:"Tech Store Sénégal", sellerRating:4.7,
    category:"Électronique", subcategory:"Audio",
    stock:45, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600",
    rating:4.6, reviews:189, promo:true,
    description:"Écouteurs sans fil avec réduction de bruit active, autonomie 30h, son immersif."
  },
  {
    id:3, name:"Vase déco africain bogolan",
    price:8500, priceOld:14000, discount:40,
    seller:"Artisanat Dakar", sellerRating:4.9,
    category:"Artisanat Africain", subcategory:"Décoration",
    stock:8, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600",
    rating:4.9, reviews:87, promo:true, featured:true,
    description:"Vase décoratif fait main, motifs bogolan traditionnel du Mali. Pièce unique artisanale."
  },
  {
    id:4, name:"Beurre de karité pur 100%",
    price:4000, priceOld:7000, discount:43,
    seller:"Naturelle Sénégal", sellerRating:4.8,
    category:"Beauté & Cosmétique", subcategory:"Soins",
    stock:120, city:"Thiès", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600",
    rating:4.9, reviews:456, promo:true,
    description:"Beurre de karité 100% naturel, non raffiné, extrait du Burkina Faso. Hydratation profonde."
  },
  {
    id:5, name:"Robe Wax Premium Dakar",
    price:25000, priceOld:40000, discount:37,
    seller:"Boutique Aïcha Couture", sellerRating:4.8, sellerVerified:true,
    category:"Mode & Vêtements", subcategory:"Robes",
    stock:6, city:"Dakar", condition:"neuf",
    sizes:["S","M","L","XL"], colors:["Vert","Rouge","Or","Violet"],
    photo:"https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600",
    rating:4.8, reviews:234, featured:true,
    delivery:"Livraison gratuite à Dakar 24h-48h",
    description:"Découvrez l'élégance avec cette robe Wax Premium Dakar, confectionnée avec un tissu africain de haute qualité. Confortable, durable et parfaite pour toutes vos occasions spéciales."
  },
  {
    id:6, name:"Boubou Homme Royal Bleu",
    price:32000, priceOld:45000, discount:29,
    seller:"Bissap Fashion", sellerRating:4.7,
    category:"Mode & Vêtements", subcategory:"Boubous",
    stock:3, city:"Dakar", condition:"neuf",
    sizes:["M","L","XL","XXL"],
    photo:"https://images.unsplash.com/photo-1621786030484-4c855eed6974?w=600",
    rating:4.7, reviews:127,
    description:"Boubou traditionnel sénégalais brodé main. Parfait pour mariages, baptêmes et cérémonies."
  },
  {
    id:7, name:"Boubou Prestige Blanc & Or",
    price:35000, priceOld:50000, discount:30,
    seller:"Elite Bazin", sellerRating:4.9,
    category:"Mode & Vêtements", subcategory:"Boubous",
    stock:5, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1622495966051-a52a2b60c817?w=600",
    rating:4.9, reviews:156,
    description:"Boubou de luxe bazin riche, broderie or main, pour grandes occasions."
  },
  {
    id:8, name:"Boubou Élégance Champagne",
    price:30000, priceOld:42000, discount:29,
    seller:"Bissap Fashion", sellerRating:4.7,
    category:"Mode & Vêtements", subcategory:"Boubous",
    stock:8, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1594612173245-d4b48cbc82ee?w=600",
    rating:4.6, reviews:98,
    description:"Boubou champagne raffiné, tissu soyeux, coupe moderne."
  },
  {
    id:9, name:"Sac cuir artisanal bogolan",
    price:18500, priceOld:28000, discount:34,
    seller:"Cuir d'Afrique", sellerRating:4.8,
    category:"Mode & Vêtements", subcategory:"Sacs",
    stock:6, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
    rating:4.8, reviews:112,
    description:"Sac cuir véritable fait main, motifs bogolan authentiques du Mali."
  },
  {
    id:10, name:"Bijoux dorés parure africaine",
    price:8000, priceOld:15000, discount:47,
    seller:"Méda d'Or", sellerRating:4.9,
    category:"Bijoux", subcategory:"Parures",
    stock:15, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600",
    rating:4.9, reviews:203,
    description:"Ensemble bijoux plaqué or 24 carats, style africain traditionnel royal."
  },
  {
    id:11, name:"Coussin décoratif Wax authentique",
    price:7500, priceOld:12000, discount:38,
    seller:"Maison Africaine", sellerRating:4.6,
    category:"Maison & Déco", subcategory:"Textile",
    stock:24, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600",
    rating:4.6, reviews:67,
    description:"Coussin décoratif en tissu Wax authentique 40x40cm."
  },
  {
    id:12, name:"Chapeau traditionnel paille",
    price:6500, priceOld:10000, discount:35,
    seller:"Artisanat Dakar", sellerRating:4.9,
    category:"Mode & Vêtements", subcategory:"Accessoires",
    stock:18, city:"Saint-Louis", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600",
    rating:4.7, reviews:45,
    description:"Chapeau en paille tressé main, style traditionnel sénégalais."
  },
  {
    id:13, name:"Ceinture en cuir premium",
    price:9000, priceOld:15000, discount:40,
    seller:"Cuir d'Afrique", sellerRating:4.8,
    category:"Mode & Vêtements", subcategory:"Accessoires",
    stock:32, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600",
    rating:4.7, reviews:89,
    description:"Ceinture cuir véritable, boucle laiton, longueur ajustable."
  },
  {
    id:14, name:"Panier tressé XL sénégalais",
    price:10000, priceOld:16000, discount:38,
    seller:"Artisanat Dakar", sellerRating:4.9,
    category:"Maison & Déco", subcategory:"Rangement",
    stock:12, city:"Thiès", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600",
    rating:4.8, reviews:56,
    description:"Grand panier tressé main en fibres naturelles, idéal pour linge ou déco."
  },
  {
    id:15, name:"iPhone 14 Pro reconditionné",
    price:450000, priceOld:600000, discount:25,
    seller:"Tech Store Sénégal", sellerRating:4.7,
    category:"Électronique", subcategory:"Smartphones",
    stock:5, city:"Dakar", condition:"reconditionné",
    photo:"https://images.unsplash.com/photo-1663499482453-9b34a30ecfb2?w=600",
    rating:4.8, reviews:78,
    description:"iPhone 14 Pro 128Go reconditionné grade A+, garanti 12 mois."
  },
  {
    id:16, name:"Fauteuil velours vert émeraude",
    price:85000, priceOld:120000, discount:29,
    seller:"Maison Africaine", sellerRating:4.6,
    category:"Maison & Déco", subcategory:"Mobilier",
    stock:4, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600",
    rating:4.7, reviews:34,
    description:"Fauteuil design en velours vert émeraude, structure bois massif."
  },
  {
    id:17, name:"Huiles essentielles bio pack",
    price:15000, priceOld:22000, discount:32,
    seller:"Naturelle Sénégal", sellerRating:4.8,
    category:"Beauté & Cosmétique", subcategory:"Soins",
    stock:28, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600",
    rating:4.9, reviews:143,
    description:"Pack 5 huiles bio : moringa, nigelle, karité, coco, argan."
  },
  {
    id:18, name:"Baskets sport running",
    price:22000, priceOld:35000, discount:37,
    seller:"Sport Dakar", sellerRating:4.6,
    category:"Sport & Loisirs", subcategory:"Chaussures",
    stock:16, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    rating:4.5, reviews:112,
    description:"Baskets running légères, amorti confort, respirantes."
  },
  {
    id:19, name:"Ensemble bébé Wax coloré",
    price:5500, priceOld:9000, discount:39,
    seller:"Kids Store", sellerRating:4.8,
    category:"Bébé & Enfant", subcategory:"Vêtements",
    stock:22, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600",
    rating:4.9, reviews:87,
    description:"Ensemble bébé en tissu Wax authentique, doux et coloré."
  },
  {
    id:20, name:"Pack thé Attaya sénégalais",
    price:3500, priceOld:5500, discount:36,
    seller:"Épicerie Terroir", sellerRating:4.9,
    category:"Alimentation", subcategory:"Boissons",
    stock:80, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600",
    rating:4.9, reviews:267,
    description:"Pack complet thé Attaya : thé vert Chine gunpowder, menthe fraîche, sucre."
  }
];

// AVATARS AFRICAINS NOIRS AUTHENTIQUES (photos Unsplash de personnes africaines)
const SELLERS = [
  {id:1, name:"Aïcha Couture", verified:true, rating:4.8, sales:234, plan:"Gold", 
    avatar:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face"},
  {id:2, name:"Moussa Tech Store", verified:true, rating:4.7, sales:512, plan:"Platinum", 
    avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
  {id:3, name:"Awa Artisanat Dakar", verified:true, rating:4.9, sales:189, plan:"Gold", 
    avatar:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face"},
  {id:4, name:"Fatou Naturelle", verified:true, rating:4.8, sales:678, plan:"Platinum", 
    avatar:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face"},
  {id:5, name:"Mamadou Cuir d'Afrique", verified:true, rating:4.8, sales:145, plan:"Gold", 
    avatar:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face"},
  {id:6, name:"Ndeye Bissap Fashion", verified:true, rating:4.7, sales:298, plan:"Gold",
    avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"},
  {id:7, name:"Ibrahima Elite Bazin", verified:true, rating:4.9, sales:156, plan:"Platinum",
    avatar:"https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&h=200&fit=crop&crop=face"}
];

const PAYMENT_METHODS = [
  {id:"wave", name:"Wave", icon:"🌊", type:"Mobile Money", fee:"0%"},
  {id:"orange", name:"Orange Money", icon:"🟠", type:"Mobile Money", fee:"0%"},
  {id:"free", name:"Free Money", icon:"🆓", type:"Mobile Money", fee:"0%"},
  {id:"wizall", name:"Wizall", icon:"💼", type:"Mobile Money", fee:"0.5%"},
  {id:"visa", name:"Visa/Mastercard", icon:"💳", type:"Carte bancaire", fee:"1.5%"},
  {id:"senbanc", name:"SENBANC", icon:"🏦", type:"Paiement premium", fee:"0%", premium:true},
  {id:"virement", name:"Virement bancaire", icon:"🏛️", type:"Bancaire", fee:"0%"},
  {id:"cod", name:"Paiement à la livraison", icon:"💰", type:"Cash", fee:"500 FCFA"}
];

const DELIVERY_PARTNERS = [
  {id:"yobante", name:"Yobante Express", type:"Local", price:1500, time:"24-48h"},
  {id:"dhl", name:"DHL Express", type:"International", price:5000, time:"3-5j", premium:true},
  {id:"aramex", name:"Aramex Afrique", type:"Panafricain", price:2500, time:"5-7j"},
  {id:"poste", name:"La Poste Sénégal", type:"Économique", price:1000, time:"3-5j"},
  {id:"orange-log", name:"Orange Logistics", type:"Rapide", price:2000, time:"24h"},
  {id:"maxi", name:"MaxiMobility Dakar", type:"Express", price:1800, time:"Jour même"},
  {id:"bolt", name:"Bolt Delivery", type:"Flexible", price:1600, time:"2-6h"}
];

// UTILISATEUR CONNECTÉ (avec photo africaine)
const CURRENT_USER = {
  name: "Ousseynou Lam",
  email: "hello.senecosystem@gmail.com",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  plan: "GOLD",
  city: "Dakar, Sicap Liberté 6",
  memberSince: "Janvier 2026"
};

// Panier (localStorage)
function getCart() {
  return JSON.parse(localStorage.getItem('sentew_cart') || '[]');
}
function setCart(cart) {
  localStorage.setItem('sentew_cart', JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(productId, quantity=1) {
  let cart = getCart();
  const existing = cart.find(c => c.id === productId);
  if(existing) existing.quantity += quantity;
  else cart.push({id:productId, quantity});
  setCart(cart);
}
function removeFromCart(productId) {
  setCart(getCart().filter(c => c.id !== productId));
}
function updateCartBadge() {
  const badges = document.querySelectorAll('.nav-badge-cart');
  const cart = getCart();
  const total = cart.reduce((s,c) => s+c.quantity, 0);
  badges.forEach(badge => {
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
  });
}

// Formatage
function formatPrice(price) {
  return price.toLocaleString('fr-FR') + ' FCFA';
}

// Recherche
function searchProducts(query) {
  const q = query.toLowerCase();
  return PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.category.toLowerCase().includes(q) ||
    p.seller.toLowerCase().includes(q)
  );
}

// PRODUITS SIMILAIRES (algorithme intelligent)
function getSimilarProducts(productId, limit=6) {
  const current = PRODUCTS.find(p => p.id === productId);
  if(!current) return PRODUCTS.slice(0, limit);
  
  // 1. Même catégorie en priorité
  const sameCat = PRODUCTS.filter(p => 
    p.id !== productId && p.category === current.category
  );
  
  // 2. Même vendeur
  const sameSeller = PRODUCTS.filter(p => 
    p.id !== productId && p.seller === current.seller && !sameCat.includes(p)
  );
  
  // 3. Prix similaire (+/- 50%)
  const priceRange = PRODUCTS.filter(p => 
    p.id !== productId && 
    !sameCat.includes(p) && 
    !sameSeller.includes(p) &&
    p.price >= current.price*0.5 && p.price <= current.price*1.5
  );
  
  const combined = [...sameCat, ...sameSeller, ...priceRange];
  return combined.slice(0, limit);
}

// ICÔNES SVG PROFESSIONNELLES
const ICONS = {
  home: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>',
  grid: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  cart: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
  chat: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  user: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  search: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
  bell: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
  heart: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  star: '<svg width="14" height="14" viewBox="0 0 24 24" fill="#D4A574" stroke="#D4A574"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"/></svg>',
  settings: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  back: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
  sparkle: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.4 7.6L22 10l-7.6 2.4L12 20l-2.4-7.6L2 10l7.6-2.4z"/></svg>',
  shield: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  truck: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
  trophy: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0z"/></svg>',
  filter: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/></svg>'
};

// Init
document.addEventListener('DOMContentLoaded', updateCartBadge);

