import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema); 