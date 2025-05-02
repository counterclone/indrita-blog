import mongoose from 'mongoose';

const ArticleContentSchema = new mongoose.Schema({
    articleId: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    htmlContent: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Use 'article-content' as the collection name to match MongoDB
export default mongoose.models.ArticleContent || mongoose.model('ArticleContent', ArticleContentSchema, 'article-content'); 