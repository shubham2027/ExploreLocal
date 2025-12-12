import Booking from '../models/Booking.js';
import Experience from '../models/Experience.js';

// @desc    Get host dashboard stats
// @route   GET /api/bookings/host-stats
// @access  Private
export const getHostStats = async (req, res) => {
    try {
        // 1. Find all experiences hosted by the user
        const experiences = await Experience.find({ host: req.user._id });
        const experienceIds = experiences.map(exp => exp._id);

        // 2. Find all bookings for these experiences
        // We only count confirmed bookings for earnings and stats
        const bookings = await Booking.find({
            experience: { $in: experienceIds },
            status: 'confirmed'
        });

        // 3. Calculate stats
        const totalEarnings = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
        const activeBookings = bookings.length; // Or active could mean future dates, but simple count for now
        const totalGuests = bookings.reduce((sum, booking) => sum + booking.guests, 0);

        res.json({
            totalEarnings,
            activeBookings,
            totalGuests
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
    try {
        const { experienceId, date, guests, totalPrice } = req.body;

        if (!experienceId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid Experience ID' });
        }

        const experience = await Experience.findById(experienceId);

        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        const booking = new Booking({
            user: req.user._id,
            experience: experienceId,
            date,
            guests,
            totalPrice,
            status: 'confirmed'
        });

        const createdBooking = await booking.save();

        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate('experience');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
