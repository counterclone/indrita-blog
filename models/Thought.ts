import mongoose from 'mongoose';

const ThoughtSchema = new mongoose.Schema({
    embedHtml: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Thought || mongoose.model('Thought', ThoughtSchema);
