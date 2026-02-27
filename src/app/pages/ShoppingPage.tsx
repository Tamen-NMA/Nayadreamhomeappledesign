import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { KENYA_SHOPPING_LIST, SHOPPING_CATEGORIES } from '../data/shopping';

export default function ShoppingPage() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

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

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl pb-24">
      {/* Header */}
      <h1 className="text-3xl font-bold text-[#2F2F2F]">Shopping List</h1>

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
                        <p className={`font-semibold text-[#2F2F2F] ${
                          isChecked ? 'line-through opacity-50' : ''
                        }`}>
                          {item.name}
                        </p>
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
        <h3 className="font-semibold text-[#2F2F2F] mb-2">Summary</h3>
        <p className="text-sm text-[#6F6F6F]">
          {totalItems} total items · {checkedCount} checked off · From plan: Kenya Weekly Plan
        </p>
      </div>
    </div>
  );
}
