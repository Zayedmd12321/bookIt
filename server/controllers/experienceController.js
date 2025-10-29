const Experience = require('../models/Experience');
const Slot = require('../models/Slot');

// @desc   Fetch all experiences
// @route  GET /api/experiences
// @access Public
const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({});
    
    res.status(200).json(experiences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching experiences' });
  }
};

// @desc   Fetch a single experience by ID
// @route  GET /api/experiences/:id
// @access Public
const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    const slots = await Slot.find({ experienceId: req.params.id });

    res.status(200).json({
      experience,
      slots
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching experience details' });
  }
};

module.exports = {
  getExperiences,
  getExperienceById,
};