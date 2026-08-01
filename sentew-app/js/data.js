// ===== SEN TEW - Data v3 (2026) =====

const products = [
  {id:1, name:'Robe wax mariage', cat:'mode', price:35000, oldPrice:50000, image:'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&h=500&fit=crop', seller:'Aïcha Couture', sellerAvatar:'https://i.pravatar.cc/40?img=1', sellerLive:true, sellerId:'1', rating:4.9, stock:8},
  {id:2, name:'Sandales cuir Peul', cat:'mode', price:8500, oldPrice:12000, image:'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&h=500&fit=crop', seller:'Aïcha Couture', sellerAvatar:'https://i.pravatar.cc/40?img=1', sellerId:'1', rating:4.7, stock:15},
  {id:3, name:'Chemise brodée homme', cat:'mode', price:12000, image:'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop', seller:'Modou Tailleur', sellerAvatar:'https://i.pravatar.cc/40?img=13', sellerId:'4', rating:4.6, stock:20},
  {id:4, name:'Bonnet SEN premium', cat:'mode', price:4500, image:'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&h=500&fit=crop', seller:'Fatou Fashion', sellerAvatar:'https://i.pravatar.cc/40?img=5', sellerLive:true, sellerId:'3', rating:4.5, stock:30},
  {id:5, name:'Bracelet ethnique perles', cat:'mode', price:5500, image:'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop', seller:'Awa Bijoux', sellerAvatar:'https://i.pravatar.cc/40?img=9', sellerId:'5', rating:4.8, stock:25},
  {id:6, name:'Boubou grand teint', cat:'mode', price:45000, oldPrice:60000, image:'https://images.unsplash.com/photo-1544441893-675973e31985?w=500&h=500&fit=crop', seller:'Aïcha Couture', sellerAvatar:'https://i.pravatar.cc/40?img=1', sellerId:'1', rating:4.9, stock:5},
  {id:7, name:'Sac cuir africain premium', cat:'mode', price:15000, oldPrice:22000, image:'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500&h=500&fit=crop', seller:'Aïcha Couture', sellerAvatar:'https://i.pravatar.cc/40?img=1', sellerId:'1', rating:4.7, stock:12},

  {id:10, name:'iPhone 15 Pro 256GB', cat:'tech', price:750000, oldPrice:850000, image:'https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop', seller:'Moussa Tech', sellerAvatar:'https://i.pravatar.cc/40?img=11', sellerLive:true, sellerId:'2', rating:4.9, stock:3},
  {id:11, name:'Samsung Galaxy S24', cat:'tech', price:520000, image:'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop', seller:'Moussa Tech', sellerAvatar:'https://i.pravatar.cc/40?img=11', sellerId:'2', rating:4.8, stock:7},
  {id:12, name:'AirPods Pro 2', cat:'tech', price:145000, image:'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&h=500&fit=crop', seller:'Moussa Tech', sellerAvatar:'https://i.pravatar.cc/40?img=11', sellerId:'2', rating:4.7, stock:12},
  {id:13, name:'Écouteurs sans fil Pro', cat:'tech', price:12000, oldPrice:18000, image:'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop', seller:'Moussa Tech', sellerAvatar:'https://i.pravatar.cc/40?img=11', sellerId:'2', rating:4.6, stock:18},
  {id:14, name:'MacBook Air M2', cat:'tech', price:850000, image:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop', seller:'Moussa Tech', sellerAvatar:'https://i.pravatar.cc/40?img=11', sellerId:'2', rating:4.9, stock:2},

  {id:20, name:'Canapé 3 places moderne', cat:'maison', price:185000, oldPrice:250000, image:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop', seller:'Déco Sénégal', sellerAvatar:'https://i.pravatar.cc/40?img=20', sellerId:'6', rating:4.7, stock:4},
  {id:21, name:'Lampe artisanale bois', cat:'maison', price:15000, image:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop', seller:'Déco Sénégal', sellerAvatar:'https://i.pravatar.cc/40?img=20', sellerId:'6', rating:4.8, stock:14},
  {id:22, name:'Tapis wax XL', cat:'maison', price:42000, image:'https://images.unsplash.com/photo-1600166898405-da9535204843?w=500&h=500&fit=crop', seller:'Déco Sénégal', sellerAvatar:'https://i.pravatar.cc/40?img=20', sellerLive:true, sellerId:'6', rating:4.9, stock:6},

  {id:30, name:'Beurre karité pur 500g', cat:'beauty', price:4500, oldPrice:6000, image:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=500&fit=crop', seller:'Fatou Beauté', sellerAvatar:'https://i.pravatar.cc/40?img=5', sellerLive:true, sellerId:'3', rating:4.9, stock:50},
  {id:31, name:'Palette 24 couleurs', cat:'beauty', price:8500, oldPrice:12000, image:'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=500&fit=crop', seller:'Fatou Beauté', sellerAvatar:'https://i.pravatar.cc/40?img=5', sellerId:'3', rating:4.7, stock:15},
  {id:32, name:'Parfum Oud premium', cat:'beauty', price:25000, image:'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop', seller:'Fatou Beauté', sellerAvatar:'https://i.pravatar.cc/40?img=5', sellerId:'3', rating:4.8, stock:8},

  {id:40, name:'Bissap séché 500g', cat:'food', price:2500, image:'https://images.unsplash.com/photo-1597318374671-4b6f79c93e12?w=500&h=500&fit=crop', seller:'Marché Kermel', sellerAvatar:'https://i.pravatar.cc/40?img=30', sellerId:'8', rating:4.8, stock:100},
  {id:41, name:'Café Touba 250g', cat:'food', price:1800, image:'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop', seller:'Marché Kermel', sellerAvatar:'https://i.pravatar.cc/40?img=30', sellerId:'8', rating:4.9, stock:80},

  {id:50, name:'Maillot Sénégal 2026', cat:'sport', price:18000, oldPrice:25000, image:'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=500&h=500&fit=crop', seller:'Ibrahima Sport', sellerAvatar:'https://i.pravatar.cc/40?img=13', sellerLive:true, sellerId:'9', rating:4.9, stock:30},
  {id:51, name:'Ballon Adidas officiel', cat:'sport', price:12000, image:'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=500&h=500&fit=crop', seller:'Ibrahima Sport', sellerAvatar:'https://i.pravatar.cc/40?img=13', sellerId:'9', rating:4.7, stock:20},
  {id:52, name:'Chaussures running Nike', cat:'sport', price:65000, image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop', seller:'Ibrahima Sport', sellerAvatar:'https://i.pravatar.cc/40?img=13', sellerId:'9', rating:4.8, stock:12}
];

const PRODUCTS = products;
const produits = products;

const categories = [
  {id:'mode', name:'Mode', icon:'👕', color:'#EC4899', count:products.filter(p=>p.cat==='mode').length},
  {id:'tech', name:'Électronique', icon:'🎧', color:'#3B82F6', count:products.filter(p=>p.cat==='tech').length},
  {id:'maison', name:'Maison', icon:'🛋', color:'#F59E0B', count:products.filter(p=>p.cat==='maison').length},
  {id:'beauty', name:'Beauté', icon:'💄', color:'#EC4899', count:products.filter(p=>p.cat==='beauty').length},
  {id:'food', name:'Alimentation', icon:'🧺', color:'#10B981', count:products.filter(p=>p.cat==='food').length},
  {id:'sport', name:'Sport', icon:'⚽', color:'#EF4444', count:products.filter(p=>p.cat==='sport').length}
];

const sellers = [
  {id:'1', name:'Aïcha Couture', bio:'Mode africaine premium · Dakar', avatar:'https://i.pravatar.cc/200?img=1', followers:12400, sales:3200, rating:4.9, live:true, verified:'gold'},
  {id:'2', name:'Moussa Tech', bio:'Électronique · Plateau', avatar:'https://i.pravatar.cc/200?img=11', followers:8900, sales:2100, rating:4.7, live:true, verified:'gold'},
  {id:'3', name:'Fatou Beauté', bio:'Cosmétiques bio · Almadies', avatar:'https://i.pravatar.cc/200?img=5', followers:5600, sales:1400, rating:4.8, live:true, verified:'platinum'},
  {id:'4', name:'Modou Tailleur', bio:'Sur-mesure · Sacré-Cœur', avatar:'https://i.pravatar.cc/200?img=13', followers:3200, sales:890, rating:4.6, live:false, verified:'bronze'},
  {id:'5', name:'Awa Bijoux', bio:'Bijoux artisanaux · Médina', avatar:'https://i.pravatar.cc/200?img=9', followers:2100, sales:560, rating:4.8, live:false, verified:'bronze'},
  {id:'6', name:'Déco Sénégal', bio:'Décoration · VDN', avatar:'https://i.pravatar.cc/200?img=20', followers:4300, sales:1200, rating:4.7, live:false, verified:'gold'},
  {id:'9', name:'Ibrahima Sport', bio:'Sport · Point E', avatar:'https://i.pravatar.cc/200?img=13', followers:6700, sales:1800, rating:4.9, live:true, verified:'gold'}
];

if (typeof window !== 'undefined') {
  window.products = products;
  window.PRODUCTS = products;
  window.produits = products;
  window.categories = categories;
  window.sellers = sellers;
}
