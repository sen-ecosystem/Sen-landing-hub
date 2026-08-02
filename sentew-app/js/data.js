const products = [
  {id:1,name:'Robe wax mariage',cat:'mode',price:35000,oldPrice:50000,image:'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&h=500&fit=crop',seller:'Aïcha Couture',sellerAvatar:'https://i.pravatar.cc/40?img=1',sellerLive:true,sellerId:'1',rating:4.9,stock:8,local:true,verified:'gold'},
  {id:2,name:'Sandales cuir Peul',cat:'mode',price:8500,oldPrice:12000,image:'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&h=500&fit=crop',seller:'Aïcha Couture',sellerAvatar:'https://i.pravatar.cc/40?img=1',sellerId:'1',rating:4.7,stock:15,local:true,verified:'gold'},
  {id:6,name:'Boubou wax collection été',cat:'mode',price:18000,oldPrice:25000,image:'https://images.unsplash.com/photo-1544441893-675973e31985?w=500&h=500&fit=crop',seller:'Fatou Ndiaye Fashion',sellerAvatar:'https://i.pravatar.cc/40?img=5',sellerId:'3',rating:4.9,stock:5,local:true,verified:'gold'},
  {id:7,name:'Sac cuir africain premium',cat:'mode',price:15000,oldPrice:22000,image:'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500&h=500&fit=crop',seller:'Aïcha Couture',sellerAvatar:'https://i.pravatar.cc/40?img=1',sellerId:'1',rating:4.7,stock:12,local:true,verified:'gold'},
  {id:10,name:'iPhone 15 Pro 256GB',cat:'tech',price:750000,oldPrice:850000,image:'https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop',seller:'Moussa Tech',sellerAvatar:'https://i.pravatar.cc/40?img=11',sellerLive:true,sellerId:'2',rating:4.9,stock:3,verified:'gold'},
  {id:13,name:'Écouteurs sans fil Pro',cat:'tech',price:12000,oldPrice:18000,image:'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop',seller:'Moussa Tech',sellerAvatar:'https://i.pravatar.cc/40?img=11',sellerId:'2',rating:4.6,stock:18,verified:'gold'},
  {id:30,name:'Beurre karité pur 500g',cat:'beauty',price:4500,oldPrice:6000,image:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=500&fit=crop',seller:'Fatou Beauté',sellerAvatar:'https://i.pravatar.cc/40?img=5',sellerLive:true,sellerId:'3',rating:4.9,stock:50,local:true,verified:'platinum'},
  {id:50,name:'Maillot Sénégal 2026',cat:'sport',price:18000,oldPrice:25000,image:'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=500&h=500&fit=crop',seller:'Ibrahima Sport',sellerAvatar:'https://i.pravatar.cc/40?img=13',sellerLive:true,sellerId:'9',rating:4.9,stock:30,local:true,verified:'gold'}
];
const PRODUCTS = products;
const produits = products;

const categories = [
  {id:'mode',name:'Mode',icon:'👕',color:'#EC4899',count:1240},
  {id:'tech',name:'Électronique',icon:'🎧',color:'#3B82F6',count:856},
  {id:'maison',name:'Maison',icon:'🛋',color:'#F59E0B',count:642},
  {id:'beauty',name:'Beauté',icon:'💄',color:'#EC4899',count:498},
  {id:'food',name:'Alimentation',icon:'🧺',color:'#10B981',count:387},
  {id:'sport',name:'Sport',icon:'⚽',color:'#EF4444',count:234}
];

const sellers = [
  {id:'1',name:'Aïcha Couture',bio:'Mode africaine premium · Dakar',avatar:'https://i.pravatar.cc/200?img=1',followers:12400,sales:3200,rating:4.9,live:true,verified:'gold',local:true},
  {id:'2',name:'Moussa Tech',bio:'Électronique · Plateau',avatar:'https://i.pravatar.cc/200?img=11',followers:8900,sales:2100,rating:4.7,live:true,verified:'gold'},
  {id:'3',name:'Fatou Beauté',bio:'Cosmétiques bio · Almadies',avatar:'https://i.pravatar.cc/200?img=5',followers:5600,sales:1400,rating:4.8,live:true,verified:'platinum',local:true},
  {id:'6',name:'Déco Sénégal',bio:'Décoration · VDN',avatar:'https://i.pravatar.cc/200?img=20',followers:4300,sales:1200,rating:4.7,live:false,verified:'gold',local:true},
  {id:'9',name:'Ibrahima Sport',bio:'Sport · Point E',avatar:'https://i.pravatar.cc/200?img=13',followers:6700,sales:1800,rating:4.9,live:true,verified:'gold',local:true}
];

if (typeof window !== 'undefined') {
  window.products = products;
  window.PRODUCTS = products;
  window.produits = products;
  window.categories = categories;
  window.sellers = sellers;
}
