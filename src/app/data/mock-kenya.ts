// Kenya Week 1 Mock Data for Naya Dream Home
// Used as fallback when no server data is available

import type { MealPlan, ChoreSchedule, HouseholdMember, Meal } from '../types';

// ===== HOUSEHOLD MEMBERS =====
export const MOCK_MEMBERS: HouseholdMember[] = [
  { id: 'mem_1', name: 'Wanjiku', emojiAvatar: '👩', age: 35, role: 'adult', isStaff: false, email: 'wanjiku@example.com' },
  { id: 'mem_2', name: 'Kamau', emojiAvatar: '👨', age: 38, role: 'adult', isStaff: false, email: 'kamau@example.com' },
  { id: 'mem_3', name: 'Amina', emojiAvatar: '👧', age: 14, role: 'teen', isStaff: false },
  { id: 'mem_4', name: 'Baraka', emojiAvatar: '👦', age: 8, role: 'child', isStaff: false },
  { id: 'mem_5', name: 'Faith', emojiAvatar: '🧑‍🍳', age: 28, role: 'house_help', isStaff: true, phone: '+254700123456' },
];

// ===== WEEK 1 MEALS (Kenya) =====
// day: 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri, 5=Sat, 6=Sun
const WEEK1_MEALS: Meal[] = [
  // Monday
  { id: 'w1_mon_b', name: 'Uji (Millet Porridge) + Groundnuts', type: 'breakfast', day: 1, prepTime: 15, calories: 280 },
  { id: 'w1_mon_l', name: 'Githeri (Beans & Maize) + Avocado', type: 'lunch', day: 1, prepTime: 45, calories: 520 },
  { id: 'w1_mon_d', name: 'Grilled Tilapia + Sukuma Wiki', type: 'dinner', day: 1, prepTime: 30, calories: 450 },
  { id: 'w1_mon_s', name: 'Groundnuts', type: 'snack', day: 1, prepTime: 0, calories: 160 },

  // Tuesday
  { id: 'w1_tue_b', name: 'Boiled Eggs + Chai', type: 'breakfast', day: 2, prepTime: 10, calories: 220 },
  { id: 'w1_tue_l', name: 'Ugali + Beef Stew', type: 'lunch', day: 2, prepTime: 45, calories: 620 },
  { id: 'w1_tue_d', name: 'Chapati + Ndengu', type: 'dinner', day: 2, prepTime: 40, calories: 480 },
  { id: 'w1_tue_s', name: 'Orange', type: 'snack', day: 2, prepTime: 0, calories: 60 },

  // Wednesday
  { id: 'w1_wed_b', name: 'Mandazi + Tea', type: 'breakfast', day: 3, prepTime: 20, calories: 310 },
  { id: 'w1_wed_l', name: 'Rice + Beans Stew', type: 'lunch', day: 3, prepTime: 40, calories: 490 },
  { id: 'w1_wed_d', name: 'Mukimo + Fried Cabbage', type: 'dinner', day: 3, prepTime: 50, calories: 440 },
  { id: 'w1_wed_s', name: 'Banana', type: 'snack', day: 3, prepTime: 0, calories: 90 },

  // Thursday
  { id: 'w1_thu_b', name: 'Uji + Boiled Egg', type: 'breakfast', day: 4, prepTime: 15, calories: 300 },
  { id: 'w1_thu_l', name: 'Pilau + Kachumbari', type: 'lunch', day: 4, prepTime: 45, calories: 580 },
  { id: 'w1_thu_d', name: 'Fried Fish + Ugali', type: 'dinner', day: 4, prepTime: 35, calories: 510 },
  { id: 'w1_thu_s', name: 'Mango', type: 'snack', day: 4, prepTime: 0, calories: 100 },

  // Friday
  { id: 'w1_fri_b', name: 'Sweet Potatoes + Tea', type: 'breakfast', day: 5, prepTime: 20, calories: 260 },
  { id: 'w1_fri_l', name: 'Matoke + Beans', type: 'lunch', day: 5, prepTime: 50, calories: 470 },
  { id: 'w1_fri_d', name: 'Chicken Stew + Rice', type: 'dinner', day: 5, prepTime: 60, calories: 560 },
  { id: 'w1_fri_s', name: 'Sugarcane', type: 'snack', day: 5, prepTime: 0, calories: 80 },

  // Saturday
  { id: 'w1_sat_b', name: 'Boiled Eggs + Chapati', type: 'breakfast', day: 6, prepTime: 15, calories: 340 },
  { id: 'w1_sat_l', name: 'Nyama Choma + Ugali + Kachumbari', type: 'lunch', day: 6, prepTime: 60, calories: 720 },
  { id: 'w1_sat_d', name: 'Vegetable Stir-fry + Chapati', type: 'dinner', day: 6, prepTime: 25, calories: 380 },
  { id: 'w1_sat_s', name: 'Roasted Maize', type: 'snack', day: 6, prepTime: 10, calories: 120 },

  // Sunday
  { id: 'w1_sun_b', name: 'Pancakes + Chai', type: 'breakfast', day: 0, prepTime: 20, calories: 350 },
  { id: 'w1_sun_l', name: 'Biriani + Salad', type: 'lunch', day: 0, prepTime: 90, calories: 650 },
  { id: 'w1_sun_d', name: 'Chicken Soup + Chapati', type: 'dinner', day: 0, prepTime: 90, calories: 480 },
  { id: 'w1_sun_s', name: 'Fruit Salad', type: 'snack', day: 0, prepTime: 10, calories: 110 },
];

