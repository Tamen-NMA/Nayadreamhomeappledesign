import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import type { Recipe, Ingredient } from '../types';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealName: string;
  recipe?: Recipe;
  onSave: (recipe: Recipe) => void;
}

export default function RecipeModal({ isOpen, onClose, mealName, recipe, onSave }: RecipeModalProps) {
  const [servings, setServings] = useState(recipe?.servings || 4);
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    recipe?.ingredients || [{ name: '', amount: '', price: undefined }]
  );
  const [steps, setSteps] = useState<string[]>(recipe?.steps || ['']);

  if (!isOpen) return null;

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', price: undefined }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleUpdateIngredient = (index: number, field: keyof Ingredient, value: string | number) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const handleAddStep = () => {
    setSteps([...steps, '']);
  };

  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleUpdateStep = (index: number, value: string) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const handleSave = () => {
    const validIngredients = ingredients.filter(i => i.name.trim() && i.amount.trim());
    const validSteps = steps.filter(s => s.trim());

    if (validIngredients.length === 0 || validSteps.length === 0) {
      alert('Please add at least one ingredient and one step');
      return;
    }

    onSave({
      servings,
      ingredients: validIngredients,
      steps: validSteps,
    });
    onClose();
  };

  const isViewOnly = recipe && ingredients.every(i => i.name && i.amount) && steps.every(s => s);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#F26B5E] to-[#e05a4e] px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{mealName}</h2>
            <p className="text-white/80 text-sm">{recipe ? 'Recipe Details' : 'Add Recipe'}</p>
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
          {/* Servings */}
          <div>
            <label className="block text-sm font-semibold text-[#2F2F2F] mb-2">
              Servings
            </label>
            <input
              type="number"
              min="1"
              value={servings}
              onChange={(e) => setServings(parseInt(e.target.value) || 1)}
              className="w-24 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#F26B5E] focus:outline-none"
            />
          </div>

          {/* Ingredients */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-[#2F2F2F]">
                Ingredients
              </label>
              <button
                onClick={handleAddIngredient}
                className="text-[#F26B5E] hover:text-[#e05a4e] flex items-center gap-1 text-sm font-semibold"
              >
                <Plus className="w-4 h-4" />
                Add Ingredient
              </button>
            </div>
            <div className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Ingredient name"
                    value={ingredient.name}
                    onChange={(e) => handleUpdateIngredient(index, 'name', e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#F26B5E] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Amount"
                    value={ingredient.amount}
                    onChange={(e) => handleUpdateIngredient(index, 'amount', e.target.value)}
                    className="w-32 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#F26B5E] focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Price (optional)"
                    value={ingredient.price || ''}
                    onChange={(e) => handleUpdateIngredient(index, 'price', parseFloat(e.target.value) || 0)}
                    className="w-24 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#F26B5E] focus:outline-none"
                  />
                  {ingredients.length > 1 && (
                    <button
                      onClick={() => handleRemoveIngredient(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-[#2F2F2F]">
                Instructions
              </label>
              <button
                onClick={handleAddStep}
                className="text-[#F26B5E] hover:text-[#e05a4e] flex items-center gap-1 text-sm font-semibold"
              >
                <Plus className="w-4 h-4" />
                Add Step
              </button>
            </div>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#F26B5E] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <textarea
                    placeholder="Describe this step..."
                    value={step}
                    onChange={(e) => handleUpdateStep(index, e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#F26B5E] focus:outline-none min-h-[80px] resize-y"
                  />
                  {steps.length > 1 && (
                    <button
                      onClick={() => handleRemoveStep(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 bg-gray-50">
          <Button
            onClick={onClose}
            variant="outline"
            className="rounded-2xl border-2 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#F26B5E] hover:bg-[#e05a4e] text-white rounded-2xl px-6"
          >
            {recipe ? 'Update Recipe' : 'Save Recipe'}
          </Button>
        </div>
      </div>
    </div>
  );
}
