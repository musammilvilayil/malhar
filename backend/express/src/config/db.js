const mongoose = require('mongoose');

const DEFAULT_LOCAL_URI = 'mongodb://127.0.0.1:27017/malhar';

const connectDB = async () => {
  mongoose.set('strictQuery', false);

  const mongoUri = process.env.MONGODB_URI || DEFAULT_LOCAL_URI;
  const usingLocalFallback = !process.env.MONGODB_URI;

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
    });

    console.log(`MongoDB connected (${usingLocalFallback ? 'local' : 'configured URI'})`);
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);

    if (usingLocalFallback) {
      console.error(
        'No MONGODB_URI was provided, so the backend tried mongodb://127.0.0.1:27017/malhar. ' +
        'Start a local MongoDB service or create backend/express/.env with a MongoDB Atlas connection string.'
      );
    } else {
      console.error(
        'Check that MONGODB_URI is correct, the Atlas database user exists, and your current IP is allowed in MongoDB Atlas Network Access.'
      );
    }

    throw error;
  }
};

module.exports = connectDB;
