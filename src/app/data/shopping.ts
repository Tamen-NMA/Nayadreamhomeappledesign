export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  usedIn: string[]; // meal names
}

export const KENYA_SHOPPING_LIST: ShoppingItem[] = [
  // Staples
  { id: 's1', name: 'Millet flour', category: 'Staples', usedIn: ['Uji'] },
  { id: 's2', name: 'Maize kernels', category: 'Staples', usedIn: ['Githeri'] },
  { id: 's3', name: 'Maize flour', category: 'Staples', usedIn: ['Ugali', 'Mukimo'] },
  { id: 's4', name: 'Rice', category: 'Staples', usedIn: ['Rice + Beans Stew', 'Pilau', 'Chicken Stew + Rice', 'Biriani'] },
  { id: 's5', name: 'Wheat flour', category: 'Staples', usedIn: ['Chapati', 'Mandazi', 'Pancakes'] },
  { id: 's6', name: 'Potatoes', category: 'Staples', usedIn: ['Mukimo'] },
  { id: 's7', name: 'Sweet potatoes', category: 'Staples', usedIn: ['Sweet Potatoes'] },
  { id: 's8', name: 'Matoke', category: 'Staples', usedIn: ['Matoke + Beans'] },
  
  // Proteins
  { id: 'p1', name: 'Fresh tilapia', category: 'Proteins', usedIn: ['Grilled Tilapia', 'Fried Fish'] },
  { id: 'p2', name: 'Beef', category: 'Proteins', usedIn: ['Beef Stew', 'Nyama Choma'] },
  { id: 'p3', name: 'Omena', category: 'Proteins', usedIn: [] },
  { id: 'p4', name: 'Chicken', category: 'Proteins', usedIn: ['Chicken Stew', 'Chicken Soup'] },
  { id: 'p5', name: 'Eggs', category: 'Proteins', usedIn: ['Boiled Eggs', 'Pancakes'] },
  { id: 'p6', name: 'Dry beans', category: 'Proteins', usedIn: ['Githeri', 'Beans Stew', 'Matoke + Beans'] },
  { id: 'p7', name: 'Ndengu', category: 'Proteins', usedIn: ['Ndengu'] },
  
  // Vegetables & Fruits
  { id: 'v1', name: 'Sukuma wiki', category: 'Vegetables & Fruits', usedIn: ['Grilled Tilapia'] },
  { id: 'v2', name: 'Tomatoes', category: 'Vegetables & Fruits', usedIn: ['Kachumbari', 'Various stews'] },
  { id: 'v3', name: 'Onions', category: 'Vegetables & Fruits', usedIn: ['Kachumbari', 'Various stews'] },
  { id: 'v4', name: 'Avocado', category: 'Vegetables & Fruits', usedIn: ['Githeri'] },
  { id: 'v5', name: 'Cabbage', category: 'Vegetables & Fruits', usedIn: ['Fried Cabbage', 'Vegetable Stir-fry'] },
  { id: 'v6', name: 'Carrots', category: 'Vegetables & Fruits', usedIn: ['Mukimo', 'Vegetable Stir-fry'] },
  { id: 'v7', name: 'Pumpkin leaves', category: 'Vegetables & Fruits', usedIn: ['Mukimo'] },
  { id: 'v8', name: 'Cilantro', category: 'Vegetables & Fruits', usedIn: ['Pilau', 'Biriani'] },
  { id: 'v9', name: 'Lemon', category: 'Vegetables & Fruits', usedIn: ['Fish'] },
  { id: 'v10', name: 'Garlic', category: 'Vegetables & Fruits', usedIn: ['Various stews'] },
  
  // Breakfast & Snacks
  { id: 'b1', name: 'Milk', category: 'Breakfast & Snacks', usedIn: ['Chai', 'Pancakes'] },
  { id: 'b2', name: 'Sugar', category: 'Breakfast & Snacks', usedIn: ['Chai', 'Tea'] },
  { id: 'b3', name: 'Tea leaves', category: 'Breakfast & Snacks', usedIn: ['Chai', 'Tea'] },
  { id: 'b4', name: 'Yogurt', category: 'Breakfast & Snacks', usedIn: [] },
  
  // Cooking Basics
  { id: 'cb1', name: 'Cooking oil', category: 'Cooking Basics', usedIn: ['All dishes'] },
  { id: 'cb2', name: 'Salt', category: 'Cooking Basics', usedIn: ['All dishes'] },
  { id: 'cb3', name: 'Pilau masala', category: 'Cooking Basics', usedIn: ['Pilau'] },
  { id: 'cb4', name: 'Biriani spices', category: 'Cooking Basics', usedIn: ['Biriani'] },
  { id: 'cb5', name: 'Ginger', category: 'Cooking Basics', usedIn: ['Various stews'] },
];

export const SHOPPING_CATEGORIES = [
  { name: 'Staples', emoji: '🌾', color: '#F59E0B' },
  { name: 'Proteins', emoji: '🥩', color: '#F26B5E' },
  { name: 'Vegetables & Fruits', emoji: '🥬', color: '#5FB3A6' },
  { name: 'Breakfast & Snacks', emoji: '🍌', color: '#FF9F43' },
  { name: 'Cooking Basics', emoji: '🧴', color: '#6366F1' },
];
