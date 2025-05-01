import mongoose from 'mongoose';

const thoughtSchema = new mongoose.Schema({
    content: String,
    date: Date,
    xUrl: String,
    likes: Number,
    retweets: Number,
    replies: Number
});

const Thought = mongoose.models.Thought || mongoose.model('Thought', thoughtSchema);

export default Thought;
