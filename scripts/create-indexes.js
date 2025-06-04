const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function createIndexes() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const articlesCollection = db.collection('articles');
    
    // Create index on slug field for fast lookups
    const slugIndex = await articlesCollection.createIndex(
      { slug: 1 },
      { unique: true, background: true }
    );
    console.log('Created slug index:', slugIndex);
    
    // Create index on date field for sorting
    const dateIndex = await articlesCollection.createIndex(
      { date: -1 },
      { background: true }
    );
    console.log('Created date index:', dateIndex);
    
    // List all indexes to verify
    const indexes = await articlesCollection.listIndexes().toArray();
    console.log('All indexes:', indexes.map(idx => ({
      name: idx.name,
      key: idx.key,
      unique: idx.unique || false
    })));
    
  } catch (error) {
    console.error('Error creating indexes:', error);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

createIndexes().catch(console.error); 