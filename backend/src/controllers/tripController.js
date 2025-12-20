import Trip from '../models/Trip.js';
import Experience from '../models/Experience.js';

// @desc    Create a new trip
// @route   POST /api/trips
// @access  Private
const createTrip = async (req, res) => {
    try {
        const { title, location, startDate, endDate, guests } = req.body;

        const trip = await Trip.create({
            user: req.user._id,
            title,
            location,
            startDate,
            endDate,
            guests: guests || 1,
            experiences: []
        });

        res.status(201).json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user trips
// @route   GET /api/trips
// @access  Private
const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get trip by ID
// @route   GET /api/trips/:id
// @access  Private
const getTripById = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id).populate('experiences.experience');

        if (trip && trip.user.toString() === req.user._id.toString()) {
            res.json(trip);
        } else {
            res.status(404).json({ message: 'Trip not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add experience to trip
// @route   POST /api/trips/:id/experience
// @access  Private
const addExperienceToTrip = async (req, res) => {
    try {
        const { experienceId } = req.body;
        const trip = await Trip.findById(req.params.id);

        if (trip && trip.user.toString() === req.user._id.toString()) {
            // Check if already exists
            const alreadyAdded = trip.experiences.find(
                item => item.experience.toString() === experienceId
            );

            if (alreadyAdded) {
                res.status(400).json({ message: 'Experience already in trip' });
                return;
            }

            trip.experiences.push({ experience: experienceId });
            await trip.save();

            // Re-populate to return full object immediately if needed, or just trip
            // Keeping it simple for now
            res.json(trip);
        } else {
            res.status(404).json({ message: 'Trip not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove experience from trip
// @route   DELETE /api/trips/:id/experience/:expId
// @access  Private
const removeExperienceFromTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);

        if (trip && trip.user.toString() === req.user._id.toString()) {
            trip.experiences = trip.experiences.filter(
                (item) => item.experience.toString() !== req.params.expId
            );

            await trip.save();
            res.json(trip);
        } else {
            res.status(404).json({ message: 'Trip not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private
const updateTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);

        if (trip && trip.user.toString() === req.user._id.toString()) {
            trip.guests = req.body.guests || trip.guests;
            trip.title = req.body.title || trip.title;
            trip.startDate = req.body.startDate || trip.startDate;
            trip.endDate = req.body.endDate || trip.endDate;

            const updatedTrip = await trip.save();
            res.json(updatedTrip);
        } else {
            res.status(404).json({ message: 'Trip not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete trip
// @route   DELETE /api/trips/:id
// @access  Private
const deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);

        if (trip && trip.user.toString() === req.user._id.toString()) {
            await trip.deleteOne();
            res.json({ message: 'Trip removed' });
        } else {
            res.status(404).json({ message: 'Trip not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    createTrip,
    getTrips,
    getTripById,
    addExperienceToTrip,
    removeExperienceFromTrip,
    updateTrip,
    deleteTrip
};
