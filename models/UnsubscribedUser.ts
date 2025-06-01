import mongoose from 'mongoose';

const unsubscribedUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    unsubscribedAt: {
        type: Date,
        default: Date.now
    },
    previousSubscriptionDate: {
        type: Date,
        required: true
    }
});

const UnsubscribedUser = mongoose.models.UnsubscribedUser || mongoose.model('UnsubscribedUser', unsubscribedUserSchema);

export default UnsubscribedUser; 