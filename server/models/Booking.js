const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  experienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true
  },
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
    required: true
  },
  userName: {
    type: String,
    required: true,
    trim: true
  },
  userEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  totalPrice: {
    type: Number,
    required: true
  },
  promoCode: {
    type: String,
    trim: true,
    default: null
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;