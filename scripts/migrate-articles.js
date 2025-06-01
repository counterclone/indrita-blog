const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

async function migrateArticles() {
    console.log('Starting articles migration...');
    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        const articlesCollection = db.collection('articles');
        const articleContentCollection = db.collection('article-content');

        // Get all articles and article contents
        const articles = await articlesCollection.find({}).toArray();
        const contents = await articleContentCollection.find({}).toArray();

        console.log(`Found ${articles.length} articles and ${contents.length} content documents`);

        // Create a map of content by articleId for quick lookup
        const contentMap = {};
        contents.forEach(content => {
            contentMap[content.articleId] = content;
        });

        // Create a new collection for the merged data
        const mergedArticlesCollection = db.collection('articles_new');

        // Migrate each article
        let migratedCount = 0;
        let errorCount = 0;

        for (const article of articles) {
            try {
                const articleId = article._id.toString();
                const content = contentMap[articleId];

                if (!content) {
                    console.warn(`No content found for article: ${article.title} (${articleId})`);
                    continue;
                }

                // Merge article and content data
                const mergedArticle = {
                    ...article,
                    htmlContent: content.htmlContent || '',
                    createdAt: content.createdAt || article.date || new Date(),
                    updatedAt: content.updatedAt || new Date()
                };

                // Insert into new collection
                await mergedArticlesCollection.insertOne(mergedArticle);
                migratedCount++;
                console.log(`Migrated article: ${article.title}`);
            } catch (error) {
                console.error(`Error migrating article ${article._id}:`, error);
                errorCount++;
            }
        }

        console.log('\nMigration Summary:');
        console.log(`Total articles processed: ${articles.length}`);
        console.log(`Successfully migrated: ${migratedCount}`);
        console.log(`Errors: ${errorCount}`);

        if (migratedCount > 0) {
            // Rename collections
            console.log('\nRenaming collections...');
            await articlesCollection.rename('articles_backup');
            await articleContentCollection.rename('article-content_backup');
            await mergedArticlesCollection.rename('articles');
            console.log('Collections renamed successfully');
        }

    } catch (error) {
        console.error('Migration error:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

// Run the migration
migrateArticles().catch(console.error); 