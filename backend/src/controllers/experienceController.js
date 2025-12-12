import Experience from '../models/Experience.js';

// @desc    Fetch all experiences
// @route   GET /api/experiences
// @access  Public
export const getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find({});
        res.json(experiences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single experience
// @route   GET /api/experiences/:id
// @access  Public
export const getExperienceById = async (req, res) => {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        const experience = await Experience.findById(req.params.id).populate('host', 'name email hostApplication');

        if (experience) {
            res.json(experience);
        } else {
            res.status(404).json({ message: 'Experience not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an experience
// @route   POST /api/experiences
// @access  Private (Host/Admin)
export const createExperience = async (req, res) => {
    try {
        const { title, description, price, category, location, image } = req.body;

        const experience = new Experience({
            title,
            description,
            price,
            category,
            location,
            image,
            host: req.user._id
        });

        const createdExperience = await experience.save();
        res.status(201).json(createdExperience);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
