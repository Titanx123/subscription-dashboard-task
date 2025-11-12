import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model.js';
import Plan from '../models/Plan.model.js';
import Subscription from '../models/Subscription.model.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/subscription_dashboard';
    await mongoose.connect(mongoURL);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Plan.deleteMany({});
    await Subscription.deleteMany({});
    console.log('Cleared existing data');

    // Create Plans
    const plans = await Plan.insertMany([
      {
        name: 'Basic',
        price: 9.99,
        duration: 30,
        features: [
          'Access to basic features',
          'Email support',
          '5 GB storage',
          'Single user account',
        ],
      },
      {
        name: 'Standard',
        price: 19.99,
        duration: 30,
        features: [
          'Access to standard features',
          'Priority email support',
          '50 GB storage',
          'Up to 5 user accounts',
          'Advanced analytics',
        ],
      },
      {
        name: 'Premium',
        price: 29.99,
        duration: 30,
        features: [
          'Access to all premium features',
          '24/7 phone & email support',
          '200 GB storage',
          'Unlimited user accounts',
          'Advanced analytics & reporting',
          'Custom integrations',
        ],
      },
      {
        name: 'Enterprise',
        price: 49.99,
        duration: 30,
        features: [
          'Enterprise-grade features',
          'Dedicated account manager',
          'Unlimited storage',
          'Unlimited user accounts',
          'Custom analytics & reporting',
          'API access',
          'White-label options',
          'SLA guarantee',
        ],
      },
    ]);
    console.log('Created plans:', plans.map(p => p.name).join(', '));

    // Create Admin User
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'Admin@123',
      role: 'admin',
    });
    await adminUser.save();
    console.log('Created admin user: admin@example.com / Admin@123');

    // Create Test Users
    const testUser1 = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Test@123',
      role: 'user',
    });
    await testUser1.save();
    console.log('Created test user 1: john@example.com / Test@123');

    const testUser2 = new User({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'Test@123',
      role: 'user',
    });
    await testUser2.save();
    console.log('Created test user 2: jane@example.com / Test@123');

    const testUser3 = new User({
      name: 'Bob Wilson',
      email: 'bob@example.com',
      password: 'Test@123',
      role: 'user',
    });
    await testUser3.save();
    console.log('Created test user 3: bob@example.com / Test@123');

    // Create sample subscriptions for test users
    const subscription1 = new Subscription({
      userId: testUser1._id,
      planId: plans[1]._id, // Standard plan
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      status: 'active',
    });
    await subscription1.save();
    console.log('Created subscription for John Doe (Standard Plan)');

    const subscription2 = new Subscription({
      userId: testUser2._id,
      planId: plans[2]._id, // Premium plan
      startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // Started 20 days ago
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days remaining
      status: 'active',
    });
    await subscription2.save();
    console.log('Created subscription for Jane Smith (Premium Plan)');

    console.log('✅ Database seeded successfully!');
    console.log('📋 Summary:');
    console.log(`- Plans: ${plans.length}`);
    console.log(`- Users: 4 (1 admin + 3 regular users)`);
    console.log(`- Subscriptions: 2 active`);
    console.log('🔐 Login Credentials:');
    console.log('Admin: admin@example.com / Admin@123');
    console.log('User 1: john@example.com / Test@123 (has Standard subscription)');
    console.log('User 2: jane@example.com / Test@123 (has Premium subscription)');
    console.log('User 3: bob@example.com / Test@123 (no subscription)');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
