import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    role: {
        type: String,
        enum: ['user', 'admin', 'host'],
        default: 'user'
    },
    hostRequestStatus: {
        type: String,
        enum: ['none', 'pending', 'approved', 'rejected'],
        default: 'none'
    },
    hostApplication: {
        firstName: String,
        lastName: String,
        phone: String,
        bio: String,
        category: String,
        appliedAt: {
            type: Date,
            default: Date.now
        }
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
