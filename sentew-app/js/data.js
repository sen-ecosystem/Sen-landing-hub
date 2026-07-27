// ============================================
// SEN TEW - DATABASE (Simulation JSON)
// Ousseynou Lam - SEN ECOSYSTEM 2026
// ============================================

const CATEGORIES = [
  {id:1, name:"Mode & Vêtements", slug:"mode", icon:"👗", count:1245, img:"https://images.unsplash.com/photo-1544441893-675973e31985?w=400"},
  {id:2, name:"Électronique", slug:"tech", icon:"📱", count:2345, img:"https://images.unsplash.com/photo-1592286927505-1def25115481?w=400"},
  {id:3, name:"Maison & Déco", slug:"maison", icon:"🏠", count:1876, img:"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400"},
  {id:4, name:"Beauté & Cosmétique", slug:"beaute", icon:"💄", count:1234, img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400"},
  {id:5, name:"Alimentation", slug:"food", icon:"🍎", count:2987, img:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=400"},
  {id:6, name:"Bébé & Enfant", slug:"enfant", icon:"👶", count:1654, img:"https://images.unsplash.com/photo-1553451191-6d8d2c96b2c9?w=400"},
  {id:7, name:"Sport & Loisirs", slug:"sport", icon:"⚽", count:987, img:"https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400"},
  {id:8, name:"Auto & Moto", slug:"auto", icon:"🚗", count:1234, img:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400"},
  {id:9, name:"Artisanat Africain", slug:"artisanat", icon:"🎨", count:2456, img:"https://images.unsplash.com/photo-1519075677053-91a52642e10a?w=400", featured:true},
  {id:10, name:"Livres", slug:"livres", icon:"📚", count:1245, img:"https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400"},
  {id:11, name:"Santé", slug:"sante", icon:"💊", count:1034, img:"https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400"},
  {id:12, name:"Bijoux", slug:"bijoux", icon:"💎", count:1145, img:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400"}
];

const PRODUCTS = [
  {
    id:1, name:"Sac à main chic cuir vert",
    price:15000, priceOld:25000, discount:40,
    seller:"Aïcha Couture", sellerRating:4.8, sellerVerified:true,
    category:"Mode & Vêtements", subcategory:"Sacs",
    stock:12, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
    photos:["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"],
    rating:4.8, reviews:234,
    delivery:"Livraison 24h à Dakar", featured:true, promo:true,
    description:"Sac à main premium en cuir véritable, coupe élégante pour toutes occasions."
  },
  {
    id:2, name:"Écouteurs sans fil Pro",
    price:12000, priceOld:20000, discount:40,
    seller:"Tech Store Sénégal", sellerRating:4.7,
    category:"Électronique", subcategory:"Audio",
    stock:45, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
    rating:4.6, reviews:189, promo:true,
    description:"Écouteurs sans fil avec réduction de bruit active, autonomie 30h."
  },
  {
    id:3, name:"Vase déco africain bogolan",
    price:8500, priceOld:14000, discount:40,
    seller:"Artisanat Dakar", sellerRating:4.9,
    category:"Artisanat Africain", subcategory:"Décoration",
    stock:8, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500",
    rating:4.9, reviews:87, promo:true, featured:true,
    description:"Vase décoratif fait main, motifs bogolan traditionnel Mali."
  },
  {
    id:4, name:"Beurre de karité pur 100%",
    price:4000, priceOld:7000, discount:43,
    seller:"Naturelle Sénégal", sellerRating:4.8,
    category:"Beauté & Cosmétique", subcategory:"Soins",
    stock:120, city:"Thiès", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500",
    rating:4.9, reviews:456, promo:true,
    description:"Beurre de karité 100% naturel, non raffiné, extrait du Burkina Faso."
  },
  {
    id:5, name:"Robe Wax Premium Dakar",
    price:25000, priceOld:40000, discount:37,
    seller:"Boutique Aïcha Couture", sellerRating:4.8, sellerVerified:true,
    category:"Mode & Vêtements", subcategory:"Robes",
    stock:6, city:"Dakar", condition:"neuf",
    sizes:["S","M","L","XL"], colors:["Vert","Rouge","Or","Violet"],
    photo:"https://images.unsplash.com/photo-1594612173245-d4b48cbc82ee?w=500",
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
    photo:"https://images.unsplash.com/photo-1520975916090-3105956dac38?w=500",
    rating:4.7, reviews:127,
    description:"Boubou traditionnel sénégalais brodé main. Parfait pour mariages et cérémonies."
  },
  {
    id:7, name:"Boubou Prestige Blanc & Or",
    price:35000, priceOld:50000, discount:30,
    seller:"Elite Bazin", sellerRating:4.9,
    category:"Mode & Vêtements", subcategory:"Boubous",
    stock:5, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=500",
    rating:4.9, reviews:156,
    description:"Boubou de luxe bazin riche, broderie or main, pour grandes occasions."
  },
  {
    id:8, name:"Boubou Élégance Champagne",
    price:30000, priceOld:42000, discount:29,
    seller:"Bissap Fashion", sellerRating:4.7,
    category:"Mode & Vêtements", subcategory:"Boubous",
    stock:8, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1571908599407-cdb918ed83bf?w=500",
    rating:4.6, reviews:98,
    description:"Boubou champagne raffiné, tissu soyeux, coupe moderne."
  },
  {
    id:9, name:"Sac cuir artisanal bogolan",
    price:18500, priceOld:28000, discount:34,
    seller:"Cuir d'Afrique", sellerRating:4.8,
    category:"Mode & Vêtements", subcategory:"Sacs",
    stock:6, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500",
    rating:4.8, reviews:112,
    description:"Sac cuir véritable fait main, motifs bogolan authentiques."
  },
  {
    id:10, name:"Bijoux dorés africains",
    price:8000, priceOld:15000, discount:47,
    seller:"Méda d'Or", sellerRating:4.9,
    category:"Bijoux", subcategory:"Parures",
    stock:15, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500",
    rating:4.9, reviews:203,
    description:"Ensemble bijoux plaqué or 24 carats, style africain traditionnel."
  },
  {
    id:11, name:"Coussin décoratif Wax",
    price:7500, priceOld:12000, discount:38,
    seller:"Maison Africaine", sellerRating:4.6,
    category:"Maison & Déco", subcategory:"Textile",
    stock:24, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500",
    rating:4.6, reviews:67,
    description:"Coussin décoratif en tissu Wax authentique, taille 40x40cm."
  },
  {
    id:12, name:"Chapeau traditionnel paille",
    price:6500, priceOld:10000, discount:35,
    seller:"Artisanat Dakar", sellerRating:4.9,
    category:"Mode & Vêtements", subcategory:"Accessoires",
    stock:18, city:"Saint-Louis", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500",
    rating:4.7, reviews:45,
    description:"Chapeau en paille tressé main, style traditionnel sénégalais."
  },
  {
    id:13, name:"Ceinture en cuir premium",
    price:9000, priceOld:15000, discount:40,
    seller:"Cuir d'Afrique", sellerRating:4.8,
    category:"Mode & Vêtements", subcategory:"Accessoires",
    stock:32, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1553143820-c67c5f2f4f5b?w=500",
    rating:4.7, reviews:89,
    description:"Ceinture cuir véritable, boucle laiton, longueur ajustable."
  },
  {
    id:14, name:"Panier tressé XL",
    price:10000, priceOld:16000, discount:38,
    seller:"Artisanat Dakar", sellerRating:4.9,
    category:"Maison & Déco", subcategory:"Rangement",
    stock:12, city:"Thiès", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500",
    rating:4.8, reviews:56,
    description:"Grand panier tressé main en fibres naturelles, idéal pour linge ou déco."
  },
  {
    id:15, name:"iPhone 14 Pro reconditionné",
    price:450000, priceOld:600000, discount:25,
    seller:"Tech Store Sénégal", sellerRating:4.7,
    category:"Électronique", subcategory:"Smartphones",
    stock:5, city:"Dakar", condition:"reconditionné",
    photo:"https://images.unsplash.com/photo-1663499482453-9b34a30ecfb2?w=500",
    rating:4.8, reviews:78,
    description:"iPhone 14 Pro 128Go reconditionné grade A+, garanti 12 mois."
  },
  {
    id:16, name:"Fauteuil velours vert",
    price:85000, priceOld:120000, discount:29,
    seller:"Maison Africaine", sellerRating:4.6,
    category:"Maison & Déco", subcategory:"Mobilier",
    stock:4, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500",
    rating:4.7, reviews:34,
    description:"Fauteuil design en velours vert émeraude, structure bois massif."
  },
  {
    id:17, name:"Huiles essentielles bio pack",
    price:15000, priceOld:22000, discount:32,
    seller:"Naturelle Sénégal", sellerRating:4.8,
    category:"Beauté & Cosmétique", subcategory:"Soins",
    stock:28, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500",
    rating:4.9, reviews:143,
    description:"Pack 5 huiles essentielles bio : moringa, nigelle, karité, coco, argan."
  },
  {
    id:18, name:"Baskets sport running",
    price:22000, priceOld:35000, discount:37,
    seller:"Sport Dakar", sellerRating:4.6,
    category:"Sport & Loisirs", subcategory:"Chaussures",
    stock:16, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    rating:4.5, reviews:112,
    description:"Baskets running légères, amorti confort, respirantes."
  },
  {
    id:19, name:"Peluche ourson XL",
    price:5500, priceOld:9000, discount:39,
    seller:"Kids Store", sellerRating:4.8,
    category:"Bébé & Enfant", subcategory:"Jouets",
    stock:22, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1584155828260-3f126cd41e6f?w=500",
    rating:4.9, reviews:87,
    description:"Grande peluche ourson douce et câline, 60cm, dès 1 an."
  },
  {
    id:20, name:"Pack thé Attaya sénégalais",
    price:3500, priceOld:5500, discount:36,
    seller:"Épicerie Terroir", sellerRating:4.9,
    category:"Alimentation", subcategory:"Boissons",
    stock:80, city:"Dakar", condition:"neuf",
    photo:"https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500",
    rating:4.9, reviews:267,
    description:"Pack complet thé Attaya : thé vert Chine gunpowder, menthe fraîche, sucre."
  }
];

const SELLERS = [
  {id:1, name:"Aïcha Couture", verified:true, rating:4.8, sales:234, plan:"Gold", avatar:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200"},
  {id:2, name:"Tech Store Sénégal", verified:true, rating:4.7, sales:512, plan:"Platinum", avatar:"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200"},
  {id:3, name:"Artisanat Dakar", verified:true, rating:4.9, sales:189, plan:"Gold", avatar:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200"},
  {id:4, name:"Naturelle Sénégal", verified:true, rating:4.8, sales:678, plan:"Platinum", avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"},
  {id:5, name:"Cuir d'Afrique", verified:true, rating:4.8, sales:145, plan:"Gold", avatar:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200"}
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
  const badge = document.querySelector('.nav-badge-cart');
  const cart = getCart();
  const total = cart.reduce((s,c) => s+c.quantity, 0);
  if(badge) badge.textContent = total;
  if(badge) badge.style.display = total > 0 ? 'flex' : 'none';
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

// Init
document.addEventListener('DOMContentLoaded', updateCartBadge);