// Emoji lookup for meals
export const MEAL_EMOJI_MAP: Record<string, string> = {
  'Uji (Millet Porridge) + Groundnuts': '🥣',
  'Githeri (Beans & Maize) + Avocado': '🍲',
  'Grilled Tilapia + Sukuma Wiki': '🐟',
  'Groundnuts': '🥜',
  'Boiled Eggs + Chai': '🍳',
  'Ugali + Beef Stew': '🍖',
  'Chapati + Ndengu': '🌯',
  'Orange': '🍊',
  'Mandazi + Tea': '🍩',
  'Rice + Beans Stew': '🍚',
  'Mukimo + Fried Cabbage': '🥔',
  'Banana': '🍌',
  'Uji + Boiled Egg': '🥣',
  'Pilau + Kachumbari': '🍛',
  'Fried Fish + Ugali': '🐟',
  'Mango': '🥭',
  'Sweet Potatoes + Tea': '🍠',
  'Matoke + Beans': '🍌',
  'Chicken Stew + Rice': '🍗',
  'Sugarcane': '🌾',
  'Boiled Eggs + Chapati': '🍳',
  'Nyama Choma + Ugali + Kachumbari': '🥩',
  'Vegetable Stir-fry + Chapati': '🥗',
  'Roasted Maize': '🌽',
  'Pancakes + Chai': '🥞',
  'Biriani + Salad': '🍛',
  'Chicken Soup + Chapati': '🍲',
  'Fruit Salad': '🍇',
};

export function getMealEmoji(mealName: string): string {
  return MEAL_EMOJI_MAP[mealName] || '🍽️';
}

