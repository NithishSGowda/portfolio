import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tech: [String],
  github: String,
  demo: String,
  featured: { type: Boolean, default: false },
  image: String,
  fullDescription: String,
  features: [String],
  technologies: [String],
  workflow: [String]
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
