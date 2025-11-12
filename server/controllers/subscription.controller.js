import Subscription from '../models/Subscription.model.js';
import Plan from '../models/Plan.model.js';
import User from '../models/User.model.js';

export const subscribe = async (req, res) => {
  try {
    const { planId } = req.params;
    const userId = req.user._id;

    // Check if plan exists
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
      });
    }

    // Check if user already has an active subscription
    const existingSubscription = await Subscription.findOne({
      userId,
      status: 'active',
    });

    if (existingSubscription) {
      // Update existing subscription status to cancelled
      existingSubscription.status = 'cancelled';
      await existingSubscription.save();
    }

    // Create new subscription
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.duration);

    const subscription = new Subscription({
      userId,
      planId,
      startDate,
      endDate,
      status: 'active',
    });

    await subscription.save();

    // Populate plan details
    await subscription.populate('planId');

    res.status(201).json({
      success: true,
      message: 'Subscription created successfully',
      data: subscription,
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating subscription',
      error: error.message,
    });
  }
};

export const getMySubscription = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find active subscription
    const subscription = await Subscription.findOne({
      userId,
      status: 'active',
    })
      .populate('planId')
      .populate('userId', 'name email');

    if (!subscription) {
      return res.status(200).json({
        success: true,
        message: 'No active subscription found',
        data: null,
      });
    }

    // Check if subscription is expired and update status
    if (subscription.isExpired()) {
      subscription.status = 'expired';
      await subscription.save();
      
      return res.status(200).json({
        success: true,
        message: 'Subscription has expired',
        data: null,
      });
    }

    // Add days remaining
    const subscriptionData = subscription.toObject();
    subscriptionData.daysRemaining = subscription.getDaysRemaining();

    res.status(200).json({
      success: true,
      message: 'Subscription retrieved successfully',
      data: subscriptionData,
    });
  } catch (error) {
    console.error('Get subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving subscription',
      error: error.message,
    });
  }
};

export const cancelSubscription = async (req, res) => {
  try {
    const userId = req.user._id;

    const subscription = await Subscription.findOne({
      userId,
      status: 'active',
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No active subscription found',
      });
    }

    subscription.status = 'cancelled';
    await subscription.save();

    res.status(200).json({
      success: true,
      message: 'Subscription cancelled successfully',
      data: subscription,
    });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling subscription',
      error: error.message,
    });
  }
};