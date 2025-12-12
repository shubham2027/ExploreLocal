import User from '../models/User.js';
import Booking from '../models/Booking.js';

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeBookings = await Booking.countDocuments({ status: 'confirmed' });

        res.json({
            totalUsers,
            activeBookings
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all host requests
// @route   GET /api/admin/host-requests
// @access  Private/Admin
export const getAllHostRequests = async (req, res) => {
    try {
        const users = await User.find({ hostRequestStatus: 'pending' }).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Approve host request
// @route   PUT /api/admin/approve-host/:id
// @access  Private/Admin
export const approveHostRequest = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            // Only update role if not already admin
            if (user.role !== 'admin') {
                user.role = 'host';
            }
            user.hostRequestStatus = 'approved';
            await user.save();
            res.json({ message: 'User approved as host', user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Reject host request
// @route   PUT /api/admin/reject-host/:id
// @access  Private/Admin
export const rejectHostRequest = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.hostRequestStatus = 'rejected';
            await user.save();
            res.json({ message: 'Host request rejected', user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
