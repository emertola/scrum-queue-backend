import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', true); // For strict query filtering
    await mongoose.connect('mongodb://localhost:27017/scrum-queue-db');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
