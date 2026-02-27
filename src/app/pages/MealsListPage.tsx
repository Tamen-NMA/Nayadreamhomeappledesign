import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Plus, Utensils, Sparkles, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { supabase } from '../utils/supabase';
import type { MealPlan } from '../types';
import { api } from '../utils/api';
import { MOCK_MEAL_PLANS, getMealEmoji } from '../data/mock-kenya';

export default function MealsListPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const showList = searchParams.get('list') === 'true';
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [redirectId, setRedirectId] = useState<string | null>(null);

  useEffect(() => {
    loadMealPlans();
  }, [showList]);

  // Separate effect for redirect to avoid hooks ordering issues
  useEffect(() => {
    if (shouldRedirect && redirectId) {
      navigate(`/meals/${redirectId}`, { replace: true });
    }
  }, [shouldRedirect, redirectId, navigate]);

  async function loadMealPlans() {
    setLoading(true);
    setShouldRedirect(false);
    setRedirectId(null);
    
    try {
      const data = await api.getMealPlans();
      // Use mock data as fallback if server returns empty
      const allPlans = data && data.length > 0 ? data : MOCK_MEAL_PLANS;
      setMealPlans(allPlans);
      
      // Auto-redirect to active meal plan if not showing list
      if (!showList && allPlans.length > 0) {
        const activePlan = allPlans.find(p => p.status === 'active') || allPlans[0];
        setRedirectId(activePlan.id);
        setShouldRedirect(true);
        return;
      }
    } catch (error) {
      console.error('Failed to load meal plans, using mock data:', error);
      setMealPlans(MOCK_MEAL_PLANS);
      
      // Auto-redirect to mock meal plan if not showing list
      if (!showList && MOCK_MEAL_PLANS.length > 0) {
        const activePlan = MOCK_MEAL_PLANS.find(p => p.status === 'active') || MOCK_MEAL_PLANS[0];
        setRedirectId(activePlan.id);
        setShouldRedirect(true);
        return;
      }
    } finally {
      setLoading(false);
    }
  }

  const getMealTypeBreakdown = (plan: MealPlan) => {
    const breakdown = {
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      snack: 0,
    };

    plan.meals.forEach(meal => {
      breakdown[meal.type]++;
    });

    return breakdown;
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-6 max-w-4xl">
        <h1 className="text-3xl font-bold text-[#2F2F2F]">Meals</h1>
        <div className="bg-white rounded-[20px] p-12 text-center">
          <p className="text-[#6F6F6F]">Loading meal plans...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (mealPlans.length === 0) {
    return (
      <div className="p-4 md:p-6 space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#2F2F2F]">Meals</h1>
          <Button
            onClick={() => navigate('/meals/new')}
            className="rounded-2xl h-11 px-6 bg-[#F26B5E] hover:bg-[#e05a4e] text-white font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Plan
          </Button>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-[24px] p-12 text-center shadow-sm">
          <div className="w-20 h-20 bg-[#5FB3A6]/10 rounded-3xl mx-auto mb-4 flex items-center justify-center">
            <Utensils className="w-10 h-10 text-[#5FB3A6]" />
          </div>
          <h2 className="text-xl font-semibold text-[#2F2F2F] mb-2">
            Create your first meal plan
          </h2>
          <p className="text-[#6F6F6F] mb-6 max-w-md mx-auto">
            Get started with weekly meal planning to organize breakfast, lunch, and dinner for your household
          </p>
          <Button
            onClick={() => navigate('/meals/new')}
            className="rounded-2xl h-12 px-8 bg-[#5FB3A6] hover:bg-[#4fa396] text-white font-semibold"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Meal Plan
          </Button>
        </div>
      </div>
    );
  }

  // List with meal plans
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#2F2F2F]">Meals</h1>
        <Button
          onClick={() => navigate('/meals/new')}
          className="rounded-2xl h-11 px-6 bg-[#F26B5E] hover:bg-[#e05a4e] text-white font-semibold"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Plan
        </Button>
      </div>

      {/* Meal Plan Cards */}
      <div className="space-y-4">
        {mealPlans.map((plan) => {
          const breakdown = getMealTypeBreakdown(plan);
          return (
            <div
              key={plan.id}
              onClick={() => navigate(`/meals/${plan.id}`)}
              className="bg-white rounded-[20px] p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-[#2F2F2F]">
                      {plan.title}
                    </h3>
                    {plan.isAIGenerated && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 rounded-lg">
                        <Sparkles className="w-3 h-3 text-purple-600" />
                        <span className="text-xs font-medium text-purple-600">AI</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6F6F6F]">
                    <Calendar className="w-4 h-4" />
                    <span>{plan.weekStart} — {plan.weekEnd}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  plan.status === 'active' ? 'bg-green-100 text-green-700' :
                  plan.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {plan.status}
                </div>
              </div>

              {/* Meal Type Breakdown Pills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {breakdown.breakfast > 0 && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 rounded-full">
                    <span className="text-xs font-medium text-amber-700">
                      🍳 {breakdown.breakfast} Breakfast{breakdown.breakfast !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
                {breakdown.lunch > 0 && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-green-100 rounded-full">
                    <span className="text-xs font-medium text-green-700">
                      🍽️ {breakdown.lunch} Lunch{breakdown.lunch !== 1 ? 'es' : ''}
                    </span>
                  </div>
                )}
                {breakdown.dinner > 0 && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 rounded-full">
                    <span className="text-xs font-medium text-purple-700">
                      🍲 {breakdown.dinner} Dinner{breakdown.dinner !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
                {breakdown.snack > 0 && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 rounded-full">
                    <span className="text-xs font-medium text-blue-700">
                      🍌 {breakdown.snack} Snack{breakdown.snack !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>

              {/* Servings */}
              <div className="text-sm text-[#6F6F6F]">
                Servings: {plan.servings} people
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}