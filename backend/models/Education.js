import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  location: String,
  period: String,
  grade: String,
  highlights: [String]
}, { timestamps: true });

export default mongoose.model('Education', educationSchema);
