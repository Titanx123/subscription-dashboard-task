import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/subscription_dashboard';

  try {
    await mongoose.connect(mongoURL, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✅ Connected to MongoDB');

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    throw error;
  }
};

export default connectDB;
