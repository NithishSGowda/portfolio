import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  category: { type: String, enum: ['event', 'hackathon'], required: true },
  date: String,
  description: String,
  details: String,
  position: String,
  images: [String],
  certificate: String,
  ticket: String
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
