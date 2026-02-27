// Data Types for Naya Dream Home

export type Role = 'adult' | 'teen' | 'child' | 'house_help';

export interface HouseholdMember {
  id: string;
  name: string;
  emojiAvatar: string;
  age: number;
  role: Role;
  isStaff: boolean;
  phone?: string;
  email?: string;
}

export type ChoreStatus = 'draft' | 'active' | 'completed';
export type Priority = 'low' | 'medium' | 'high';

export interface ChoreTask {
  id: string;
  title: string;
  description?: string;
  day: number; // 0-6 (Sun-Sat)
  priority: Priority;
  completed: boolean;
  assigneeId?: string;
  emoji?: string;
}

export interface ChoreSchedule {
  id: string;
  title: string;
  weekStart: string;
  weekEnd: string;
  status: ChoreStatus;
  isAIGenerated: boolean;
  tasks: ChoreTask[];
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Ingredient {
  name: string;
  amount: string;
  price?: number;
}

export interface Recipe {
  servings: number;
  ingredients: Ingredient[];
  steps: string[];
}

export interface Meal {
  id: string;
  name: string;
  description?: string;
  type: MealType;
  day: number; // 0-6 (Sun-Sat)
  calories?: number;
  prepTime?: number; // minutes
  ingredients?: string; // comma-separated for simple view
  recipe?: Recipe;
}

export interface MealPlan {
  id: string;
  title: string;
  weekStart: string;
  weekEnd: string;
  status: ChoreStatus;
  servings: number;
  isAIGenerated: boolean;
  meals: Meal[];
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  country?: string;
  dietaryRestrictions: string[];
  cuisinePreferences: string[];
  currentPlan: 'free' | 'pro' | 'family';
}

export type Country = 'kenya' | 'egypt' | 'cameroon' | 'ivory_coast';

export const EMOJI_AVATARS = [
  '👩', '👨', '👧', '👦', '👶', '🧓', '👵', '👴', 
  '🧑‍🍳', '🧑‍🌾', '🧑‍💻', '🧑‍🎨', '👷', '🧑‍⚕️'
];

export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const MEAL_TYPE_GRADIENTS = {
  breakfast: 'from-amber-400 to-orange-500',
  lunch: 'from-green-400 to-emerald-500',
  dinner: 'from-purple-400 to-pink-500',
  snack: 'from-blue-400 to-cyan-500',
};

export const MEAL_TYPE_LABELS = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
};

export const STATUS_COLORS = {
  draft: 'bg-amber-100 text-amber-700 border-amber-200',
  active: 'bg-green-100 text-green-700 border-green-200',
  completed: 'bg-blue-100 text-blue-700 border-blue-200',
};

export const PRIORITY_COLORS = {
  low: 'bg-slate-100 text-slate-700 border-slate-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  high: 'bg-red-100 text-red-700 border-red-200',
};

export const COUNTRIES = [
  { id: 'kenya' as Country, name: 'Kenya', flag: '🇰🇪' },
  { id: 'egypt' as Country, name: 'Egypt', flag: '🇪🇬' },
  { id: 'cameroon' as Country, name: 'Cameroon', flag: '🇨🇲' },
  { id: 'ivory_coast' as Country, name: 'Ivory Coast', flag: '🇨🇮' },
];

export const DIETARY_RESTRICTIONS = [
  'Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher', 
  'Dairy-Free', 'Nut-Free', 'Pescatarian'
];

export const CUISINE_PREFERENCES = [
  'African', 'Mediterranean', 'Asian', 'Latin American', 
  'Middle Eastern', 'European', 'American', 'Fusion'
];