// ===== WEEK 2, 3, 4 — slight variations for monthly calendar =====
const WEEK2_MEALS: Meal[] = [
  // Monday
  { id: 'w2_mon_b', name: 'Mandazi + Tea', type: 'breakfast', day: 1, prepTime: 20, calories: 310 },
  { id: 'w2_mon_l', name: 'Pilau + Kachumbari', type: 'lunch', day: 1, prepTime: 45, calories: 580 },
  { id: 'w2_mon_d', name: 'Chapati + Ndengu', type: 'dinner', day: 1, prepTime: 40, calories: 480 },
  { id: 'w2_mon_s', name: 'Banana', type: 'snack', day: 1, prepTime: 0, calories: 90 },
  // Tuesday
  { id: 'w2_tue_b', name: 'Sweet Potatoes + Tea', type: 'breakfast', day: 2, prepTime: 20, calories: 260 },
  { id: 'w2_tue_l', name: 'Githeri (Beans & Maize) + Avocado', type: 'lunch', day: 2, prepTime: 45, calories: 520 },
  { id: 'w2_tue_d', name: 'Grilled Tilapia + Sukuma Wiki', type: 'dinner', day: 2, prepTime: 30, calories: 450 },
  { id: 'w2_tue_s', name: 'Mango', type: 'snack', day: 2, prepTime: 0, calories: 100 },
  // Wednesday
  { id: 'w2_wed_b', name: 'Boiled Eggs + Chai', type: 'breakfast', day: 3, prepTime: 10, calories: 220 },
  { id: 'w2_wed_l', name: 'Ugali + Beef Stew', type: 'lunch', day: 3, prepTime: 45, calories: 620 },
  { id: 'w2_wed_d', name: 'Mukimo + Fried Cabbage', type: 'dinner', day: 3, prepTime: 50, calories: 440 },
  { id: 'w2_wed_s', name: 'Groundnuts', type: 'snack', day: 3, prepTime: 0, calories: 160 },
  // Thursday
  { id: 'w2_thu_b', name: 'Uji (Millet Porridge) + Groundnuts', type: 'breakfast', day: 4, prepTime: 15, calories: 280 },
  { id: 'w2_thu_l', name: 'Rice + Beans Stew', type: 'lunch', day: 4, prepTime: 40, calories: 490 },
  { id: 'w2_thu_d', name: 'Chicken Stew + Rice', type: 'dinner', day: 4, prepTime: 60, calories: 560 },
  { id: 'w2_thu_s', name: 'Orange', type: 'snack', day: 4, prepTime: 0, calories: 60 },
  // Friday
  { id: 'w2_fri_b', name: 'Uji + Boiled Egg', type: 'breakfast', day: 5, prepTime: 15, calories: 300 },
  { id: 'w2_fri_l', name: 'Matoke + Beans', type: 'lunch', day: 5, prepTime: 50, calories: 470 },
  { id: 'w2_fri_d', name: 'Fried Fish + Ugali', type: 'dinner', day: 5, prepTime: 35, calories: 510 },
  { id: 'w2_fri_s', name: 'Sugarcane', type: 'snack', day: 5, prepTime: 0, calories: 80 },
  // Saturday
  { id: 'w2_sat_b', name: 'Pancakes + Chai', type: 'breakfast', day: 6, prepTime: 20, calories: 350 },
  { id: 'w2_sat_l', name: 'Biriani + Salad', type: 'lunch', day: 6, prepTime: 90, calories: 650 },
  { id: 'w2_sat_d', name: 'Vegetable Stir-fry + Chapati', type: 'dinner', day: 6, prepTime: 25, calories: 380 },
  { id: 'w2_sat_s', name: 'Fruit Salad', type: 'snack', day: 6, prepTime: 10, calories: 110 },
  // Sunday
  { id: 'w2_sun_b', name: 'Boiled Eggs + Chapati', type: 'breakfast', day: 0, prepTime: 15, calories: 340 },
  { id: 'w2_sun_l', name: 'Nyama Choma + Ugali + Kachumbari', type: 'lunch', day: 0, prepTime: 60, calories: 720 },
  { id: 'w2_sun_d', name: 'Chicken Soup + Chapati', type: 'dinner', day: 0, prepTime: 90, calories: 480 },
  { id: 'w2_sun_s', name: 'Roasted Maize', type: 'snack', day: 0, prepTime: 10, calories: 120 },
];

