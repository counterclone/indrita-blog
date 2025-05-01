import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
    title: String,
    excerpt: String,
    content: String,
    image: String,
    date: Date,
    author: String,
    category: String,
    readTime: String,
    slug: String
});

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);
