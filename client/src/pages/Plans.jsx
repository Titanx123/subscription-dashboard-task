import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PlanCard from '../components/PlanCard';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
    fetchCurrentSubscription();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await api.get('/api/plans');
      setPlans(response.data.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setError('Failed to load plans');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCurrentSubscription = async () => {
    try {
      const response = await api.get('/api/subscriptions/my-subscription');
      if (response.data.data) {
        setCurrentSubscription(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  const handleSubscribe = async (planId) => {
    try {
      setIsSubscribing(true);
      setError('');
      setSuccessMessage('');

      const response = await api.post(`/api/subscriptions/subscribe/${planId}`);
      
      setSuccessMessage('Successfully subscribed to the plan!');
      
      // Refresh subscription data
      await fetchCurrentSubscription();
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error subscribing:', error);
      setError(error.response?.data?.message || 'Failed to subscribe to plan');
    } finally {
      setIsSubscribing(false);
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
    <div className="max-w-7xl mx-auto" data-testid="plans-page">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="plans-title">
          Choose Your Plan
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Select the perfect subscription plan for your needs
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg" data-testid="error-message">
          <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg" data-testid="success-message">
          <p className="text-green-600 dark:text-green-400 text-center font-medium">{successMessage}</p>
        </div>
      )}

      {currentSubscription && (
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg" data-testid="current-subscription-notice">
          <p className="text-blue-800 dark:text-blue-300 text-center">
            You currently have an active <strong>{currentSubscription.planId?.name}</strong> subscription.
            Subscribing to a new plan will replace your current subscription.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan._id}
            plan={plan}
            onSubscribe={handleSubscribe}
            isSubscribing={isSubscribing}
            currentPlanId={currentSubscription?.planId?._id}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => navigate('/dashboard')}
          data-testid="view-dashboard-btn"
          className="btn-secondary"
        >
          View My Dashboard
        </button>
      </div>
    </div>
  );
};

export default Plans;