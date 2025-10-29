import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { createBooking, validatePromoCode } from '../services/api';
import type { IExperience, ISlot, IPromoValidation } from '../types';
import { FaArrowLeft } from 'react-icons/fa';

// Helper to format date string (e.g., "2025-10-22T...") into "2025-10-22"
const formatDate = (dateString: string) => {
  return new Date(dateString).toISOString().split('T')[0];
};

// Type for the state passed from DetailsPage
type LocationState = {
  experience: IExperience;
  slot: ISlot;
  quantity: number;
  subtotal: number;
  taxes: number;
  total: number;
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location as { state: LocationState };

  // If no state is passed, redirect home
  if (!state) {
    navigate('/');
    return null;
  }

  const { experience, slot, quantity, subtotal, taxes } = state;

  // --- State ---
  const [formData, setFormData] = useState({ fullName: '', email: '' });
  const [promoCode, setPromoCode] = useState('');
  const [promoResult, setPromoResult] = useState<IPromoValidation | null>(null);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // --- Price Calculation ---
  let promoDiscount = 0;
  if (promoResult?.isValid && promoResult.promoDetails) {
    if (promoResult.promoDetails.discountType === 'fixed') {
      promoDiscount = promoResult.promoDetails.amount;
    } else {
      promoDiscount = (subtotal * promoResult.promoDetails.amount) / 100;
    }
  }
  // Calculate final total, applying promo to subtotal *before* adding tax
  const finalTotal = Math.max(0, subtotal - promoDiscount) + taxes;
  // ---

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyPromo = async () => {
    if (!promoCode) return;
    setIsApplyingPromo(true);
    try {
      const result = await validatePromoCode(promoCode);
      setPromoResult(result);
    } catch (err) {
      setPromoResult({ isValid: false, message: 'Invalid promo code' });
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAgreed) {
      setError('You must agree to the terms and safety policy.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      const bookingData = {
        experienceId: experience._id,
        slotId: slot._id,
        userName: formData.fullName,
        userEmail: formData.email,
        quantity: quantity,
        promoCode: promoResult?.isValid ? promoCode : undefined,
      };

      const result = await createBooking(bookingData);

      // Success: Navigate to Result page with confirmation
      navigate('/result', {
        state: {
          bookingId: result.bookingDetails._id,
        },
      });

    } catch (err) {
      // Handle server-side errors
      if (err instanceof Error) {
        setError(err.message || 'Booking failed. The slot may no longer be available.');
      } else {
        setError('Booking failed. The slot may no longer be available.');
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Use max-w-5xl for more space, responsive padding
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
      <Link
        to={`/details/${experience._id}`}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-black"
      >
        <FaArrowLeft />
        Checkout
      </Link>

      {/* Responsive grid: 1 column on mobile, 2 on desktop. Gap matches image. */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr] items-start">
        {/* Left Column: Form */}
        <div className="order-2 lg:order-1">
          <div className="rounded-2xl bg-[#EFEFEF] p-6 md:p-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-[#5B5B5B]">
                  Full name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border-0 bg-[#DDDDDD] p-3 text-sm placeholder-[#727272]"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#5B5B5B]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border-0 bg-[#DDDDDD] p-3 text-sm placeholder-[#727272]"
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  id="promoCode"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  className="w-full rounded-md border-0 bg-[#DDDDDD] p-3 text-sm placeholder-[#727272]"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  disabled={isApplyingPromo}
                  className="rounded-md bg-[#161616] px-5 text-sm font-semibold text-white transition hover:bg-[#666666] cursor-pointer"
                >
                  {isApplyingPromo ? '...' : 'Apply'}
                </button>
              </div>
              {promoResult && (
                <p className={`mt-2 text-xs ${promoResult.isValid ? 'text-green-600' : 'text-red-600'}`}>
                  {promoResult.isValid ? 'Promo applied!' : promoResult.message}
                </p>
              )}
            </div>

            <div className="mt-3 pt-5 ">
              <label className="flex items-center gap-3 text-sm  cursor-pointer w-fit">
                <input
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-yellow-500 accent-[#161616]"
                />
                <span className="text-[#5B5B5B]">I agree to the terms and safety policy</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className="order-1 p-0 lg:order-2 md:p-6 bg-[#EFEFEF] rounded-xl">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Experience</span>
              <span className="font-medium text-gray-900">{experience.title}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Date</span>
              <span className="font-medium text-gray-900">{formatDate(slot.date)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Time</span>
              <span className="font-medium text-gray-900">{slot.time}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Qty</span>
              <span className="font-medium text-gray-900">{quantity}</span>
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-900">₹{subtotal.toFixed(2)}</span>
          </div>
          {promoResult?.isValid && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Promo Discount</span>
              <span>- ₹{promoDiscount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Taxes</span>
            <span className="font-medium text-gray-900">₹{taxes.toFixed(2)}</span>
          </div>

          <div className="mb-6 flex justify-between border-t border-[#D9D9D9] pt-5 text-xl font-bold">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">₹{finalTotal.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !termsAgreed}
            className="w-full rounded-lg bg-[#FFD643] py-3.5 text-sm font-semibold text-black
                       transition hover:bg-yellow-500
                       disabled:cursor-not-allowed
                       disabled:bg-[#DDDDDD] disabled:text-gray-500 cursor-pointer"
          >
            {isSubmitting ? 'Confirming...' : 'Pay and Confirm'}
          </button>
          {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;