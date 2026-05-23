import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Education from './models/Education.js';

dotenv.config();

const test = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected');
        
        const newEdu = new Education({ type: 'semester', semester: 1, sgpa: 7.5 });
        await newEdu.save();
        console.log('Saved successfully:', newEdu);
        
        const all = await Education.find();
        console.log('All:', all);
        
        process.exit(0);
    } catch (e) {
        console.error('Error:', e);
        process.exit(1);
    }
};

test();