const WEEK3_MEALS: Meal[] = [
  // Monday
  { id: 'w3_mon_b', name: 'Boiled Eggs + Chai', type: 'breakfast', day: 1, prepTime: 10, calories: 220 },
  { id: 'w3_mon_l', name: 'Rice + Beans Stew', type: 'lunch', day: 1, prepTime: 40, calories: 490 },
  { id: 'w3_mon_d', name: 'Fried Fish + Ugali', type: 'dinner', day: 1, prepTime: 35, calories: 510 },
  { id: 'w3_mon_s', name: 'Mango', type: 'snack', day: 1, prepTime: 0, calories: 100 },
  // Tuesday
  { id: 'w3_tue_b', name: 'Uji (Millet Porridge) + Groundnuts', type: 'breakfast', day: 2, prepTime: 15, calories: 280 },
  { id: 'w3_tue_l', name: 'Matoke + Beans', type: 'lunch', day: 2, prepTime: 50, calories: 470 },
  { id: 'w3_tue_d', name: 'Grilled Tilapia + Sukuma Wiki', type: 'dinner', day: 2, prepTime: 30, calories: 450 },
  { id: 'w3_tue_s', name: 'Groundnuts', type: 'snack', day: 2, prepTime: 0, calories: 160 },
  // Wednesday
  { id: 'w3_wed_b', name: 'Sweet Potatoes + Tea', type: 'breakfast', day: 3, prepTime: 20, calories: 260 },
  { id: 'w3_wed_l', name: 'Pilau + Kachumbari', type: 'lunch', day: 3, prepTime: 45, calories: 580 },
  { id: 'w3_wed_d', name: 'Chapati + Ndengu', type: 'dinner', day: 3, prepTime: 40, calories: 480 },
  { id: 'w3_wed_s', name: 'Orange', type: 'snack', day: 3, prepTime: 0, calories: 60 },
  // Thursday
  { id: 'w3_thu_b', name: 'Mandazi + Tea', type: 'breakfast', day: 4, prepTime: 20, calories: 310 },
  { id: 'w3_thu_l', name: 'Ugali + Beef Stew', type: 'lunch', day: 4, prepTime: 45, calories: 620 },
  { id: 'w3_thu_d', name: 'Mukimo + Fried Cabbage', type: 'dinner', day: 4, prepTime: 50, calories: 440 },
  { id: 'w3_thu_s', name: 'Banana', type: 'snack', day: 4, prepTime: 0, calories: 90 },
  // Friday
  { id: 'w3_fri_b', name: 'Boiled Eggs + Chapati', type: 'breakfast', day: 5, prepTime: 15, calories: 340 },
  { id: 'w3_fri_l', name: 'Githeri (Beans & Maize) + Avocado', type: 'lunch', day: 5, prepTime: 45, calories: 520 },
  { id: 'w3_fri_d', name: 'Chicken Stew + Rice', type: 'dinner', day: 5, prepTime: 60, calories: 560 },
  { id: 'w3_fri_s', name: 'Sugarcane', type: 'snack', day: 5, prepTime: 0, calories: 80 },
  // Saturday
  { id: 'w3_sat_b', name: 'Uji + Boiled Egg', type: 'breakfast', day: 6, prepTime: 15, calories: 300 },
  { id: 'w3_sat_l', name: 'Nyama Choma + Ugali + Kachumbari', type: 'lunch', day: 6, prepTime: 60, calories: 720 },
  { id: 'w3_sat_d', name: 'Vegetable Stir-fry + Chapati', type: 'dinner', day: 6, prepTime: 25, calories: 380 },
  { id: 'w3_sat_s', name: 'Roasted Maize', type: 'snack', day: 6, prepTime: 10, calories: 120 },
  // Sunday
  { id: 'w3_sun_b', name: 'Pancakes + Chai', type: 'breakfast', day: 0, prepTime: 20, calories: 350 },
  { id: 'w3_sun_l', name: 'Biriani + Salad', type: 'lunch', day: 0, prepTime: 90, calories: 650 },
  { id: 'w3_sun_d', name: 'Chicken Soup + Chapati', type: 'dinner', day: 0, prepTime: 90, calories: 480 },
  { id: 'w3_sun_s', name: 'Fruit Salad', type: 'snack', day: 0, prepTime: 10, calories: 110 },
];

