export interface DefaultChore {
  id: string;
  title: string;
  emoji: string;
  duration: number; // in minutes
  priority: 'high' | 'medium' | 'low';
  day: number; // 0-6 (Mon-Sun)
}

export const DEFAULT_CHORES: DefaultChore[] = [
  // Monday
  { id: 'c1_1', title: 'Sweep and mop floors', emoji: '🧹', duration: 20, priority: 'high', day: 0 },
  { id: 'c1_2', title: 'Cook meals', emoji: '🍳', duration: 60, priority: 'high', day: 0 },
  
  // Tuesday
  { id: 'c2_1', title: 'Change bedsheets', emoji: '🛏️', duration: 20, priority: 'medium', day: 1 },
  { id: 'c2_2', title: 'Sweep floors', emoji: '🧹', duration: 15, priority: 'high', day: 1 },
  { id: 'c2_3', title: 'Cook meals', emoji: '🍳', duration: 60, priority: 'high', day: 1 },
  { id: 'c2_4', title: 'Laundry', emoji: '🧺', duration: 45, priority: 'medium', day: 1 },
  { id: 'c2_5', title: 'Wash bathrooms', emoji: '🚿', duration: 30, priority: 'medium', day: 1 },
  
  // Wednesday
  { id: 'c3_1', title: 'Sweep and mop floors', emoji: '🧹', duration: 30, priority: 'high', day: 2 },
  { id: 'c3_2', title: 'Cook meals', emoji: '🍳', duration: 60, priority: 'high', day: 2 },
  { id: 'c3_3', title: 'Iron clothes', emoji: '👔', duration: 30, priority: 'low', day: 2 },
  
  // Thursday
  { id: 'c4_1', title: 'Clean windows and dust drawers', emoji: '🪟', duration: 40, priority: 'medium', day: 3 },
  { id: 'c4_2', title: 'Sweep and mop floors', emoji: '🧹', duration: 30, priority: 'high', day: 3 },
  { id: 'c4_3', title: 'Cook meals', emoji: '🍳', duration: 60, priority: 'high', day: 3 },
  { id: 'c4_4', title: 'Laundry', emoji: '🧺', duration: 45, priority: 'medium', day: 3 },
  
  // Friday
  { id: 'c5_1', title: 'Sweep and mop floors', emoji: '🧹', duration: 30, priority: 'high', day: 4 },
  { id: 'c5_2', title: 'Cook meals', emoji: '🍳', duration: 60, priority: 'high', day: 4 },
  { id: 'c5_3', title: 'Iron clothes', emoji: '👔', duration: 30, priority: 'low', day: 4 },
  
  // Saturday
  { id: 'c6_1', title: 'Gardening', emoji: '🌱', duration: 60, priority: 'low', day: 5 },
  { id: 'c6_2', title: 'Go to the market / grocery shopping', emoji: '🛒', duration: 90, priority: 'high', day: 5 },
  { id: 'c6_3', title: 'Cook meals', emoji: '🍳', duration: 60, priority: 'high', day: 5 },
  { id: 'c6_4', title: 'Laundry and ironing', emoji: '🧺', duration: 90, priority: 'medium', day: 5 },
  { id: 'c6_5', title: 'Wash bathrooms', emoji: '🚿', duration: 30, priority: 'medium', day: 5 },
  
  // Sunday
  { id: 'c7_1', title: 'Plan weekly meals', emoji: '📋', duration: 20, priority: 'medium', day: 6 },
  { id: 'c7_2', title: 'Prep lunches for the week', emoji: '🍱', duration: 30, priority: 'medium', day: 6 },
];
