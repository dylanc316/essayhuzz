// scripts/test-db.ts
import connectToDatabase from '../lib/db';

async function testConnection() {
  try {
    const mongoose = await connectToDatabase();
    console.log('MongoDB connection test successful!');
    console.log('Connection state:', mongoose.connection.readyState);
    
    // List all collections in the database
    const collections = await mongoose.connection.db.collections();
    console.log('Collections:');
    collections.forEach(collection => {
      console.log(`- ${collection.collectionName}`);
    });
    
    // Close the connection when done
    await mongoose.disconnect();
    console.log('Connection closed successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

testConnection();