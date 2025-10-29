const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  longDescription: {
    type: String,
    required: true
  },
  image: { 
    type: String,
    required: true
  },
  basePrice: { 
    type: Number,
    required: true
  },
  taxPercentage: {
    type: Number,
    required: true,
    default: 5.9
  }
}, { timestamps: true });

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;