const WEEK4_MEALS: Meal[] = [
  // Monday
  { id: 'w4_mon_b', name: 'Uji + Boiled Egg', type: 'breakfast', day: 1, prepTime: 15, calories: 300 },
  { id: 'w4_mon_l', name: 'Ugali + Beef Stew', type: 'lunch', day: 1, prepTime: 45, calories: 620 },
  { id: 'w4_mon_d', name: 'Grilled Tilapia + Sukuma Wiki', type: 'dinner', day: 1, prepTime: 30, calories: 450 },
  { id: 'w4_mon_s', name: 'Orange', type: 'snack', day: 1, prepTime: 0, calories: 60 },
  // Tuesday
  { id: 'w4_tue_b', name: 'Mandazi + Tea', type: 'breakfast', day: 2, prepTime: 20, calories: 310 },
  { id: 'w4_tue_l', name: 'Pilau + Kachumbari', type: 'lunch', day: 2, prepTime: 45, calories: 580 },
  { id: 'w4_tue_d', name: 'Chapati + Ndengu', type: 'dinner', day: 2, prepTime: 40, calories: 480 },
  { id: 'w4_tue_s', name: 'Groundnuts', type: 'snack', day: 2, prepTime: 0, calories: 160 },
  // Wednesday
  { id: 'w4_wed_b', name: 'Boiled Eggs + Chai', type: 'breakfast', day: 3, prepTime: 10, calories: 220 },
  { id: 'w4_wed_l', name: 'Githeri (Beans & Maize) + Avocado', type: 'lunch', day: 3, prepTime: 45, calories: 520 },
  { id: 'w4_wed_d', name: 'Chicken Stew + Rice', type: 'dinner', day: 3, prepTime: 60, calories: 560 },
  { id: 'w4_wed_s', name: 'Banana', type: 'snack', day: 3, prepTime: 0, calories: 90 },
  // Thursday
  { id: 'w4_thu_b', name: 'Sweet Potatoes + Tea', type: 'breakfast', day: 4, prepTime: 20, calories: 260 },
  { id: 'w4_thu_l', name: 'Rice + Beans Stew', type: 'lunch', day: 4, prepTime: 40, calories: 490 },
  { id: 'w4_thu_d', name: 'Fried Fish + Ugali', type: 'dinner', day: 4, prepTime: 35, calories: 510 },
  { id: 'w4_thu_s', name: 'Mango', type: 'snack', day: 4, prepTime: 0, calories: 100 },
  // Friday
  { id: 'w4_fri_b', name: 'Uji (Millet Porridge) + Groundnuts', type: 'breakfast', day: 5, prepTime: 15, calories: 280 },
  { id: 'w4_fri_l', name: 'Matoke + Beans', type: 'lunch', day: 5, prepTime: 50, calories: 470 },
  { id: 'w4_fri_d', name: 'Mukimo + Fried Cabbage', type: 'dinner', day: 5, prepTime: 50, calories: 440 },
  { id: 'w4_fri_s', name: 'Sugarcane', type: 'snack', day: 5, prepTime: 0, calories: 80 },
  // Saturday
  { id: 'w4_sat_b', name: 'Boiled Eggs + Chapati', type: 'breakfast', day: 6, prepTime: 15, calories: 340 },
  { id: 'w4_sat_l', name: 'Biriani + Salad', type: 'lunch', day: 6, prepTime: 90, calories: 650 },
  { id: 'w4_sat_d', name: 'Vegetable Stir-fry + Chapati', type: 'dinner', day: 6, prepTime: 25, calories: 380 },
  { id: 'w4_sat_s', name: 'Fruit Salad', type: 'snack', day: 6, prepTime: 10, calories: 110 },
  // Sunday
  { id: 'w4_sun_b', name: 'Pancakes + Chai', type: 'breakfast', day: 0, prepTime: 20, calories: 350 },
  { id: 'w4_sun_l', name: 'Nyama Choma + Ugali + Kachumbari', type: 'lunch', day: 0, prepTime: 60, calories: 720 },
  { id: 'w4_sun_d', name: 'Chicken Soup + Chapati', type: 'dinner', day: 0, prepTime: 90, calories: 480 },
  { id: 'w4_sun_s', name: 'Roasted Maize', type: 'snack', day: 0, prepTime: 10, calories: 120 },
];

