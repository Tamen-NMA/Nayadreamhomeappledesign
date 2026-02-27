import { useNavigate } from 'react-router';
import { ShoppingBag, Users, CreditCard, Settings, ChevronRight, Wrench } from 'lucide-react';

export default function MorePage() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: ShoppingBag, label: 'Shopping List', path: '/shopping', color: 'bg-green-100 text-green-600' },
    { icon: Users, label: 'Household', path: '/household', color: 'bg-blue-100 text-blue-600' },
    { icon: CreditCard, label: 'Billing', path: '/billing', color: 'bg-purple-100 text-purple-600' },
    { icon: Settings, label: 'Settings', path: '/settings', color: 'bg-gray-100 text-gray-600' },
    { icon: Wrench, label: 'Maintenance Page', path: '/maintenance', color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-[#2F2F2F]">More</h1>

      <div className="bg-white rounded-[20px] shadow-sm divide-y divide-gray-100">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors first:rounded-t-[20px] last:rounded-b-[20px]"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="flex-1 text-left font-semibold text-[#2F2F2F]">
                {item.label}
              </span>
              <ChevronRight className="w-5 h-5 text-[#9C9C9C]" />
            </button>
          );
        })}
      </div>
    </div>
  );
}