// SEN TEW — Connexion Supabase
const SUPABASE_URL = 'https://tjqkruhwmjzgfvtouqza.supabase.co';
const SUPABASE_KEY = 'sb_publishable_XCdjFFvg7Wys68uFf4Bs5A_5XHpDz9j';

// Client Supabase (disponible dans toutes les pages)
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Fonction pour charger les vendeurs
async function loadVendors() {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('is_verified', true)
    .order('rating', { ascending: false });
  
  if (error) {
    console.error('Erreur chargement vendeurs:', error);
    return [];
  }
  return data;
}

// Fonction pour charger les produits d'un vendeur
async function loadProductsByVendor(vendorId) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('vendor_id', vendorId)
    .eq('is_active', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Erreur chargement produits:', error);
    return [];
  }
  return data;
}

// Fonction pour charger tous les produits actifs
async function loadAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*, vendors(shop_name, logo_url)')
    .eq('is_active', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Erreur chargement produits:', error);
    return [];
  }
  return data;
}

// Fonction pour charger un produit par ID
async function loadProductById(productId) {
  const { data, error } = await supabase
    .from('products')
    .select('*, vendors(shop_name, logo_url, rating, followers)')
    .eq('id', productId)
    .single();
  
  if (error) {
    console.error('Erreur chargement produit:', error);
    return null;
  }
  return data;
}
