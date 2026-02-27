export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  usedIn: string[]; // meal names
  price: number; // price in KES (Kenyan Shillings)
}

export const KENYA_SHOPPING_LIST: ShoppingItem[] = [
  // Staples
  { id: 's1', name: 'Millet flour', category: 'Staples', usedIn: ['Uji'], price: 150 },
  { id: 's2', name: 'Maize kernels', category: 'Staples', usedIn: ['Githeri'], price: 120 },
  { id: 's3', name: 'Maize flour', category: 'Staples', usedIn: ['Ugali', 'Mukimo'], price: 180 },
  { id: 's4', name: 'Rice', category: 'Staples', usedIn: ['Rice + Beans Stew', 'Pilau', 'Chicken Stew + Rice', 'Biriani'], price: 200 },
  { id: 's5', name: 'Wheat flour', category: 'Staples', usedIn: ['Chapati', 'Mandazi', 'Pancakes'], price: 160 },
  { id: 's6', name: 'Potatoes', category: 'Staples', usedIn: ['Mukimo'], price: 100 },
  { id: 's7', name: 'Sweet potatoes', category: 'Staples', usedIn: ['Sweet Potatoes'], price: 80 },
  { id: 's8', name: 'Matoke', category: 'Staples', usedIn: ['Matoke + Beans'], price: 150 },
  
  // Proteins
  { id: 'p1', name: 'Fresh tilapia', category: 'Proteins', usedIn: ['Grilled Tilapia', 'Fried Fish'], price: 400 },
  { id: 'p2', name: 'Beef', category: 'Proteins', usedIn: ['Beef Stew', 'Nyama Choma'], price: 500 },
  { id: 'p3', name: 'Omena', category: 'Proteins', usedIn: [], price: 150 },
  { id: 'p4', name: 'Chicken', category: 'Proteins', usedIn: ['Chicken Stew', 'Chicken Soup'], price: 450 },
  { id: 'p5', name: 'Eggs', category: 'Proteins', usedIn: ['Boiled Eggs', 'Pancakes'], price: 200 },
  { id: 'p6', name: 'Dry beans', category: 'Proteins', usedIn: ['Githeri', 'Beans Stew', 'Matoke + Beans'], price: 130 },
  { id: 'p7', name: 'Ndengu', category: 'Proteins', usedIn: ['Ndengu'], price: 140 },
  
  // Vegetables & Fruits
  { id: 'v1', name: 'Sukuma wiki', category: 'Vegetables & Fruits', usedIn: ['Grilled Tilapia'], price: 30 },
  { id: 'v2', name: 'Tomatoes', category: 'Vegetables & Fruits', usedIn: ['Kachumbari', 'Various stews'], price: 80 },
  { id: 'v3', name: 'Onions', category: 'Vegetables & Fruits', usedIn: ['Kachumbari', 'Various stews'], price: 60 },
  { id: 'v4', name: 'Avocado', category: 'Vegetables & Fruits', usedIn: ['Githeri'], price: 100 },
  { id: 'v5', name: 'Cabbage', category: 'Vegetables & Fruits', usedIn: ['Fried Cabbage', 'Vegetable Stir-fry'], price: 50 },
  { id: 'v6', name: 'Carrots', category: 'Vegetables & Fruits', usedIn: ['Mukimo', 'Vegetable Stir-fry'], price: 70 },
  { id: 'v7', name: 'Pumpkin leaves', category: 'Vegetables & Fruits', usedIn: ['Mukimo'], price: 40 },
  { id: 'v8', name: 'Cilantro', category: 'Vegetables & Fruits', usedIn: ['Pilau', 'Biriani'], price: 20 },
  { id: 'v9', name: 'Lemon', category: 'Vegetables & Fruits', usedIn: ['Fish'], price: 30 },
  { id: 'v10', name: 'Garlic', category: 'Vegetables & Fruits', usedIn: ['Various stews'], price: 50 },
  
  // Breakfast & Snacks
  { id: 'b1', name: 'Milk', category: 'Breakfast & Snacks', usedIn: ['Chai', 'Pancakes'], price: 120 },
  { id: 'b2', name: 'Sugar', category: 'Breakfast & Snacks', usedIn: ['Chai', 'Tea'], price: 180 },
  { id: 'b3', name: 'Tea leaves', category: 'Breakfast & Snacks', usedIn: ['Chai', 'Tea'], price: 100 },
  { id: 'b4', name: 'Yogurt', category: 'Breakfast & Snacks', usedIn: [], price: 150 },
  
  // Cooking Basics
  { id: 'cb1', name: 'Cooking oil', category: 'Cooking Basics', usedIn: ['All dishes'], price: 350 },
  { id: 'cb2', name: 'Salt', category: 'Cooking Basics', usedIn: ['All dishes'], price: 50 },
  { id: 'cb3', name: 'Pilau masala', category: 'Cooking Basics', usedIn: ['Pilau'], price: 80 },
  { id: 'cb4', name: 'Biriani spices', category: 'Cooking Basics', usedIn: ['Biriani'], price: 120 },
  { id: 'cb5', name: 'Ginger', category: 'Cooking Basics', usedIn: ['Various stews'], price: 50 },
];

export const SHOPPING_CATEGORIES = [
  { name: 'Staples', emoji: '🌾', color: '#F59E0B' },
  { name: 'Proteins', emoji: '🥩', color: '#F26B5E' },
  { name: 'Vegetables & Fruits', emoji: '🥬', color: '#5FB3A6' },
  { name: 'Breakfast & Snacks', emoji: '🍌', color: '#FF9F43' },
  { name: 'Cooking Basics', emoji: '🧴', color: '#6366F1' },
];