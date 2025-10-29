const VALID_PROMOS = require('../sample-data/ValidPromos');

// @desc   Validate a promo code
// @route  POST /api/promo/validate
// @access Public
const validatePromoCode = (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: 'Promo code is required' });
  }

  const promo = VALID_PROMOS.find((p) => p.code.toLowerCase() === code.toLowerCase());

  if (promo) {
    res.status(200).json({
      isValid: true,
      promoDetails: promo,
    });
  } else {
    res.status(404).json({
      isValid: false,
      message: 'Invalid promo code',
    });
  }
};

module.exports = {
  validatePromoCode,
};