export type CountryCode = 'kenya' | 'egypt' | 'cameroon' | 'ivory-coast';

export interface Country {
  id: CountryCode;
  name: string;
  flag: string;
  currency: string;
  weeklyBudget: number;
}

export const COUNTRIES: Country[] = [
  {
    id: 'kenya',
    name: 'Kenya',
    flag: '🇰🇪',
    currency: 'KES',
    weeklyBudget: 5000,
  },
  {
    id: 'egypt',
    name: 'Egypt',
    flag: '🇪🇬',
    currency: 'EGP',
    weeklyBudget: 1500,
  },
  {
    id: 'cameroon',
    name: 'Cameroon',
    flag: '🇨🇲',
    currency: 'XAF',
    weeklyBudget: 25000,
  },
  {
    id: 'ivory-coast',
    name: 'Ivory Coast',
    flag: '🇨🇮',
    currency: 'XOF',
    weeklyBudget: 25000,
  },
];

export interface Meal {
  id: string;
  name: string;
  emoji: string;
  prepTime: number; // in minutes
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  day: number; // 0-6 (Mon-Sun)
}

export interface DefaultMealPlan {
  country: CountryCode;
  meals: Meal[];
}

export const DEFAULT_MEAL_PLANS: Record<CountryCode, Meal[]> = {
  kenya: [
    // Monday
    { id: 'm1_b', name: 'Uji (Millet Porridge) + Groundnuts', emoji: '🥣', prepTime: 15, type: 'breakfast', day: 0 },
    { id: 'm1_l', name: 'Githeri (Beans & Maize) + Avocado', emoji: '🍲', prepTime: 45, type: 'lunch', day: 0 },
    { id: 'm1_d', name: 'Grilled Tilapia + Sukuma Wiki', emoji: '🐟', prepTime: 30, type: 'dinner', day: 0 },
    { id: 'm1_s', name: 'Groundnuts', emoji: '🥜', prepTime: 0, type: 'snack', day: 0 },
    // Tuesday
    { id: 'm2_b', name: 'Boiled Eggs + Chai', emoji: '🍳', prepTime: 10, type: 'breakfast', day: 1 },
    { id: 'm2_l', name: 'Ugali + Beef Stew', emoji: '🍖', prepTime: 45, type: 'lunch', day: 1 },
    { id: 'm2_d', name: 'Chapati + Ndengu', emoji: '🌯', prepTime: 40, type: 'dinner', day: 1 },
    { id: 'm2_s', name: 'Orange', emoji: '🍊', prepTime: 0, type: 'snack', day: 1 },
    // Wednesday
    { id: 'm3_b', name: 'Mandazi + Tea', emoji: '🍩', prepTime: 20, type: 'breakfast', day: 2 },
    { id: 'm3_l', name: 'Rice + Beans Stew', emoji: '🍚', prepTime: 40, type: 'lunch', day: 2 },
    { id: 'm3_d', name: 'Mukimo + Fried Cabbage', emoji: '🥔', prepTime: 50, type: 'dinner', day: 2 },
    { id: 'm3_s', name: 'Banana', emoji: '🍌', prepTime: 0, type: 'snack', day: 2 },
    // Thursday
    { id: 'm4_b', name: 'Uji + Boiled Egg', emoji: '🥣', prepTime: 15, type: 'breakfast', day: 3 },
    { id: 'm4_l', name: 'Pilau + Kachumbari', emoji: '🍛', prepTime: 45, type: 'lunch', day: 3 },
    { id: 'm4_d', name: 'Fried Fish + Ugali', emoji: '🐟', prepTime: 35, type: 'dinner', day: 3 },
    { id: 'm4_s', name: 'Mango', emoji: '🥭', prepTime: 0, type: 'snack', day: 3 },
    // Friday
    { id: 'm5_b', name: 'Sweet Potatoes + Tea', emoji: '🍠', prepTime: 20, type: 'breakfast', day: 4 },
    { id: 'm5_l', name: 'Matoke + Beans', emoji: '🍌', prepTime: 50, type: 'lunch', day: 4 },
    { id: 'm5_d', name: 'Chicken Stew + Rice', emoji: '🍗', prepTime: 60, type: 'dinner', day: 4 },
    { id: 'm5_s', name: 'Sugarcane', emoji: '🌾', prepTime: 0, type: 'snack', day: 4 },
    // Saturday
    { id: 'm6_b', name: 'Boiled Eggs + Chapati', emoji: '🍳', prepTime: 15, type: 'breakfast', day: 5 },
    { id: 'm6_l', name: 'Nyama Choma + Ugali + Kachumbari', emoji: '🥩', prepTime: 60, type: 'lunch', day: 5 },
    { id: 'm6_d', name: 'Vegetable Stir-fry + Chapati', emoji: '🥗', prepTime: 25, type: 'dinner', day: 5 },
    { id: 'm6_s', name: 'Roasted maize', emoji: '🌽', prepTime: 0, type: 'snack', day: 5 },
    // Sunday
    { id: 'm7_b', name: 'Pancakes + Chai', emoji: '🥞', prepTime: 20, type: 'breakfast', day: 6 },
    { id: 'm7_l', name: 'Biriani + Salad', emoji: '🍛', prepTime: 90, type: 'lunch', day: 6 },
    { id: 'm7_d', name: 'Chicken Soup + Chapati', emoji: '🍲', prepTime: 90, type: 'dinner', day: 6 },
    { id: 'm7_s', name: 'Fruit salad', emoji: '🍇', prepTime: 0, type: 'snack', day: 6 },
  ],
  egypt: [
    // Monday
    { id: 'e1_b', name: 'Foul Medames + Bread', emoji: '🫘', prepTime: 20, type: 'breakfast', day: 0 },
    { id: 'e1_l', name: 'Koshari', emoji: '🍚', prepTime: 40, type: 'lunch', day: 0 },
    { id: 'e1_d', name: 'Grilled Fish + Rice', emoji: '🐟', prepTime: 35, type: 'dinner', day: 0 },
    // Tuesday
    { id: 'e2_b', name: 'Eggs + Feta Cheese + Bread', emoji: '🍳', prepTime: 15, type: 'breakfast', day: 1 },
    { id: 'e2_l', name: 'Molokhia + Rice + Chicken', emoji: '🍲', prepTime: 50, type: 'lunch', day: 1 },
    { id: 'e2_d', name: 'Falafel Sandwich', emoji: '🥙', prepTime: 25, type: 'dinner', day: 1 },
    // Wednesday
    { id: 'e3_b', name: 'Foul + Taameya', emoji: '🫘', prepTime: 20, type: 'breakfast', day: 2 },
    { id: 'e3_l', name: 'Mahshi (Stuffed Vegetables)', emoji: '🫑', prepTime: 60, type: 'lunch', day: 2 },
    { id: 'e3_d', name: 'Lentil Soup + Bread', emoji: '🍜', prepTime: 30, type: 'dinner', day: 2 },
    // Thursday
    { id: 'e4_b', name: 'Eggs + Cheese + Bread', emoji: '🍳', prepTime: 15, type: 'breakfast', day: 3 },
    { id: 'e4_l', name: 'Kofta + Rice + Salad', emoji: '🍖', prepTime: 45, type: 'lunch', day: 3 },
    { id: 'e4_d', name: 'Foul + Taameya', emoji: '🫘', prepTime: 20, type: 'dinner', day: 3 },
    // Friday
    { id: 'e5_b', name: 'Feteer Meshaltet', emoji: '🥞', prepTime: 30, type: 'breakfast', day: 4 },
    { id: 'e5_l', name: 'Fattah', emoji: '🍛', prepTime: 60, type: 'lunch', day: 4 },
    { id: 'e5_d', name: 'Grilled Chicken + Salad', emoji: '🍗', prepTime: 40, type: 'dinner', day: 4 },
    // Saturday
    { id: 'e6_b', name: 'Shakshuka', emoji: '🍳', prepTime: 20, type: 'breakfast', day: 5 },
    { id: 'e6_l', name: 'Sayadeya (Fish & Rice)', emoji: '🐟', prepTime: 50, type: 'lunch', day: 5 },
    { id: 'e6_d', name: 'Koshari', emoji: '🍚', prepTime: 40, type: 'dinner', day: 5 },
    // Sunday
    { id: 'e7_b', name: 'Foul + Fresh Juice', emoji: '🫘', prepTime: 20, type: 'breakfast', day: 6 },
    { id: 'e7_l', name: 'Roast Chicken + Rice + Molokhia', emoji: '🍗', prepTime: 80, type: 'lunch', day: 6 },
    { id: 'e7_d', name: 'Fiteer Baladi + Honey', emoji: '🥞', prepTime: 30, type: 'dinner', day: 6 },
  ],
  cameroon: [
    // Monday
    { id: 'c1_b', name: 'Bouillie de Mais + Beignets', emoji: '🥣', prepTime: 20, type: 'breakfast', day: 0 },
    { id: 'c1_l', name: 'Riz + Sauce Tomate + Poisson', emoji: '🍚', prepTime: 45, type: 'lunch', day: 0 },
    { id: 'c1_d', name: 'Ndole + Plantain', emoji: '🥬', prepTime: 60, type: 'dinner', day: 0 },
    // Tuesday
    { id: 'c2_b', name: 'Oeufs Bouillis + Pain', emoji: '🥚', prepTime: 15, type: 'breakfast', day: 1 },
    { id: 'c2_l', name: 'Eru + Water Fufu', emoji: '🍲', prepTime: 50, type: 'lunch', day: 1 },
    { id: 'c2_d', name: 'Omelette + Pain', emoji: '🍳', prepTime: 15, type: 'dinner', day: 1 },
    // Wednesday
    { id: 'c3_b', name: 'Bouillie d\'Avoine + Banane', emoji: '🥣', prepTime: 15, type: 'breakfast', day: 2 },
    { id: 'c3_l', name: 'Haricots + Plantain Mur', emoji: '🫘', prepTime: 40, type: 'lunch', day: 2 },
    { id: 'c3_d', name: 'Poisson Braise + Baton de Manioc', emoji: '🐟', prepTime: 40, type: 'dinner', day: 2 },
    // Thursday
    { id: 'c4_b', name: 'Bouillie + Oeuf', emoji: '🥣', prepTime: 15, type: 'breakfast', day: 3 },
    { id: 'c4_l', name: 'Riz + Sauce Arachide + Poulet', emoji: '🍚', prepTime: 50, type: 'lunch', day: 3 },
    { id: 'c4_d', name: 'Koki + Plantain', emoji: '🫘', prepTime: 45, type: 'dinner', day: 3 },
    // Friday
    { id: 'c5_b', name: 'Beignets + Bouillie', emoji: '🍩', prepTime: 25, type: 'breakfast', day: 4 },
    { id: 'c5_l', name: 'Fufu de Mais + Sauce Jaune', emoji: '🍲', prepTime: 60, type: 'lunch', day: 4 },
    { id: 'c5_d', name: 'Sanga + Legumes', emoji: '🥬', prepTime: 45, type: 'dinner', day: 4 },
    // Saturday
    { id: 'c6_b', name: 'Oeufs + Beignets', emoji: '🥚', prepTime: 20, type: 'breakfast', day: 5 },
    { id: 'c6_l', name: 'Poulet DG', emoji: '🍗', prepTime: 70, type: 'lunch', day: 5 },
    { id: 'c6_d', name: 'Mbongo Tchobi + Riz', emoji: '🍲', prepTime: 60, type: 'dinner', day: 5 },
    // Sunday
    { id: 'c7_b', name: 'Croissants + Cafe au Lait', emoji: '🥐', prepTime: 15, type: 'breakfast', day: 6 },
    { id: 'c7_l', name: 'Kondre + Plantain', emoji: '🍲', prepTime: 50, type: 'lunch', day: 6 },
    { id: 'c7_d', name: 'Soupe Pepe', emoji: '🍜', prepTime: 40, type: 'dinner', day: 6 },
  ],
  'ivory-coast': [
    // Monday
    { id: 'i1_b', name: 'Bouillie de Mil + Pain', emoji: '🥣', prepTime: 20, type: 'breakfast', day: 0 },
    { id: 'i1_l', name: 'Riz + Sauce Arachide', emoji: '🍚', prepTime: 45, type: 'lunch', day: 0 },
    { id: 'i1_d', name: 'Poisson Braise + Attieke', emoji: '🐟', prepTime: 40, type: 'dinner', day: 0 },
    // Tuesday
    { id: 'i2_b', name: 'Oeufs + Pain Beurre', emoji: '🥚', prepTime: 15, type: 'breakfast', day: 1 },
    { id: 'i2_l', name: 'Foutou Banane + Sauce Graine', emoji: '🍌', prepTime: 60, type: 'lunch', day: 1 },
    { id: 'i2_d', name: 'Soupe de Poisson', emoji: '🍜', prepTime: 40, type: 'dinner', day: 1 },
    // Wednesday
    { id: 'i3_b', name: 'Bouillie de Riz + Sucre', emoji: '🥣', prepTime: 15, type: 'breakfast', day: 2 },
    { id: 'i3_l', name: 'Riz + Sauce Aubergine', emoji: '🍚', prepTime: 40, type: 'lunch', day: 2 },
    { id: 'i3_d', name: 'Alloco + Poisson Frit', emoji: '🍌', prepTime: 30, type: 'dinner', day: 2 },
    // Thursday
    { id: 'i4_b', name: 'Pain + Omelette', emoji: '🍞', prepTime: 15, type: 'breakfast', day: 3 },
    { id: 'i4_l', name: 'Attieke + Poulet Braise', emoji: '🍗', prepTime: 50, type: 'lunch', day: 3 },
    { id: 'i4_d', name: 'Placali + Sauce Gombo', emoji: '🥣', prepTime: 45, type: 'dinner', day: 3 },
    // Friday
    { id: 'i5_b', name: 'Cafe + Pain', emoji: '☕', prepTime: 10, type: 'breakfast', day: 4 },
    { id: 'i5_l', name: 'Riz Gras + Poulet', emoji: '🍚', prepTime: 60, type: 'lunch', day: 4 },
    { id: 'i5_d', name: 'Garba (Attieke + Thon)', emoji: '🐟', prepTime: 25, type: 'dinner', day: 4 },
    // Saturday
    { id: 'i6_b', name: 'Omelette + Pain', emoji: '🍳', prepTime: 15, type: 'breakfast', day: 5 },
    { id: 'i6_l', name: 'Kedjenou de Poulet + Riz', emoji: '🍗', prepTime: 70, type: 'lunch', day: 5 },
    { id: 'i6_d', name: 'Foutou Igname + Sauce Claire', emoji: '🥔', prepTime: 50, type: 'dinner', day: 5 },
    // Sunday
    { id: 'i7_b', name: 'Croissant + Cafe au Lait', emoji: '🥐', prepTime: 15, type: 'breakfast', day: 6 },
    { id: 'i7_l', name: 'Poulet DG', emoji: '🍗', prepTime: 70, type: 'lunch', day: 6 },
    { id: 'i7_d', name: 'Soupe Ivoirienne', emoji: '🍜', prepTime: 45, type: 'dinner', day: 6 },
  ],
};
