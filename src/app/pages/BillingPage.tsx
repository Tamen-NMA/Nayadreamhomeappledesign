import { Check } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function BillingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        '1 household',
        'Up to 3 members',
        'Manual task creation',
        'Basic meal planning',
      ],
      current: true,
    },
    {
      name: 'Pro',
      price: '€9.99',
      period: 'per month',
      popular: true,
      features: [
        'Unlimited members',
        'AI-powered features',
        'Task delegation',
        'Shopping lists',
        'Priority support',
      ],
    },
    {
      name: 'Family',
      price: '€19.99',
      period: 'per month',
      features: [
        'Multiple households',
        'All Pro features',
        'Advanced AI',
        'Recipe management',
        'Priority support',
        'Early access to features',
      ],
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl">
      <h1 className="text-3xl font-bold text-[#2F2F2F]">Billing</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white rounded-[20px] p-6 shadow-sm relative ${
              plan.popular ? 'ring-2 ring-[#F26B5E]' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#F26B5E] text-white text-xs font-bold rounded-full">
                MOST POPULAR
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#2F2F2F] mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#F26B5E]">{plan.price}</span>
                <span className="text-[#6F6F6F]">{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm text-[#2F2F2F]">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              disabled={plan.current}
              className={`w-full rounded-2xl ${
                plan.current
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-[#F26B5E] hover:bg-[#e05a4e] text-white'
              }`}
            >
              {plan.current ? 'Current Plan' : 'Subscribe'}
            </Button>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-[20px] p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Need a custom plan?</h3>
        <p className="text-white/90 mb-4">
          Contact us for enterprise pricing and custom features for larger households or organizations.
        </p>
        <Button className="bg-white text-purple-600 hover:bg-gray-100 rounded-2xl">
          Contact Sales
        </Button>
      </div>
    </div>
  );
}
