// ===== SEN TEW - DATA v8 (2026) =====
// Exports globaux garantis

(function(){
  const _products = [
    {id:1,name:'Robe wax mariage',cat:'mode',price:35000,oldPrice:50000,image:'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&h=500&fit=crop',seller:'Aïcha Couture',sellerAvatar:'https://i.pravatar.cc/40?img=1',sellerLive:true,sellerId:'1',rating:4.9,stock:8,local:true,verified:'gold'},
    {id:2,name:'Sandales cuir Peul',cat:'mode',price:8500,oldPrice:12000,image:'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&h=500&fit=crop',seller:'Aïcha Couture',sellerAvatar:'https://i.pravatar.cc/40?img=1',sellerLive:true,sellerId:'1',rating:4.7,stock:15,local:true,verified:'gold'},
    {id:3,name:'Chemise brodée homme',cat:'mode',price:12000,image:'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop',seller:'Aïcha Couture',sellerAvatar:'https://i.pravatar.cc/40?img=1',sellerId:'1',rating:4.6,stock:20,local:true,verified:'gold'},
    {id:4,name:'Boubou grand teint',cat:'mode',price:45000,oldPrice:60000,image:'https://images.unsplash.com/photo-1544441893-675973e31985?w=500&h=500&fit=crop',seller:'Aïcha Couture',sellerAvatar:'https://i.pravatar.cc/40?img=1',sellerId:'1',rating:4.9,stock:5,local:true,verified:'gold'},
    {id:5,name:'Bracelet ethnique perles',cat:'mode',price:5500,image:'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop',seller:'Aïcha Couture',sellerAvatar:'https://i.pravatar.cc/40?img=1',sellerId:'1',rating:4.8,stock:25,local:true,verified:'gold'},
    {id:6,name:'Sac cuir africain premium',cat:'mode',price:15000,oldPrice:22000,image:'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500&h=500&fit=crop',seller:'Aïcha Couture',sellerAvatar:'https://i.pravatar.cc/40?img=1',sellerId:'1',rating:4.7,stock:12,local:true,verified:'gold'},

    {id:10,name:'iPhone 15 Pro 256GB',cat:'tech',price:750000,oldPrice:850000,image:'https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop',seller:'Moussa Tech',sellerAvatar:'https://i.pravatar.cc/40?img=11',sellerLive:true,sellerId:'2',rating:4.9,stock:3,verified:'gold'},
    {id:11,name:'Samsung Galaxy S24',cat:'tech',price:520000,image:'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop',seller:'Moussa Tech',sellerAvatar:'https://i.pravatar.cc/40?img=11',sellerId:'2',rating:4.8,stock:7,verified:'gold'},
    {id:12,name:'AirPods Pro 2',cat:'tech',price:145000,image:'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&h=500&fit=crop',seller:'Moussa Tech',sellerAvatar:'https://i.pravatar.cc/40?img=11',sellerId:'2',rating:4.7,stock:12,verified:'gold'},
    {id:13,name:'Écouteurs sans fil Pro',cat:'tech',price:12000,oldPrice:18000,image:'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop',seller:'Moussa Tech',sellerAvatar:'https://i.pravatar.cc/40?img=11',sellerId:'2',rating:4.6,stock:18,verified:'gold'},

    {id:20,name:'Canapé 3 places moderne',cat:'maison',price:185000,oldPrice:250000,image:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',seller:'Déco Sénégal',sellerAvatar:'https://i.pravatar.cc/40?img=20',sellerId:'6',rating:4.7,stock:4,local:true,verified:'gold'},
    {id:21,name:'Lampe artisanale bois',cat:'maison',price:15000,image:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',seller:'Déco Sénégal',sellerAvatar:'https://i.pravatar.cc/40?img=20',sellerId:'6',rating:4.8,stock:14,local:true,verified:'gold'},

    {id:30,name:'Beurre karité pur 500g',cat:'beauty',price:4500,oldPrice:6000,image:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=500&fit=crop',seller:'Fatou Beauté',sellerAvatar:'https://i.pravatar.cc/40?img=5',sellerLive:true,sellerId:'3',rating:4.9,stock:50,local:true,verified:'platinum'},
    {id:31,name:'Palette 24 couleurs',cat:'beauty',price:8500,oldPrice:12000,image:'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=500&fit=crop',seller:'Fatou Beauté',sellerAvatar:'https://i.pravatar.cc/40?img=5',sellerId:'3',rating:4.7,stock:15,verified:'platinum'},

    {id:40,name:'Bissap séché 500g',cat:'food',price:2500,image:'https://images.unsplash.com/photo-1597318374671-4b6f79c93e12?w=500&h=500&fit=crop',seller:'Marché Kermel',sellerAvatar:'https://i.pravatar.cc/40?img=30',sellerId:'8',rating:4.8,stock:100,local:true},
    {id:41,name:'Café Touba 250g',cat:'food',price:1800,image:'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop',seller:'Marché Kermel',sellerAvatar:'https://i.pravatar.cc/40?img=30',sellerId:'8',rating:4.9,stock:80,local:true},

    {id:50,name:'Maillot Sénégal 2026',cat:'sport',price:18000,oldPrice:25000,image:'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=500&h=500&fit=crop',seller:'Ibrahima Sport',sellerAvatar:'https://i.pravatar.cc/40?img=13',sellerLive:true,sellerId:'9',rating:4.9,stock:30,local:true,verified:'gold'},
    {id:51,name:'Ballon Adidas officiel',cat:'sport',price:12000,image:'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=500&h=500&fit=crop',seller:'Ibrahima Sport',sellerAvatar:'https://i.pravatar.cc/40?img=13',sellerId:'9',rating:4.7,stock:20,local:true,verified:'gold'}
  ];

  const _categories = [
    {id:'mode',name:'Mode',icon:'👕',color:'#EC4899',count:1240},
    {id:'tech',name:'Électronique',icon:'🎧',color:'#3B82F6',count:856},
    {id:'maison',name:'Maison',icon:'🛋',color:'#F59E0B',count:642},
    {id:'beauty',name:'Beauté',icon:'💄',color:'#EC4899',count:498},
    {id:'food',name:'Alimentation',icon:'🧺',color:'#10B981',count:387},
    {id:'sport',name:'Sport',icon:'⚽',color:'#EF4444',count:234}
  ];

  const _sellers = [
    {id:'1',name:'Aïcha Couture',bio:'Mode africaine premium · Dakar',avatar:'https://i.pravatar.cc/200?img=1',followers:12400,sales:3200,rating:4.9,live:true,verified:'gold',local:true},
    {id:'2',name:'Moussa Tech',bio:'Électronique · Plateau',avatar:'https://i.pravatar.cc/200?img=11',followers:8900,sales:2100,rating:4.7,live:true,verified:'gold'},
    {id:'3',name:'Fatou Beauté',bio:'Cosmétiques bio · Almadies',avatar:'https://i.pravatar.cc/200?img=5',followers:5600,sales:1400,rating:4.8,live:true,verified:'platinum',local:true},
    {id:'4',name:'Modou Tailleur',bio:'Sur-mesure · Sacré-Cœur',avatar:'https://i.pravatar.cc/200?img=13',followers:3200,sales:890,rating:4.6,live:false,verified:'gold',local:true},
    {id:'5',name:'Awa Bijoux',bio:'Bijoux artisanaux · Médina',avatar:'https://i.pravatar.cc/200?img=9',followers:2100,sales:560,rating:4.8,live:false,verified:'gold',local:true},
    {id:'6',name:'Déco Sénégal',bio:'Décoration · VDN',avatar:'https://i.pravatar.cc/200?img=20',followers:4300,sales:1200,rating:4.7,live:false,verified:'gold',local:true},
    {id:'8',name:'Marché Kermel',bio:'Épicerie · Plateau',avatar:'https://i.pravatar.cc/200?img=30',followers:1800,sales:640,rating:4.8,live:false,local:true},
    {id:'9',name:'Ibrahima Sport',bio:'Sport · Point E',avatar:'https://i.pravatar.cc/200?img=13',followers:6700,sales:1800,rating:4.9,live:true,verified:'gold',local:true}
  ];

  // EXPORTS GLOBAUX (window + var)
  window.products = _products;
  window.PRODUCTS = _products;
  window.produits = _products;
  window.categories = _categories;
  window.sellers = _sellers;
  window.SEN_DATA = {
    products: _products,
    categories: _categories,
    sellers: _sellers
  };
})();

// Vérification console
console.log('✅ SEN TEW data loaded:', window.products.length, 'produits,', window.sellers.length, 'vendeurs');
