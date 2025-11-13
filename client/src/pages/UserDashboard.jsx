import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import SubscriptionCard from '../components/SubscriptionCard';
import { useAuthStore } from '../store/authStore';

const UserDashboard = () => {
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/api/subscriptions/my-subscription');
      setSubscription(response.data.data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
      setError('Failed to load subscription details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription?')) {
      return;
    }

    try {
      setIsCancelling(true);
      setError('');
      setSuccessMessage('');

      await api.post('/api/subscriptions/cancel');
      
      setSuccessMessage('Subscription cancelled successfully');
      
      // Refresh subscription data
      await fetchSubscription();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      setError(error.response?.data?.message || 'Failed to cancel subscription');
    } finally {
      setIsCancelling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]" data-testid="loading-spinner">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto" data-testid="user-dashboard">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2" data-testid="dashboard-title">
          Welcome, {user?.name}!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Manage your subscription and view your account details
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg" data-testid="error-message">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg" data-testid="success-message">
          <p className="text-green-600 dark:text-green-400 font-medium">{successMessage}</p>
        </div>
      )}

      {subscription ? (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your Active Subscription
            </h2>
          </div>
          <SubscriptionCard
            subscription={subscription}
            onCancel={handleCancel}
            isCancelling={isCancelling}
          />
        </div>
      ) : (
        <div className="card text-center py-12" data-testid="no-subscription">
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Active Subscription
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You don't have an active subscription. Browse our plans to get started!
          </p>
          <button
            onClick={() => navigate('/plans')}
            data-testid="browse-plans-btn"
            className="btn-primary"
          >
            Browse Plans
          </button>
        </div>
      )}

      {/* Account Information */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Account Information
        </h2>
        <div className="card">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Name:</span>
              <span className="text-gray-900 dark:text-white font-semibold" data-testid="account-name">{user?.name}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Email:</span>
              <span className="text-gray-900 dark:text-white font-semibold" data-testid="account-email">{user?.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Account Type:</span>
              <span className="text-gray-900 dark:text-white font-semibold capitalize" data-testid="account-role">{user?.role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;