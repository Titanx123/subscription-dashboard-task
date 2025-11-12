import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
      required: [true, 'Plan ID is required'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'cancelled'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
subscriptionSchema.index({ userId: 1, status: 1 });
subscriptionSchema.index({ endDate: 1 });

// Method to check if subscription is expired
subscriptionSchema.methods.isExpired = function () {
  return new Date() > this.endDate;
};

// Method to get days remaining
subscriptionSchema.methods.getDaysRemaining = function () {
  const now = new Date();
  const diff = this.endDate - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
};

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;