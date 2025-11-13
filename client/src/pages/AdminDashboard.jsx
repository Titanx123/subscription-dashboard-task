import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [subsResponse, statsResponse] = await Promise.all([
        api.get('/api/admin/subscriptions'),
        api.get('/api/admin/statistics'),
      ]);

      setSubscriptions(subsResponse.data.data);
      setStatistics(statsResponse.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'expired':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
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
    <div className="max-w-7xl mx-auto" data-testid="admin-dashboard">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2" data-testid="admin-title">
          Admin Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Manage all subscriptions and view platform statistics
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg" data-testid="error-message">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Statistics Cards */}
      {statistics && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="card" data-testid="stat-total-users">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Users</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{statistics.totalUsers}</p>
          </div>
          <div className="card" data-testid="stat-total-plans">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Plans</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{statistics.totalPlans}</p>
          </div>
          <div className="card" data-testid="stat-total-subscriptions">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Subscriptions</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{statistics.totalSubscriptions}</p>
          </div>
          <div className="card" data-testid="stat-active-subscriptions">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{statistics.activeSubscriptions}</p>
          </div>
          <div className="card" data-testid="stat-expired-subscriptions">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Expired</p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">{statistics.expiredSubscriptions}</p>
          </div>
          <div className="card" data-testid="stat-cancelled-subscriptions">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Cancelled</p>
            <p className="text-3xl font-bold text-gray-600 dark:text-gray-400">{statistics.cancelledSubscriptions}</p>
          </div>
        </div>
      )}

      {/* Subscriptions Table */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          All Subscriptions
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full" data-testid="subscriptions-table">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  End Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Days Left
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {subscriptions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No subscriptions found
                  </td>
                </tr>
              ) : (
                subscriptions.map((sub, index) => (
                  <tr key={sub._id} data-testid={`subscription-row-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white" data-testid={`user-name-${index}`}>
                          {sub.userId?.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400" data-testid={`user-email-${index}`}>
                          {sub.userId?.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white" data-testid={`plan-name-${index}`}>
                        {sub.planId?.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {sub.planId?.duration} days
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white" data-testid={`plan-price-${index}`}>
                        ${sub.planId?.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white" data-testid={`start-date-${index}`}>
                        {formatDate(sub.startDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white" data-testid={`end-date-${index}`}>
                        {formatDate(sub.endDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-semibold ${
                        sub.daysRemaining <= 7 && sub.daysRemaining > 0
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-gray-900 dark:text-white'
                      }`} data-testid={`days-remaining-${index}`}>
                        {sub.daysRemaining} days
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(sub.status)}`}
                        data-testid={`status-${index}`}
                      >
                        {sub.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