// ===== MOCK MEAL PLANS =====
export const MOCK_MEAL_PLANS: MealPlan[] = [
  {
    id: 'mock_mealplan_w1',
    title: 'Kenya Week 1 — Classic',
    weekStart: 'Mar 2, 2026',
    weekEnd: 'Mar 8, 2026',
    status: 'active',
    servings: 5,
    isAIGenerated: false,
    meals: WEEK1_MEALS,
  },
  {
    id: 'mock_mealplan_w2',
    title: 'Kenya Week 2 — Variety',
    weekStart: 'Mar 9, 2026',
    weekEnd: 'Mar 15, 2026',
    status: 'draft',
    servings: 5,
    isAIGenerated: false,
    meals: WEEK2_MEALS,
  },
  {
    id: 'mock_mealplan_w3',
    title: 'Kenya Week 3 — Balanced',
    weekStart: 'Mar 16, 2026',
    weekEnd: 'Mar 22, 2026',
    status: 'draft',
    servings: 5,
    isAIGenerated: true,
    meals: WEEK3_MEALS,
  },
  {
    id: 'mock_mealplan_w4',
    title: 'Kenya Week 4 — Wholesome',
    weekStart: 'Mar 23, 2026',
    weekEnd: 'Mar 29, 2026',
    status: 'draft',
    servings: 5,
    isAIGenerated: false,
    meals: WEEK4_MEALS,
  },
];

