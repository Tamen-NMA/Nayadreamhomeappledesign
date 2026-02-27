import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Calendar, Grid3x3, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { supabase } from '../utils/supabase';
import type { MealPlan, Meal } from '../types';
import { api } from '../utils/api';
import { DAYS_SHORT } from '../types';
import { MOCK_MEAL_PLANS, getMealEmoji, getMonthlyCalendarData } from '../data/mock-kenya';

type ViewMode = 'daily' | 'monthly';

const MEAL_TYPE_GRADIENTS = {
  breakfast: 'from-amber-400 to-orange-500',
  lunch: 'from-green-400 to-teal-500',
  dinner: 'from-[#F26B5E] to-rose-500',
  snack: 'from-purple-500 to-violet-600',
};

const MEAL_TYPE_LABELS = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
};

export default function MealDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('daily');
  const [selectedDay, setSelectedDay] = useState(0); // 0 = Monday

  useEffect(() => {
    loadPlan();
  }, [id]);

  async function loadPlan() {
    try {
      if (!id) return;

      // Check if it's a mock plan first
      const mockPlan = MOCK_MEAL_PLANS.find(p => p.id === id);
      if (mockPlan) {
        setPlan(mockPlan);
        setLoading(false);
        return;
      }

      const data = await api.getMealPlan(id);
      setPlan(data);
    } catch (error) {
      console.error('Failed to load meal plan, checking mock data:', error);
      // Fall back to mock data
      const mockPlan = MOCK_MEAL_PLANS.find(p => p.id === id);
      if (mockPlan) {
        setPlan(mockPlan);
      } else {
        toast.error('Failed to load meal plan');
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-6 max-w-4xl">
        <p className="text-[#6F6F6F]">Loading meal plan...</p>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="p-4 md:p-6 space-y-6 max-w-4xl">
        <p className="text-[#6F6F6F]">Meal plan not found</p>
      </div>
    );
  }

  const getMealsByDay = (day: number) => {
    return plan.meals.filter(meal => meal.day === day);
  };

  const getMealsByType = (meals: Meal[], type: string) => {
    return meals.filter(meal => meal.type === type);
  };

  const goToPreviousDay = () => {
    setSelectedDay((prev) => (prev === 0 ? 6 : prev - 1));
  };

  const goToNextDay = () => {
    setSelectedDay((prev) => (prev === 6 ? 0 : prev + 1));
  };

  // Day mapping: selectedDay 0=Mon(1), 1=Tue(2)... 6=Sun(0)
  const dayMap = [1, 2, 3, 4, 5, 6, 0]; // Mon-Sun mapped to JS day numbers
  const currentDayValue = dayMap[selectedDay];

  const monthlyData = getMonthlyCalendarData();

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl pb-24">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/meals')}
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-shadow"
        >
          <ArrowLeft className="w-5 h-5 text-[#2F2F2F]" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#2F2F2F]">{plan.title}</h1>
          <p className="text-sm text-[#6F6F6F]">
            {plan.weekStart} — {plan.weekEnd}
          </p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 bg-white rounded-2xl p-1 shadow-sm w-fit">
        <button
          onClick={() => setViewMode('daily')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            viewMode === 'daily'
              ? 'bg-[#F26B5E] text-white'
              : 'text-[#6F6F6F] hover:bg-gray-100'
          }`}
        >
          <Calendar className="w-4 h-4 inline mr-2" />
          Daily View
        </button>
        <button
          onClick={() => setViewMode('monthly')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            viewMode === 'monthly'
              ? 'bg-[#F26B5E] text-white'
              : 'text-[#6F6F6F] hover:bg-gray-100'
          }`}
        >
          <Grid3x3 className="w-4 h-4 inline mr-2" />
          Monthly View
        </button>
      </div>

      {/* Daily View */}
      {viewMode === 'daily' && (
        <div className="space-y-4">
          {/* Day Selector */}
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 pb-2 pt-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                  const dayMap = [1, 2, 3, 4, 5, 6, 0]; // Mon-Sun mapped to JS day numbers
                  const dayValue = dayMap[index];
                  const mealsForDay = plan.meals.filter(m => m.day === dayValue);
                  const isSelected = selectedDay === index;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(index)}
                      className={`flex-shrink-0 px-6 py-3 rounded-full font-semibold transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg scale-105'
                          : 'bg-white text-[#6F6F6F] border-2 border-gray-200 hover:border-[#F26B5E]'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-base">{day}</div>
                        <div className="text-xs mt-1 opacity-80">
                          {mealsForDay.length} meals
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Gradient fade indicators */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F9F3F1] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F9F3F1] to-transparent pointer-events-none" />
          </div>

          {/* Meals by Type */}
          <div className="space-y-4">
            {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((mealType) => {
              const meals = getMealsByType(getMealsByDay(currentDayValue), mealType);
              if (meals.length === 0) return null;

              return (
                <div key={mealType} className="space-y-3">
                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-r ${MEAL_TYPE_GRADIENTS[mealType]} rounded-2xl p-4 shadow-sm`}>
                    <h3 className="text-lg font-bold text-white">
                      {MEAL_TYPE_LABELS[mealType]}
                    </h3>
                  </div>

                  {/* Meal Cards */}
                  {meals.map((meal) => {
                    const emoji = getMealEmoji(meal.name);
                    return (
                      <div
                        key={meal.id}
                        className="bg-white rounded-2xl p-4 shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-3xl">{emoji}</span>
                          <div className="flex-1">
                            <h4 className="font-bold text-[#2F2F2F] mb-1">
                              {meal.name}
                            </h4>
                            <div className="flex items-center gap-4">
                              {meal.prepTime != null && meal.prepTime > 0 && (
                                <div className="flex items-center gap-1 text-sm text-[#6F6F6F]">
                                  <Clock className="w-4 h-4" />
                                  <span>{meal.prepTime} min</span>
                                </div>
                              )}
                              {meal.calories && (
                                <span className="text-sm text-[#6F6F6F]">{meal.calories} cal</span>
                              )}
                            </div>
                            {meal.ingredients && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {meal.ingredients.split(',').map((ingredient, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-[#6F6F6F]"
                                  >
                                    {ingredient.trim()}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Monthly View — 4-Week Calendar Grid */}
      {viewMode === 'monthly' && (
        <div className="space-y-4">
          {/* Month Header */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="text-xl font-bold text-[#2F2F2F] mb-1">March 2026</h2>
            <p className="text-sm text-[#6F6F6F]">4 weeks of Kenya meal plans</p>
          </div>

          <div className="bg-white rounded-2xl p-3 md:p-6 shadow-sm overflow-x-auto">
            <div className="grid grid-cols-7 gap-1 md:gap-2 min-w-[500px]">
              {/* Day Headers */}
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-[#6F6F6F] pb-2 uppercase tracking-wide">
                  {day}
                </div>
              ))}

              {/* Calendar Day Cells — 28 days */}
              {monthlyData.map((dayData, idx) => {
                const weekIdx = Math.floor(idx / 7);
                const weekColors = [
                  'border-[#F26B5E]/30 hover:border-[#F26B5E]',
                  'border-[#5FB3A6]/30 hover:border-[#5FB3A6]',
                  'border-purple-300/50 hover:border-purple-400',
                  'border-amber-300/50 hover:border-amber-400',
                ];

                return (
                  <div
                    key={idx}
                    className={`border-2 ${weekColors[weekIdx]} rounded-xl p-1.5 md:p-2 transition-colors cursor-pointer min-h-[80px] md:min-h-[100px]`}
                    onClick={() => {
                      // Map back to selected day for daily view
                      const dayInWeek = idx % 7;
                      setSelectedDay(dayInWeek);
                      setViewMode('daily');
                    }}
                  >
                    {/* Date number */}
                    <div className="text-xs font-bold text-[#2F2F2F] mb-1">
                      {dayData.date}
                    </div>
                    {/* Meal emojis */}
                    <div className="flex flex-col gap-0.5">
                      {dayData.meals.filter(m => m.type !== 'snack').map((meal, mIdx) => (
                        <div key={mIdx} className="flex items-center gap-1">
                          <span className="text-sm md:text-base">{meal.emoji}</span>
                          <span className="text-[9px] md:text-[10px] text-[#6F6F6F] truncate leading-tight">
                            {meal.name.split('+')[0].split('(')[0].trim()}
                          </span>
                        </div>
                      ))}
                      {/* Snack row */}
                      {dayData.meals.filter(m => m.type === 'snack').map((meal, mIdx) => (
                        <div key={`snack-${mIdx}`} className="flex items-center gap-1 opacity-70">
                          <span className="text-xs">{meal.emoji}</span>
                          <span className="text-[8px] md:text-[9px] text-[#9C9C9C] truncate">
                            {meal.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Week labels */}
            <div className="flex justify-between mt-3 px-1">
              {['Week 1 — Classic', 'Week 2 — Variety', 'Week 3 — Balanced', 'Week 4 — Wholesome'].map((label, idx) => (
                <span key={idx} className="text-[9px] md:text-xs text-[#9C9C9C] font-medium">
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-[#2F2F2F] mb-3">Meal Types</h3>
            <div className="flex flex-wrap gap-3">
              {([
                { type: 'breakfast', label: 'Breakfast', gradient: MEAL_TYPE_GRADIENTS.breakfast },
                { type: 'lunch', label: 'Lunch', gradient: MEAL_TYPE_GRADIENTS.lunch },
                { type: 'dinner', label: 'Dinner', gradient: MEAL_TYPE_GRADIENTS.dinner },
                { type: 'snack', label: 'Snack', gradient: MEAL_TYPE_GRADIENTS.snack },
              ]).map((item) => (
                <div key={item.type} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.gradient}`} />
                  <span className="text-xs text-[#6F6F6F] font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}