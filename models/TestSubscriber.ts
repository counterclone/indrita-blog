import mongoose from 'mongoose';

const TestSubscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.TestSubscriber || mongoose.model('TestSubscriber', TestSubscriberSchema); 