// ===== MOCK CHORE SCHEDULE =====
export const MOCK_CHORE_SCHEDULE: ChoreSchedule = {
  id: 'mock_chore_w1',
  title: 'Kenya Week 1 Chores',
  weekStart: 'Mar 2, 2026',
  weekEnd: 'Mar 8, 2026',
  status: 'active',
  isAIGenerated: false,
  tasks: [
    // Sunday (day 0)
    { id: 'ct_0_1', title: 'Plan weekly meals', day: 0, priority: 'medium', completed: true, assigneeId: 'mem_1', emoji: '📋' },
    { id: 'ct_0_2', title: 'Prep lunches for the week', day: 0, priority: 'medium', completed: false, assigneeId: 'mem_5', emoji: '🍱' },

    // Monday (day 1)
    { id: 'ct_1_1', title: 'Sweep and mop floors', day: 1, priority: 'high', completed: true, assigneeId: 'mem_5', emoji: '🧹' },
    { id: 'ct_1_2', title: 'Cook meals', day: 1, priority: 'high', completed: true, assigneeId: 'mem_5', emoji: '🍳' },
    { id: 'ct_1_3', title: 'Help with homework', day: 1, priority: 'medium', completed: false, assigneeId: 'mem_2', emoji: '📚' },

    // Tuesday (day 2)
    { id: 'ct_2_1', title: 'Change bedsheets', day: 2, priority: 'medium', completed: true, assigneeId: 'mem_5', emoji: '🛏️' },
    { id: 'ct_2_2', title: 'Laundry', day: 2, priority: 'medium', completed: false, assigneeId: 'mem_5', emoji: '🧺' },
    { id: 'ct_2_3', title: 'Wash bathrooms', day: 2, priority: 'medium', completed: false, assigneeId: 'mem_5', emoji: '🚿' },
    { id: 'ct_2_4', title: 'Cook meals', day: 2, priority: 'high', completed: true, assigneeId: 'mem_5', emoji: '🍳' },

    // Wednesday (day 3)
    { id: 'ct_3_1', title: 'Sweep and mop floors', day: 3, priority: 'high', completed: false, assigneeId: 'mem_5', emoji: '🧹' },
    { id: 'ct_3_2', title: 'Cook meals', day: 3, priority: 'high', completed: false, assigneeId: 'mem_5', emoji: '🍳' },
    { id: 'ct_3_3', title: 'Iron clothes', day: 3, priority: 'low', completed: false, assigneeId: 'mem_5', emoji: '👔' },

    // Thursday (day 4)
    { id: 'ct_4_1', title: 'Clean windows and dust drawers', day: 4, priority: 'medium', completed: false, assigneeId: 'mem_5', emoji: '🪟' },
    { id: 'ct_4_2', title: 'Cook meals', day: 4, priority: 'high', completed: false, assigneeId: 'mem_5', emoji: '🍳' },
    { id: 'ct_4_3', title: 'Laundry', day: 4, priority: 'medium', completed: false, assigneeId: 'mem_3', emoji: '🧺' },

    // Friday (day 5)
    { id: 'ct_5_1', title: 'Sweep and mop floors', day: 5, priority: 'high', completed: false, assigneeId: 'mem_5', emoji: '🧹' },
    { id: 'ct_5_2', title: 'Cook meals', day: 5, priority: 'high', completed: false, assigneeId: 'mem_5', emoji: '🍳' },
    { id: 'ct_5_3', title: 'Iron clothes', day: 5, priority: 'low', completed: false, assigneeId: 'mem_3', emoji: '👔' },

    // Saturday (day 6)
    { id: 'ct_6_1', title: 'Gardening', day: 6, priority: 'low', completed: false, assigneeId: 'mem_2', emoji: '🌱' },
    { id: 'ct_6_2', title: 'Go to the market', day: 6, priority: 'high', completed: false, assigneeId: 'mem_1', emoji: '🛒' },
    { id: 'ct_6_3', title: 'Cook meals', day: 6, priority: 'high', completed: false, assigneeId: 'mem_5', emoji: '🍳' },
    { id: 'ct_6_4', title: 'Wash bathrooms', day: 6, priority: 'medium', completed: false, assigneeId: 'mem_5', emoji: '🚿' },
  ],
};

// ===== MONTHLY CALENDAR DATA =====
// Returns meal data organized by date for a 4-week month view
export interface MonthDayMeals {
  date: number;
  meals: { emoji: string; name: string; type: Meal['type'] }[];
}

export function getMonthlyCalendarData(): MonthDayMeals[] {
  const allWeeks = [WEEK1_MEALS, WEEK2_MEALS, WEEK3_MEALS, WEEK4_MEALS];
  const days: MonthDayMeals[] = [];

  // Generate 28 days (4 weeks) starting from March 2, 2026 (Monday)
  for (let weekIdx = 0; weekIdx < 4; weekIdx++) {
    const weekMeals = allWeeks[weekIdx];
    // Days in this week: Mon(1) to Sun(0) mapped to day indices 1-6, 0
    const dayOrder = [1, 2, 3, 4, 5, 6, 0]; // Mon, Tue, Wed, Thu, Fri, Sat, Sun
    for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
      const dayNumber = dayOrder[dayIdx];
      const dateNum = weekIdx * 7 + dayIdx + 2; // Start from March 2
      const mealsForDay = weekMeals.filter(m => m.day === dayNumber);
      days.push({
        date: dateNum,
        meals: mealsForDay.map(m => ({
          emoji: getMealEmoji(m.name),
          name: m.name,
          type: m.type,
        })),
      });
    }
  }

  return days;
}
