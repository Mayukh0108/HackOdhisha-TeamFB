import User from '../models/User.js';
import jwt from 'jsonwebtoken';
export const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }
        if (!req) {
            throw new Error('Request object is undefined');
        }
        req.user = user;  
        req.userId = user._id;  
        
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ success: false, message: 'Please authenticate' });
    }
}
