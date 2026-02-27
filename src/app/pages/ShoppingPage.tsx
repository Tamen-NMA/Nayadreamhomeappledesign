import { useState, useEffect } from 'react';
import { ShoppingCart, Check, ChevronDown } from 'lucide-react';
import { KENYA_SHOPPING_LIST, SHOPPING_CATEGORIES } from '../data/shopping';
import { api } from '../utils/api';
import type { MealPlan } from '../types';

export default function ShoppingPage() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMealPlans();
  }, []);

  async function loadMealPlans() {
    try {
      const plans = await api.getMealPlans().catch(() => []);
      setMealPlans(plans);
      if (plans.length > 0) {
        setSelectedPlanId(plans[0].id);
      }
    } catch (error) {
      console.error('Failed to load meal plans:', error);
    } finally {
      setLoading(false);
    }
  }

  const resetCheckedItems = () => {
    setCheckedItems(new Set());
  };

  const toggleItem = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const getItemsByCategory = (category: string) => {
    return KENYA_SHOPPING_LIST.filter(item => item.category === category);
  };

  const totalItems = KENYA_SHOPPING_LIST.length;
  const checkedCount = checkedItems.size;
  const progressPercent = (checkedCount / totalItems) * 100;
  
  // Calculate total costs
  const totalCost = KENYA_SHOPPING_LIST.reduce((sum, item) => sum + item.price, 0);
  const checkedCost = KENYA_SHOPPING_LIST
    .filter(item => checkedItems.has(item.id))
    .reduce((sum, item) => sum + item.price, 0);
  const remainingCost = totalCost - checkedCost;
  
  // Get selected meal plan
  const selectedPlan = mealPlans.find(plan => plan.id === selectedPlanId);
  const totalMeals = selectedPlan?.meals?.length || 0;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl pb-24">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-[#2F2F2F]">Shopping List</h1>
          <button
            onClick={resetCheckedItems}
            className="hidden md:block text-sm font-semibold text-[#F26B5E] hover:text-[#d95a4f] transition-colors"
          >
            Reset
          </button>
        </div>
        <p className="text-sm text-[#6F6F6F] mb-4">
          Auto-generated from your meal plan ingredients
        </p>
        
        {/* Meal Plan Selector - Desktop Only */}
        {mealPlans.length > 0 && (
          <div className="hidden md:block">
            <div className="relative">
              <select
                value={selectedPlanId}
                onChange={(e) => setSelectedPlanId(e.target.value)}
                className="w-full bg-white rounded-2xl px-6 py-4 pr-12 appearance-none border-0 shadow-sm font-semibold text-[#2F2F2F] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5FB3A6]"
              >
                {mealPlans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.title} ({plan.meals?.length || 0} meals)
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6F6F6F] pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      {/* Progress Card */}
      <div className="bg-gradient-to-r from-[#5FB3A6] to-[#4fa396] rounded-[20px] p-6 shadow-lg text-white">
        <div className="flex items-center gap-3 mb-3">
          <ShoppingCart className="w-6 h-6" />
          <h2 className="text-lg font-semibold">
            Items in cart: {checkedCount} / {totalItems}
          </h2>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
          <div
            className="bg-white h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        
        <p className="text-sm text-white/90 mt-2">
          {progressPercent === 100 ? '🎉 All done!' : `${(100 - progressPercent).toFixed(0)}% remaining`}
        </p>
      </div>

      {/* Category Cards */}
      <div className="space-y-6">
        {SHOPPING_CATEGORIES.map((category) => {
          const items = getItemsByCategory(category.name);
          const categoryCheckedCount = items.filter(item => checkedItems.has(item.id)).length;

          return (
            <div key={category.name} className="bg-white rounded-[20px] p-6 shadow-sm">
              {/* Category Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.emoji}</span>
                  <div>
                    <h3 className="text-lg font-bold text-[#2F2F2F]">
                      {category.name}
                    </h3>
                    <p className="text-sm text-[#6F6F6F]">
                      {categoryCheckedCount} / {items.length} items
                    </p>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {items.map((item) => {
                  const isChecked = checkedItems.has(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className="flex items-start gap-3 cursor-pointer group"
                    >
                      {/* Checkbox */}
                      <button
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isChecked
                            ? 'bg-[#5FB3A6] border-[#5FB3A6]'
                            : 'border-gray-300 group-hover:border-[#5FB3A6]'
                        }`}
                      >
                        {isChecked && <Check className="w-4 h-4 text-white" />}
                      </button>

                      {/* Item Info */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`font-semibold text-[#2F2F2F] ${
                            isChecked ? 'line-through opacity-50' : ''
                          }`}>
                            {item.name}
                          </p>
                          <p className={`font-bold text-[#F26B5E] ${
                            isChecked ? 'line-through opacity-50' : ''
                          }`}>
                            KES {item.price}
                          </p>
                        </div>
                        {item.usedIn.length > 0 && (
                          <p className={`text-sm text-[#6F6F6F] mt-1 ${
                            isChecked ? 'opacity-50' : ''
                          }`}>
                            {item.usedIn.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Card */}
      <div className="bg-[#FAF7F2] rounded-[20px] p-6">
        <h3 className="font-semibold text-[#2F2F2F] mb-4">Shopping Summary</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-[#6F6F6F]">Total Items</p>
            <p className="font-bold text-[#2F2F2F]">{totalItems}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-[#6F6F6F]">Checked Off</p>
            <p className="font-bold text-[#5FB3A6]">{checkedCount}</p>
          </div>
          
          <div className="border-t-2 border-gray-200 pt-3 mt-3">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-[#6F6F6F]">Total Cost</p>
              <p className="font-bold text-[#2F2F2F]">KES {totalCost.toLocaleString()}</p>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-[#6F6F6F]">In Cart</p>
              <p className="font-bold text-[#5FB3A6]">KES {checkedCost.toLocaleString()}</p>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#6F6F6F]">Remaining</p>
              <p className="font-bold text-[#F26B5E]">KES {remainingCost.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-[#6F6F6F] mt-4 text-center">
          From plan: {selectedPlan?.title || 'Kenya Weekly Plan'}
        </p>
      </div>
    </div>
  );
}