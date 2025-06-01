import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    content: String,
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        required: true
    },
    category: [String],
    readTime: String,
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

// Add a pre-save middleware to update the updatedAt field
ArticleSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Use this pattern to avoid model redefinition errors
const Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema);
export default Article;
