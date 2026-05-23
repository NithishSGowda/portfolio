import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  coverImage: { type: String },
  tags: [String],
  readTime: { type: String },
  published: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
