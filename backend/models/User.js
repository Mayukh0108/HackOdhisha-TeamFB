import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    lastResults: [
        {
            name: { type: String, required: true },
            institution: { type: String, required: true },
            date: { type: Date, default: Date.now },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    otp: {
        code: String,
        expiresAt: Date,
        sentTo: [String] 
    },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

export default User;