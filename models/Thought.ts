import mongoose from 'mongoose';

const ThoughtSchema = new mongoose.Schema({
    content: String,
    date: Date,
    xUrl: String,
    likes: Number,
    retweets: Number,
    replies: Number
});

export default mongoose.models.Thought || mongoose.model('Thought', ThoughtSchema);
