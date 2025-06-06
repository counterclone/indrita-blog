import mongoose from 'mongoose';

const quickTakeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['text', 'chart', 'image', 'quote']
  },
  content: {
    type: String,
    required: true
  },
  chartData: {
    title: String,
    description: String,
    embedHtml: String // HTML content for chart embedding
  },
  image: String,
  author: String,
  tags: [{
    type: String
  }],
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  trending: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  links: [{
    title: String,
    url: String,
    description: String
  }]
}, {
  timestamps: true
});

export default mongoose.models.QuickTake || mongoose.model('QuickTake', quickTakeSchema); 