import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        const hash = await bcrypt.hash('NITZ@2005', 10);
        const r = await mongoose.connection.db.collection('users').updateOne(
            { username: 'admin' },
            { $set: { password: hash } }
        );
        console.log('Password updated:', r.modifiedCount);
        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
