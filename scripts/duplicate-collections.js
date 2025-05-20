const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

async function duplicateCollections({
    sourceUri,
    targetUri,
    databaseName,
    collections
}) {
    console.log('Starting collection duplication...');
    
    try {
        // Connect to source cluster
        console.log('Connecting to source cluster...');
        const sourceClient = new MongoClient(sourceUri);
        await sourceClient.connect();
        
        // Connect to target cluster
        console.log('Connecting to target cluster...');
        const targetClient = new MongoClient(targetUri);
        await targetClient.connect();
        
        // Get database references
        const sourceDb = sourceClient.db(databaseName);
        const targetDb = targetClient.db(databaseName);
        
        // Process each collection
        for (const collectionName of collections) {
            console.log(`Processing collection: ${collectionName}...`);
            
            // Get collection references
            const sourceCollection = sourceDb.collection(collectionName);
            const targetCollection = targetDb.collection(collectionName);
            
            // Get all documents from source
            const documents = await sourceCollection.find({}).toArray();
            
            if (documents.length > 0) {
                // Clear target collection if it exists
                await targetCollection.deleteMany({});
                
                // Insert documents into target
                await targetCollection.insertMany(documents);
                
                console.log(`✓ Successfully duplicated collection: ${collectionName} (${documents.length} documents)`);
            } else {
                console.log(`ℹ Collection ${collectionName} is empty, skipping...`);
            }
        }
        
        // Close connections
        await sourceClient.close();
        await targetClient.close();
        
        console.log('✓ All collections duplicated successfully!');
        
    } catch (error) {
        console.error(`❌ Error during duplication: ${error.message}`);
        console.error('Full error:', error);
        process.exit(1);
    }
}

// Example usage:
const collections = [
    'articles',
    'article-content',
    'thoughts',
    'gallery',
    'subscribers'
];

// Check if running directly (not imported)
if (require.main === module) {
    // Get connection strings from environment or arguments
    const sourceUri = process.env.SOURCE_MONGODB_URI;
    const targetUri = process.env.TARGET_MONGODB_URI;
    const dbName = process.env.DB_NAME || 'blogsite';
    
    if (!sourceUri || !targetUri) {
        console.error('Please provide both SOURCE_MONGODB_URI and TARGET_MONGODB_URI in your environment variables');
        process.exit(1);
    }
    
    duplicateCollections({
        sourceUri,
        targetUri,
        databaseName: dbName,
        collections
    }).catch(console.error);
}

module.exports = duplicateCollections; 