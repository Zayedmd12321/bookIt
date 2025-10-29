const Booking = require('../models/Booking');
const Slot = require('../models/Slot');
const Experience = require('../models/Experience');
const VALID_PROMOS = require('../sample-data/ValidPromos')

// @desc   Create a new booking
// @route  POST /api/bookings
// @access Public
const createBooking = async (req, res) => {
  const {
    experienceId,
    slotId,
    userName,
    userEmail,
    quantity,
    // We will IGNORE totalPrice from req.body
    promoCode, 
  } = req.body;

  // --- 1. Basic Validation ---
  if (!experienceId || !slotId || !userName || !userEmail || !quantity) {
    return res.status(400).json({ message: 'Missing required booking fields' });
  }

  try {
    // --- 2. Find the slot AND the experience ---
    const slot = await Slot.findById(slotId);
    const experience = await Experience.findById(experienceId);

    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    // --- 3. CRITICAL: Check for availability ---
    const availableSlots = slot.totalCapacity - slot.bookedCount;
    if (quantity > availableSlots) {
      return res.status(400).json({
        message: 'Not enough available slots',
        slotsLeft: availableSlots,
      });
    }

    // --- 4. SERVER-SIDE PRICE CALCULATION ---
    let subtotal = experience.basePrice * quantity;
    let appliedPromoCode = null;

    if (promoCode) {
      const promo = VALID_PROMOS.find((p) => p.code.toLowerCase() === promoCode.toLowerCase());
      
      if (promo) {
        // If the code is valid, apply it
        appliedPromoCode = promo.code;
        if (promo.discountType === 'percentage') {
          subtotal = subtotal * (1 - promo.amount / 100);
        } else if (promo.discountType === 'fixed') {
          subtotal = subtotal - promo.amount;
        }
        // Ensure subtotal doesn't go below 0
        if (subtotal < 0) subtotal = 0;
      }
      // If the promo code is invalid, we just ignore it.
    }

    // Calculate final price with tax
    const taxes = (subtotal * experience.taxPercentage) / 100;
    const finalTotalPrice = parseFloat((subtotal + taxes).toFixed(2));

    // --- 5. Update the slot's bookedCount ---
    slot.bookedCount += quantity;
    await slot.save();

    // --- 6. Create the new booking document ---
    const booking = await Booking.create({
      experienceId,
      slotId,
      userName,
      userEmail,
      quantity,
      totalPrice: finalTotalPrice, // <-- Use our secure, server-calculated price
      promoCode: appliedPromoCode, // <-- Save the code only if it was valid
    });

    // --- 7. Send success response ---
    res.status(201).json({
      message: 'Booking successful!',
      bookingDetails: booking,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating booking' });
  }
};

module.exports = {
  createBooking,
};