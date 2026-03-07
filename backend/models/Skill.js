import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  skills: [{
    name: String,
    level: Number
  }]
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
