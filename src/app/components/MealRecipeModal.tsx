import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import type { Meal, Recipe, Ingredient } from '../types';
import { getMealEmoji } from '../data/mock-kenya';

interface MealRecipeModalProps {
  meal: Meal;
  onClose: () => void;
}

export default function MealRecipeModal({ meal, onClose }: MealRecipeModalProps) {
  const [servings, setServings] = useState(meal.recipe?.servings || 4);
  const [ingredients, setIngredients] = useState<Ingredient[]>(() => {
    if (meal.recipe?.ingredients) {
      return meal.recipe.ingredients;
    }
    // Convert comma-separated string to Ingredient array
    if (meal.ingredients) {
      return meal.ingredients.split(',').map(ing => ({
        name: ing.trim(),
        amount: '1 serving',
        price: undefined
      }));
    }
    return [{ name: '', amount: '', price: undefined }];
  });
  const [steps, setSteps] = useState<string[]>(() => {
    if (meal.recipe?.steps) {
      return meal.recipe.steps;
    }
    // Generate default recipe steps based on meal name
    return [
      `Gather all ingredients for ${meal.name}`,
      'Prepare ingredients according to the recipe',
      'Cook following traditional methods',
      'Serve hot and enjoy!'
    ];
  });

  const emoji = getMealEmoji(meal.name);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#F26B5E] to-[#e05a4e] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{emoji}</span>
            <div>
              <h2 className="text-2xl font-bold text-white">{meal.name}</h2>
              <p className="text-white/80 text-sm">Full Recipe</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6 space-y-6">
          {/* Meal Info */}
          <div className="flex items-center gap-6 pb-4 border-b border-gray-200">
            {meal.prepTime && (
              <div>
                <p className="text-sm text-[#6F6F6F]">Prep Time</p>
                <p className="text-lg font-bold text-[#2F2F2F]">{meal.prepTime} min</p>
              </div>
            )}
            {meal.calories && (
              <div>
                <p className="text-sm text-[#6F6F6F]">Calories</p>
                <p className="text-lg font-bold text-[#2F2F2F]">{meal.calories} cal</p>
              </div>
            )}
            <div>
              <p className="text-sm text-[#6F6F6F]">Servings</p>
              <p className="text-lg font-bold text-[#2F2F2F]">{servings}</p>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="text-lg font-bold text-[#2F2F2F] mb-3">Ingredients</h3>
            <div className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-[#F26B5E]" />
                  <div className="flex-1">
                    <span className="text-[#2F2F2F] font-medium">{ingredient.name}</span>
                    {ingredient.amount && (
                      <span className="text-[#6F6F6F] text-sm ml-2">— {ingredient.amount}</span>
                    )}
                  </div>
                  {ingredient.price && (
                    <span className="text-[#5FB3A6] font-semibold text-sm">
                      ${ingredient.price.toFixed(2)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-lg font-bold text-[#2F2F2F] mb-3">Instructions</h3>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#F26B5E] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="flex-1 text-[#2F2F2F] pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 bg-gray-50">
          <Button
            onClick={onClose}
            className="bg-[#F26B5E] hover:bg-[#e05a4e] text-white rounded-2xl px-8"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
