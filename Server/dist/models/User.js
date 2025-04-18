import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Invalid email']
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    betSlips: [
        {
            type: Schema.Types.ObjectId,
            ref: 'BetSlip',
        }
    ]
});
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
export const User = model('User', userSchema);
