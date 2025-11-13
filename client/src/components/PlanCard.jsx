import React from 'react';

const PlanCard = ({ plan, onSubscribe, isSubscribing, currentPlanId }) => {
  const isCurrentPlan = currentPlanId === plan._id;

  return (
    <div
      data-testid={`plan-card-${plan.name.toLowerCase()}`}
      className={`card hover:shadow-xl transition-all duration-300 ${
        isCurrentPlan ? 'ring-2 ring-primary-500' : ''
      }`}
    >
      {isCurrentPlan && (
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-primary-500 rounded-full">
            Current Plan
          </span>
        </div>
      )}
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2" data-testid={`plan-name-${plan.name.toLowerCase()}`}>
        {plan.name}
      </h3>
      
      <div className="mb-4">
        <span className="text-4xl font-bold text-primary-600 dark:text-primary-400" data-testid={`plan-price-${plan.name.toLowerCase()}`}>
          ${plan.price}
        </span>
        <span className="text-gray-600 dark:text-gray-400 ml-2">/ {plan.duration} days</span>
      </div>

      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start" data-testid={`plan-feature-${index}`}>
            <svg
              className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSubscribe(plan._id)}
        disabled={isSubscribing || isCurrentPlan}
        data-testid={`subscribe-btn-${plan.name.toLowerCase()}`}
        className={`w-full btn-primary ${
          isCurrentPlan ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubscribing ? 'Processing...' : isCurrentPlan ? 'Active' : 'Subscribe'}
      </button>
    </div>
  );
};

export default PlanCard;