// Comprehensive Kenyan Meals Database
// Used for searching and adding meals to plans

import type { Meal } from '../types';

export interface MealTemplate {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  prepTime: number;
  calories: number;
  ingredients: string;
  tags: string[]; // For searching
}

export const KENYA_MEALS_DATABASE: MealTemplate[] = [
  // Breakfast
  {
    id: 'meal_uji',
    name: 'Uji (Millet Porridge)',
    type: 'breakfast',
    prepTime: 15,
    calories: 280,
    ingredients: 'millet flour, water, milk, sugar',
    tags: ['millet', 'porridge', 'uji', 'traditional', 'warm']
  },
  {
    id: 'meal_mandazi',
    name: 'Mandazi + Tea',
    type: 'breakfast',
    prepTime: 20,
    calories: 310,
    ingredients: 'wheat flour, sugar, coconut milk, cardamom, tea leaves',
    tags: ['mandazi', 'tea', 'fried', 'sweet', 'pastry']
  },
  {
    id: 'meal_eggs_chai',
    name: 'Boiled Eggs + Chai',
    type: 'breakfast',
    prepTime: 10,
    calories: 220,
    ingredients: 'eggs, tea leaves, milk, sugar',
    tags: ['eggs', 'chai', 'tea', 'quick', 'protein']
  },
  {
    id: 'meal_chapati_eggs',
    name: 'Chapati + Scrambled Eggs',
    type: 'breakfast',
    prepTime: 15,
    calories: 380,
    ingredients: 'wheat flour, eggs, onions, tomatoes',
    tags: ['chapati', 'eggs', 'scrambled', 'filling']
  },
  {
    id: 'meal_pancakes',
    name: 'Pancakes',
    type: 'breakfast',
    prepTime: 15,
    calories: 340,
    ingredients: 'wheat flour, eggs, milk, sugar, butter',
    tags: ['pancakes', 'sweet', 'western', 'kids']
  },
  {
    id: 'meal_sweet_potatoes',
    name: 'Sweet Potatoes + Tea',
    type: 'breakfast',
    prepTime: 20,
    calories: 260,
    ingredients: 'sweet potatoes, tea leaves, milk, sugar',
    tags: ['sweet potatoes', 'tea', 'healthy', 'fiber']
  },
  {
    id: 'meal_mahamri',
    name: 'Mahamri + Tea',
    type: 'breakfast',
    prepTime: 25,
    calories: 320,
    ingredients: 'wheat flour, coconut milk, cardamom, sugar, tea leaves',
    tags: ['mahamri', 'coastal', 'fried', 'sweet']
  },
  {
    id: 'meal_porridge_oats',
    name: 'Oatmeal Porridge',
    type: 'breakfast',
    prepTime: 10,
    calories: 240,
    ingredients: 'oats, milk, honey, banana',
    tags: ['oats', 'porridge', 'healthy', 'quick', 'western']
  },

  // Lunch
  {
    id: 'meal_githeri',
    name: 'Githeri (Beans & Maize)',
    type: 'lunch',
    prepTime: 45,
    calories: 520,
    ingredients: 'maize kernels, beans, onions, tomatoes, avocado',
    tags: ['githeri', 'beans', 'maize', 'traditional', 'complete meal']
  },
  {
    id: 'meal_ugali_beef',
    name: 'Ugali + Beef Stew',
    type: 'lunch',
    prepTime: 45,
    calories: 620,
    ingredients: 'maize flour, beef, onions, tomatoes, garlic, ginger',
    tags: ['ugali', 'beef', 'stew', 'filling', 'traditional']
  },
  {
    id: 'meal_rice_beans',
    name: 'Rice + Beans Stew',
    type: 'lunch',
    prepTime: 40,
    calories: 490,
    ingredients: 'rice, beans, onions, tomatoes, coconut milk',
    tags: ['rice', 'beans', 'stew', 'filling']
  },
  {
    id: 'meal_pilau',
    name: 'Pilau + Kachumbari',
    type: 'lunch',
    prepTime: 45,
    calories: 580,
    ingredients: 'rice, pilau masala, onions, garlic, cilantro, tomatoes',
    tags: ['pilau', 'rice', 'spiced', 'aromatic', 'kachumbari']
  },
  {
    id: 'meal_matoke_beans',
    name: 'Matoke + Beans',
    type: 'lunch',
    prepTime: 50,
    calories: 470,
    ingredients: 'matoke, beans, onions, tomatoes',
    tags: ['matoke', 'beans', 'plantain', 'western kenya']
  },
  {
    id: 'meal_nyama_choma',
    name: 'Nyama Choma + Ugali + Kachumbari',
    type: 'lunch',
    prepTime: 60,
    calories: 720,
    ingredients: 'beef, maize flour, tomatoes, onions, cilantro, lemon',
    tags: ['nyama choma', 'grilled', 'beef', 'weekend', 'special']
  },
  {
    id: 'meal_chicken_rice',
    name: 'Chicken Stew + Rice',
    type: 'lunch',
    prepTime: 60,
    calories: 560,
    ingredients: 'chicken, rice, onions, tomatoes, garlic, ginger',
    tags: ['chicken', 'rice', 'stew', 'protein']
  },
  {
    id: 'meal_biriani',
    name: 'Biriani',
    type: 'lunch',
    prepTime: 90,
    calories: 680,
    ingredients: 'rice, goat meat, biriani spices, yogurt, cilantro',
    tags: ['biriani', 'rice', 'goat', 'spiced', 'festive', 'coastal']
  },
  {
    id: 'meal_spaghetti',
    name: 'Spaghetti Bolognese',
    type: 'lunch',
    prepTime: 30,
    calories: 540,
    ingredients: 'spaghetti, ground beef, tomatoes, onions, garlic',
    tags: ['spaghetti', 'pasta', 'western', 'beef', 'kids']
  },

  // Dinner
  {
    id: 'meal_tilapia',
    name: 'Grilled Tilapia + Sukuma Wiki',
    type: 'dinner',
    prepTime: 30,
    calories: 450,
    ingredients: 'tilapia, lemon, sukuma wiki, onions, tomatoes',
    tags: ['tilapia', 'fish', 'grilled', 'sukuma wiki', 'greens']
  },
  {
    id: 'meal_chapati_ndengu',
    name: 'Chapati + Ndengu',
    type: 'dinner',
    prepTime: 40,
    calories: 480,
    ingredients: 'wheat flour, ndengu, onions, tomatoes, garlic',
    tags: ['chapati', 'ndengu', 'green grams', 'vegetarian']
  },
  {
    id: 'meal_mukimo',
    name: 'Mukimo + Fried Cabbage',
    type: 'dinner',
    prepTime: 50,
    calories: 440,
    ingredients: 'potatoes, maize, pumpkin leaves, cabbage, onions',
    tags: ['mukimo', 'cabbage', 'traditional', 'kikuyu', 'vegetables']
  },
  {
    id: 'meal_fish_ugali',
    name: 'Fried Fish + Ugali',
    type: 'dinner',
    prepTime: 35,
    calories: 510,
    ingredients: 'tilapia, maize flour, lemon, onions',
    tags: ['fish', 'ugali', 'fried', 'protein']
  },
  {
    id: 'meal_chicken_soup',
    name: 'Chicken Soup + Rice',
    type: 'dinner',
    prepTime: 40,
    calories: 420,
    ingredients: 'chicken, rice, carrots, onions, celery',
    tags: ['chicken', 'soup', 'comfort', 'light', 'rice']
  },
  {
    id: 'meal_beans_ugali',
    name: 'Beans Stew + Ugali',
    type: 'dinner',
    prepTime: 45,
    calories: 460,
    ingredients: 'beans, maize flour, onions, tomatoes',
    tags: ['beans', 'ugali', 'vegetarian', 'filling']
  },
  {
    id: 'meal_vegetable_stir_fry',
    name: 'Vegetable Stir-fry + Rice',
    type: 'dinner',
    prepTime: 25,
    calories: 380,
    ingredients: 'cabbage, carrots, bell peppers, rice, soy sauce',
    tags: ['vegetables', 'stir-fry', 'rice', 'vegetarian', 'light']
  },
  {
    id: 'meal_samosa_bhajia',
    name: 'Samosas + Bhajia + Chai',
    type: 'dinner',
    prepTime: 45,
    calories: 520,
    ingredients: 'wheat flour, potatoes, onions, curry powder, tea leaves',
    tags: ['samosas', 'bhajia', 'fried', 'snack dinner', 'indian-inspired']
  },

  // Snacks
  {
    id: 'snack_groundnuts',
    name: 'Groundnuts',
    type: 'snack',
    prepTime: 0,
    calories: 160,
    ingredients: 'groundnuts',
    tags: ['groundnuts', 'peanuts', 'protein', 'quick']
  },
  {
    id: 'snack_banana',
    name: 'Banana',
    type: 'snack',
    prepTime: 0,
    calories: 90,
    ingredients: 'banana',
    tags: ['banana', 'fruit', 'healthy', 'quick']
  },
  {
    id: 'snack_orange',
    name: 'Orange',
    type: 'snack',
    prepTime: 0,
    calories: 60,
    ingredients: 'orange',
    tags: ['orange', 'fruit', 'vitamin c', 'healthy']
  },
  {
    id: 'snack_mango',
    name: 'Mango',
    type: 'snack',
    prepTime: 0,
    calories: 100,
    ingredients: 'mango',
    tags: ['mango', 'fruit', 'sweet', 'tropical']
  },
  {
    id: 'snack_sugarcane',
    name: 'Sugarcane',
    type: 'snack',
    prepTime: 0,
    calories: 80,
    ingredients: 'sugarcane',
    tags: ['sugarcane', 'traditional', 'sweet', 'fresh']
  },
  {
    id: 'snack_avocado',
    name: 'Avocado',
    type: 'snack',
    prepTime: 0,
    calories: 140,
    ingredients: 'avocado',
    tags: ['avocado', 'healthy', 'fat', 'fruit']
  },
  {
    id: 'snack_yogurt',
    name: 'Yogurt',
    type: 'snack',
    prepTime: 0,
    calories: 110,
    ingredients: 'yogurt',
    tags: ['yogurt', 'dairy', 'protein', 'healthy']
  },
  {
    id: 'snack_biscuits',
    name: 'Biscuits + Tea',
    type: 'snack',
    prepTime: 5,
    calories: 150,
    ingredients: 'biscuits, tea leaves, milk',
    tags: ['biscuits', 'tea', 'cookies', 'quick']
  },
];

// Search function
export function searchMeals(query: string, mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack'): MealTemplate[] {
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery) {
    // Return all meals of the type, or all meals if no type specified
    return mealType 
      ? KENYA_MEALS_DATABASE.filter(meal => meal.type === mealType)
      : KENYA_MEALS_DATABASE;
  }

  let results = KENYA_MEALS_DATABASE.filter(meal => {
    // Search in name, ingredients, and tags
    const nameMatch = meal.name.toLowerCase().includes(lowerQuery);
    const ingredientsMatch = meal.ingredients.toLowerCase().includes(lowerQuery);
    const tagsMatch = meal.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
    
    return nameMatch || ingredientsMatch || tagsMatch;
  });

  // Filter by meal type if specified
  if (mealType) {
    results = results.filter(meal => meal.type === mealType);
  }

  return results;
}

// Convert template to meal
export function createMealFromTemplate(template: MealTemplate, day: number): Omit<Meal, 'id'> {
  return {
    name: template.name,
    type: template.type,
    day: day,
    prepTime: template.prepTime,
    calories: template.calories,
    ingredients: template.ingredients,
  };
}
