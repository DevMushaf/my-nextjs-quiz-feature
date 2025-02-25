import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

console.log('DB: Using MongoDB URI:', MONGODB_URI.replace(/:[^:]*@/, ':****@')); // Log URI with hidden password

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log('DB: Using existing connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('DB: Creating new connection to MongoDB...');
    cached.promise = mongoose.connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log('DB: Successfully connected to MongoDB');
        return mongoose;
      })
      .catch((error) => {
        console.error('DB: Connection error:', error);
        cached.promise = null;
        throw error;
      });
  } else {
    console.log('DB: Connection in progress, waiting...');
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('DB: Error while awaiting connection:', e);
    throw e;
  }

  return cached.conn;
}

export default connectDB;

