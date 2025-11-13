import React from 'react';

const SubscriptionCard = ({ subscription, onCancel, isCancelling }) => {
  const daysRemaining = subscription.daysRemaining || 0;
  const isExpiringSoon = daysRemaining <= 7 && daysRemaining > 0;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="card" data-testid="subscription-card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1" data-testid="subscription-plan-name">
            {subscription.planId?.name}
          </h3>
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
              subscription.status === 'active'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : subscription.status === 'expired'
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}
            data-testid="subscription-status"
          >
            {subscription.status.toUpperCase()}
          </span>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400" data-testid="subscription-price">
            ${subscription.planId?.price}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">per month</p>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Start Date:</span>
          <span className="font-semibold text-gray-900 dark:text-white" data-testid="subscription-start-date">
            {formatDate(subscription.startDate)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">End Date:</span>
          <span className="font-semibold text-gray-900 dark:text-white" data-testid="subscription-end-date">
            {formatDate(subscription.endDate)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Days Remaining:</span>
          <span
            className={`text-2xl font-bold ${
              isExpiringSoon
                ? 'text-red-600 dark:text-red-400'
                : 'text-green-600 dark:text-green-400'
            }`}
            data-testid="subscription-days-remaining"
          >
            {daysRemaining}
          </span>
        </div>
      </div>

      {isExpiringSoon && (
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
            ⚠️ Your subscription is expiring soon!
          </p>
        </div>
      )}

      <div className="mt-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Features:</h4>
        <ul className="space-y-2">
          {subscription.planId?.features.map((feature, index) => (
            <li key={index} className="flex items-start" data-testid={`subscription-feature-${index}`}>
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
      </div>

      {subscription.status === 'active' && (
        <button
          onClick={onCancel}
          disabled={isCancelling}
          data-testid="cancel-subscription-btn"
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCancelling ? 'Cancelling...' : 'Cancel Subscription'}
        </button>
      )}
    </div>
  );
};

export default SubscriptionCard;