// Helper function to get future dates
const getFutureDate = (daysToAdd) => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  // Set time to 00:00:00 to ensure date consistency
  date.setHours(0, 0, 0, 0); 
  return date;
};

// Function to generate all slots
const generateSlots = (experiences) => {
  const allSlots = [];
  
  // Get the next 5 days
  const dates = [
    getFutureDate(5),
    getFutureDate(6),
    getFutureDate(7),
    getFutureDate(8),
    getFutureDate(9),
  ];

  // Get all the experience IDs
  const [
    exp1_kayaking,
    exp2_nandi,
    exp3_coffeetrail,
    exp4_kayaking2,
    exp5_nandi2,
    exp6_boatcruise,
    exp7_bunjee,
    exp8_coffeetrail2
  ] = experiences;

  // --- 1. Slots for Kayaking (Udupi) ---
  // This one matches the Figma "Details" page
  const slots1 = [
    { experienceId: exp1_kayaking._id, date: dates[0], time: '07:00 AM', totalCapacity: 10, bookedCount: 6 }, // 4 left
    { experienceId: exp1_kayaking._id, date: dates[0], time: '09:00 AM', totalCapacity: 10, bookedCount: 8 }, // 2 left
    { experienceId: exp1_kayaking._id, date: dates[0], time: '11:00 AM', totalCapacity: 10, bookedCount: 5 }, // 5 left
    { experienceId: exp1_kayaking._id, date: dates[0], time: '01:00 PM', totalCapacity: 10, bookedCount: 10 }, // Sold out
    { experienceId: exp1_kayaking._id, date: dates[1], time: '07:00 AM', totalCapacity: 10, bookedCount: 1 },
    { experienceId: exp1_kayaking._id, date: dates[1], time: '09:00 AM', totalCapacity: 10, bookedCount: 0 },
    { experienceId: exp1_kayaking._id, date: dates[2], time: '09:00 AM', totalCapacity: 10, bookedCount: 0 },
    { experienceId: exp1_kayaking._id, date: dates[3], time: '09:00 AM', totalCapacity: 10, bookedCount: 3 },
    { experienceId: exp1_kayaking._id, date: dates[4], time: '09:00 AM', totalCapacity: 10, bookedCount: 1 },
  ];

  // --- 2. Slots for Nandi Hills Sunrise (Bangalore) ---
  const slots2 = [
    { experienceId: exp2_nandi._id, date: dates[0], time: '05:00 AM', totalCapacity: 20, bookedCount: 15 },
    { experienceId: exp2_nandi._id, date: dates[0], time: '05:30 AM', totalCapacity: 20, bookedCount: 10 },
    { experienceId: exp2_nandi._id, date: dates[1], time: '05:00 AM', totalCapacity: 20, bookedCount: 5 },
    { experienceId: exp2_nandi._id, date: dates[1], time: '05:30 AM', totalCapacity: 20, bookedCount: 8 },
    { experienceId: exp2_nandi._id, date: dates[2], time: '05:00 AM', totalCapacity: 20, bookedCount: 20 }, // Sold out
    { experienceId: exp2_nandi._id, date: dates[2], time: '05:30 AM', totalCapacity: 20, bookedCount: 18 },
  ];

  // --- 3. Slots for Coffee Trail (Coorg) ---
  const slots3 = [
    { experienceId: exp3_coffeetrail._id, date: dates[0], time: '10:00 AM', totalCapacity: 15, bookedCount: 10 },
    { experienceId: exp3_coffeetrail._id, date: dates[0], time: '02:00 PM', totalCapacity: 15, bookedCount: 5 },
    { experienceId: exp3_coffeetrail._id, date: dates[2], time: '10:00 AM', totalCapacity: 15, bookedCount: 2 },
    { experienceId: exp3_coffeetrail._id, date: dates[2], time: '02:00 PM', totalCapacity: 15, bookedCount: 0 },
  ];

  // --- 4. Slots for Kayaking (Udupi, Karnataka) ---
  const slots4 = [
    { experienceId: exp4_kayaking2._id, date: dates[1], time: '08:00 AM', totalCapacity: 8, bookedCount: 8 }, // Sold out
    { experienceId: exp4_kayaking2._id, date: dates[1], time: '11:00 AM', totalCapacity: 8, bookedCount: 3 },
    { experienceId: exp4_kayaking2._id, date: dates[2], time: '08:00 AM', totalCapacity: 8, bookedCount: 1 },
    { experienceId: exp4_kayaking2._id, date: dates[2], time: '11:00 AM', totalCapacity: 8, bookedCount: 0 },
    { experienceId: exp4_kayaking2._id, date: dates[3], time: '11:00 AM', totalCapacity: 8, bookedCount: 4 },
  ];
  
  // --- 5. Slots for Nandi Hills Sunrise (Bangalore) 2 ---
  const slots5 = [
    { experienceId: exp5_nandi2._id, date: dates[0], time: '05:00 AM', totalCapacity: 20, bookedCount: 18 },
    { experienceId: exp5_nandi2._id, date: dates[1], time: '05:30 AM', totalCapacity: 20, bookedCount: 12 },
    { experienceId: exp5_nandi2._id, date: dates[2], time: '05:00 AM', totalCapacity: 20, bookedCount: 5 },
    { experienceId: exp5_nandi2._id, date: dates[3], time: '05:30 AM', totalCapacity: 20, bookedCount: 0 },
  ];

  // --- 6. Slots for Boat Cruise (Sunderban) ---
  const slots6 = [
    { experienceId: exp6_boatcruise._id, date: dates[0], time: '09:00 AM', totalCapacity: 40, bookedCount: 35 },
    { experienceId: exp6_boatcruise._id, date: dates[0], time: '01:00 PM', totalCapacity: 40, bookedCount: 20 },
    { experienceId: exp6_boatcruise._id, date: dates[2], time: '09:00 AM', totalCapacity: 40, bookedCount: 10 },
    { experienceId: exp6_boatcruise._id, date: dates[3], time: '01:00 PM', totalCapacity: 40, bookedCount: 0 },
  ];

  // --- 7. Slots for Bunjee Jumping (Manali) ---
  const slots7 = [
    { experienceId: exp7_bunjee._id, date: dates[0], time: '12:00 PM', totalCapacity: 5, bookedCount: 5 }, // Sold out
    { experienceId: exp7_bunjee._id, date: dates[0], time: '01:00 PM', totalCapacity: 5, bookedCount: 4 },
    { experienceId: exp7_bunjee._id, date: dates[0], time: '02:00 PM', totalCapacity: 5, bookedCount: 2 },
    { experienceId: exp7_bunjee._id, date: dates[1], time: '12:00 PM', totalCapacity: 5, bookedCount: 1 },
    { experienceId: exp7_bunjee._id, date: dates[1], time: '01:00 PM', totalCapacity: 5, bookedCount: 0 },
    { experienceId: exp7_bunjee._id, date: dates[1], time: '02:00 PM', totalCapacity: 5, bookedCount: 0 },
  ];

  // --- 8. Slots for Coffee Trail (Coorg) 2 ---
  const slots8 = [
    { experienceId: exp8_coffeetrail2._id, date: dates[1], time: '11:00 AM', totalCapacity: 12, bookedCount: 6 },
    { experienceId: exp8_coffeetrail2._id, date: dates[1], time: '03:00 PM', totalCapacity: 12, bookedCount: 3 },
    { experienceId: exp8_coffeetrail2._id, date: dates[3], time: '11:00 AM', totalCapacity: 12, bookedCount: 0 },
    { experienceId: exp8_coffeetrail2._id, date: dates[3], time: '03:00 PM', totalCapacity: 12, bookedCount: 0 },
  ];

  // --- Combine all slots ---
  allSlots.push(
    ...slots1, ...slots2, ...slots3, ...slots4, 
    ...slots5, ...slots6, ...slots7, ...slots8
  );

  return allSlots;
};

module.exports = generateSlots;