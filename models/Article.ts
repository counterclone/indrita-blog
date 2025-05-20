import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
    title: String,
    excerpt: String,
    content: String,
    image: String,
    date: Date,
    author: String,
    category: [String],
    readTime: String,
    slug: String
});

// Use this pattern to avoid model redefinition errors
const Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema);
export default Article;
