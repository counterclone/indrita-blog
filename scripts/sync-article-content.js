const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

// Get MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

async function syncArticleContent() {
  console.log('Starting article content synchronization...');
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const articlesCollection = db.collection('articles');
    const articleContentCollection = db.collection('article-content');

    // Get all articles
    const articles = await articlesCollection.find({}).toArray();
    console.log(`Found ${articles.length} articles`);

    // Get all article content documents
    const contents = await articleContentCollection.find({}).toArray();
    console.log(`Found ${contents.length} content documents`);

    // Find articles without content
    let missingContentCount = 0;
    let createdCount = 0;
    let errorCount = 0;

    for (const article of articles) {
      // Check if content exists for this article
      const content = contents.find(c => 
        c.articleId === article._id.toString() || 
        c.articleId === article._id
      );

      if (!content) {
        missingContentCount++;
        console.log(`Article "${article.title}" (ID: ${article._id}) has no content document`);
        
        try {
          // Create article content document
          const result = await articleContentCollection.insertOne({
            articleId: article._id.toString(),
            slug: article.slug || `article-${article._id}`,
            htmlContent: '', // Empty content as placeholder
            createdAt: new Date(),
            updatedAt: new Date()
          });
          
          console.log(`Created content document ${result.insertedId} for article ${article._id}`);
          createdCount++;
        } catch (err) {
          console.error(`Error creating content for article ${article._id}:`, err);
          errorCount++;
        }
      }
    }

    console.log('\nSynchronization Summary:');
    console.log(`Total articles: ${articles.length}`);
    console.log(`Articles missing content: ${missingContentCount}`);
    console.log(`Content documents created: ${createdCount}`);
    console.log(`Errors: ${errorCount}`);

    // Log all article-content relationships for verification
    console.log('\nCurrent article-content relationships:');
    const updatedContents = await articleContentCollection.find({}).toArray();
    const contentMap = {};
    
    for (const content of updatedContents) {
      contentMap[content.articleId] = content._id;
    }
    
    for (const article of articles) {
      const contentId = contentMap[article._id.toString()];
      console.log(`Article: ${article.title} (${article._id}) -> Content: ${contentId || 'MISSING'}`);
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

// Run the function
syncArticleContent().catch(console.error); 