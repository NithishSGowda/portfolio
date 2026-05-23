import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  type: { type: String, enum: ['education', 'semester'], default: 'education' },
  degree: String,
  institution: String,
  location: String,
  period: String,
  grade: String,
  highlights: [String],
  semester: Number,
  sgpa: Number
}, { timestamps: true });

export default mongoose.model('Education', educationSchema);
