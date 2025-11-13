import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model.js';

dotenv.config();

const testLogin = async () => {
  try {
    // Connect to MongoDB
    const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/subscription_dashboard';
    await mongoose.connect(mongoURL);
    console.log('✅ Connected to MongoDB\n');

    // Find admin user
    const adminEmail = 'admin@example.com';
    const adminPassword = 'Admin@123';

    console.log(`🔍 Looking for user: ${adminEmail}`);
    const user = await User.findOne({ email: adminEmail });

    if (!user) {
      console.log('❌ User not found!');
      console.log('💡 Run: npm run seed (in server directory) to create the admin user');
      process.exit(1);
    }

    console.log(`✅ User found: ${user.name} (${user.email})`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Password hash exists: ${user.password ? 'Yes' : 'No'}`);
    console.log(`   Password hash length: ${user.password?.length || 0}\n`);

    // Test password comparison
    console.log(`🔐 Testing password: ${adminPassword}`);
    const isPasswordValid = await user.comparePassword(adminPassword);

    if (isPasswordValid) {
      console.log('✅ Password is VALID - Login will work!');
    } else {
      console.log('❌ Password is INVALID - Login will fail!');
      console.log('💡 The password hash might not match. Try running seed script again.');
    }

    process.exit(isPasswordValid ? 0 : 1);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

testLogin();

