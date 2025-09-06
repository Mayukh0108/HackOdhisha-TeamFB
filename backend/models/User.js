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
    createdAt: {
        type: Date,
        default: Date.now
    },
    otp: {
    code: String,
    expiresAt: Date,
    sentTo: [String] // Track where OTP was sent ('sms', 'email')
  },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

export default User;