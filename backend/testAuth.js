import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const User = mongoose.model('User', new mongoose.Schema({ username: String, password: String }));
    const users = await User.find({username: 'admin'});
    console.log(`Found ${users.length} admin users.`);
    for (let u of users) {
        console.log(`ID: ${u._id}`);
        const isMatchNitz = await bcrypt.compare('NITZ@2005', u.password);
        const isMatchAdmin = await bcrypt.compare('admin123', u.password);
        console.log(`  Matches NITZ@2005: ${isMatchNitz}`);
        console.log(`  Matches admin123: ${isMatchAdmin}`);
    }

    // Force set the password for the FIRST user to admin123
    if (users.length > 0) {
        console.log('Forcing reset to admin123 for the first user just to be sure...');
        const hash = await bcrypt.hash('admin123', 10);
        await User.updateOne({ _id: users[0]._id }, { password: hash });
        console.log('Reset complete!');
    }
    process.exit(0);
});
