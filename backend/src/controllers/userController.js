import User from '../models/User.js';
import Booking from '../models/Booking.js';

// @desc    Get user stats (Trips Taken, etc)
// @route   GET /api/users/stats
// @access  Private
export const getUserStats = async (req, res) => {
    try {
        const currentDate = new Date();
        const tripsTaken = await Booking.countDocuments({
            user: req.user._id,
            status: 'confirmed',
            date: { $lt: currentDate }
        });

        res.json({
            tripsTaken
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Request to become a host
// @route   POST /api/users/request-host
// @access  Private
export const requestHost = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            if (user.role === 'host') {
                return res.status(400).json({ message: 'You are already a host' });
            }
            if (user.hostRequestStatus === 'pending') {
                return res.status(400).json({ message: 'Application already pending' });
            }
            if (user.hostRequestStatus === 'approved') {
                return res.status(400).json({ message: 'Application already approved' });
            }

            const { firstName, lastName, bio, category, phone } = req.body;

            user.hostRequestStatus = 'pending';
            user.hostApplication = {
                firstName,
                lastName,
                phone,
                bio,
                category
            };

            await user.save();
            res.status(200).json({ message: 'Host request submitted successfully', status: 'pending', hostRequestStatus: 'pending' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Restore admin role (Temporary Fix)
// @route   PUT /api/users/restore-admin
// @access  Private
export const restoreAdmin = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.role = 'admin';
            await user.save();
            res.json({ message: 'Admin privileges restored', user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
