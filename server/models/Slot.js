const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  experienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  totalCapacity: {
    type: Number,
    required: true,
    default: 10
  },
  bookedCount: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  // --- ADD THIS OBJECT ---
  // This tells Mongoose to include virtuals when converting to JSON
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
  // --- END OF FIX ---
});

// A virtual property to calculate remaining slots
slotSchema.virtual('slotsLeft').get(function() {
  return this.totalCapacity - this.bookedCount;
});

// A virtual property to check if it's sold out
slotSchema.virtual('isSoldOut').get(function() {
  return this.totalCapacity - this.bookedCount <= 0;
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;