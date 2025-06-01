import mongoose from 'mongoose';

const activeSubscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    }
});

const ActiveSubscriber = mongoose.models.ActiveSubscriber || mongoose.model('ActiveSubscriber', activeSubscriberSchema);

export default ActiveSubscriber; 