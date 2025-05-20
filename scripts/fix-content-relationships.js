const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

// Get MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

async function fixContentRelationships() {
  console.log('Starting article-content relationship repair...');
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

    // Map content documents by slug and articleId for quick lookup
    const contentBySlug = {};
    const contentByArticleId = {};
    
    contents.forEach(content => {
      if (content.slug) {
        contentBySlug[content.slug] = content;
      }
      if (content.articleId) {
        contentByArticleId[content.articleId] = content;
      }
    });

    // Analyze and fix relationships
    console.log('\nAnalyzing relationships between articles and content:');
    
    const fixResults = {
      linked: 0,
      created: 0,
      fixed: 0,
      errors: 0
    };

    for (const article of articles) {
      const articleId = article._id.toString();
      const slug = article.slug;
      
      console.log(`\nArticle: "${article.title}" (ID: ${articleId}, Slug: ${slug})`);
      
      // Check if content exists with this articleId
      let content = contentByArticleId[articleId];
      
      if (content) {
        console.log(`✓ Content found with matching articleId: ${content._id}`);
        fixResults.linked++;
        continue;
      }
      
      // Check if content exists with matching slug
      content = contentBySlug[slug];
      
      if (content) {
        console.log(`! Found content with matching slug but wrong articleId: ${content._id}`);
        
        // Fix the articleId
        try {
          await articleContentCollection.updateOne(
            { _id: content._id },
            { $set: { articleId: articleId } }
          );
          console.log(`✓ Updated content ${content._id} with correct articleId ${articleId}`);
          fixResults.fixed++;
        } catch (err) {
          console.error(`Error updating content ${content._id}:`, err);
          fixResults.errors++;
        }
        continue;
      }
      
      // Create new content with unique slug
      console.log(`× No content found for this article. Creating new content...`);
      
      try {
        // Generate unique slug to avoid conflicts
        const uniqueSlug = `${slug}-${Date.now()}`;
        
        const result = await articleContentCollection.insertOne({
          articleId: articleId,
          slug: uniqueSlug,
          htmlContent: '',
          createdAt: new Date(),
          updatedAt: new Date()
        });
        
        console.log(`✓ Created new content document ${result.insertedId} with unique slug ${uniqueSlug}`);
        fixResults.created++;
      } catch (err) {
        console.error(`Error creating content for article ${articleId}:`, err);
        fixResults.errors++;
      }
    }

    // Final verification
    console.log('\nVerification after fixes:');
    const updatedContents = await articleContentCollection.find({}).toArray();
    const updatedContentMap = {};
    
    for (const content of updatedContents) {
      updatedContentMap[content.articleId] = content._id;
    }
    
    let missingCount = 0;
    for (const article of articles) {
      const articleId = article._id.toString();
      const contentId = updatedContentMap[articleId];
      if (contentId) {
        console.log(`✓ Article: ${article.title} (${articleId}) -> Content: ${contentId}`);
      } else {
        console.log(`× Article: ${article.title} (${articleId}) -> Content: MISSING`);
        missingCount++;
      }
    }

    console.log('\nRepair Summary:');
    console.log(`Total articles: ${articles.length}`);
    console.log(`Articles with correct content: ${fixResults.linked}`);
    console.log(`Articles with fixed content: ${fixResults.fixed}`);
    console.log(`Articles with new content: ${fixResults.created}`);
    console.log(`Errors: ${fixResults.errors}`);
    console.log(`Articles still missing content: ${missingCount}`);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

// Run the function
fixContentRelationships().catch(console.error); 