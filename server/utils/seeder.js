const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/mongodbConfig');

// Load models
const Experience = require('../models/Experience');
const Slot = require('../models/Slot');
const Booking = require('../models/Booking');

// Load data
const experiencesData = require('../sample-data/ExperienceSample');
// Import the new slot generator function
const generateSlots = require('../sample-data/SlotSample');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const importData = async () => {
  try {
    // --- Clear old data ---
    await Experience.deleteMany();
    await Slot.deleteMany();
    await Booking.deleteMany();

    // --- Insert experiences ---
    const createdExperiences = await Experience.insertMany(experiencesData);
    console.log('Experiences imported!');

    // --- Generate slots using the new function ---
    const allSlots = generateSlots(createdExperiences);

    // --- Insert all slots ---
    await Slot.insertMany(allSlots);
    console.log('Slots imported!');

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Experience.deleteMany();
    await Slot.deleteMany();
    await Booking.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Check for command line arguments
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}