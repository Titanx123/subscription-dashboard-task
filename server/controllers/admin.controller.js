import Subscription from '../models/Subscription.model.js';
import User from '../models/User.model.js';
import Plan from '../models/Plan.model.js';

export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate('userId', 'name email role')
      .populate('planId', 'name price duration')
      .sort({ createdAt: -1 });

    // Add days remaining for each subscription
    const subscriptionsWithDetails = subscriptions.map(sub => {
      const subObj = sub.toObject();
      subObj.daysRemaining = sub.getDaysRemaining();
      
      // Auto-update expired subscriptions
      if (sub.status === 'active' && sub.isExpired()) {
        sub.status = 'expired';
        sub.save();
        subObj.status = 'expired';
      }
      
      return subObj;
    });

    res.status(200).json({
      success: true,
      message: 'All subscriptions retrieved successfully',
      data: subscriptionsWithDetails,
    });
  } catch (error) {
    console.error('Get all subscriptions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving subscriptions',
      error: error.message,
    });
  }
};

export const getStatistics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalPlans = await Plan.countDocuments({ isActive: true });
    const totalSubscriptions = await Subscription.countDocuments();
    const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    const expiredSubscriptions = await Subscription.countDocuments({ status: 'expired' });
    const cancelledSubscriptions = await Subscription.countDocuments({ status: 'cancelled' });

    res.status(200).json({
      success: true,
      message: 'Statistics retrieved successfully',
      data: {
        totalUsers,
        totalPlans,
        totalSubscriptions,
        activeSubscriptions,
        expiredSubscriptions,
        cancelledSubscriptions,
      },
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving statistics',
      error: error.message,
    });
  }
};