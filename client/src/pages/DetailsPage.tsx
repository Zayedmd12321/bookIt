import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getExperienceById } from '../services/api';
import type { IExperience, ISlot } from '../types';
import { FaArrowLeft } from 'react-icons/fa';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [experience, setExperience] = useState<IExperience | null>(null);
  const [slots, setSlots] = useState<ISlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<ISlot | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const data = await getExperienceById(id);
        setExperience(data.experience);
        setSlots(data.slots);

        if (data.slots.length > 0) {
          const availableDate = data.slots.find(s => !s.isSoldOut)?.date;
          setSelectedDate(availableDate || data.slots[0].date);
        }
      } catch {
        setError('Failed to fetch experience details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const subtotal = (experience?.basePrice || 0) * quantity;
  const taxes = subtotal * (experience?.taxPercentage || 0) / 100;
  const total = subtotal + taxes;

  const uniqueDates = [...new Set(slots.map(slot => slot.date))].sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );
  const timeSlotsForSelectedDate = slots.filter(slot => slot.date === selectedDate);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleConfirm = () => {
    if (selectedSlot && experience) {
      navigate('/checkout', {
        state: { experience, slot: selectedSlot, quantity, subtotal, taxes, total },
      });
    }
  };

  if (isLoading) return <div className="p-12 text-center text-gray-600">Loading...</div>;
  if (error) return <div className="p-12 text-center text-red-500">{error}</div>;
  if (!experience) return <div className="p-12 text-center text-gray-600">Experience not found.</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
      {/* Back Link */}
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[#000000] transition hover:text-[#282828]"
      >
        <FaArrowLeft className="text-[#000000] hover:text-[#282828]" />
        Details
      </Link>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {/* Left Section */}
        <div className="md:col-span-2">
          <img
            src={experience.image}
            alt={experience.title}
            className="mb-6 w-full rounded-xl object-cover md:h-[420px]"
          />
          <h1 className="mb-3 text-[24px] font-medium leading-tight text-[#161616]">{experience.title}</h1>
          <p className="mb-8 text-base leading-relaxed text-[#6C6C6C]">{experience.shortDescription}</p>

          {/* Date Picker */}
          <h2 className="mb-3 text-lg font-semibold text-[#161616]">Choose a Date</h2>
          <div className="mb-8 flex flex-wrap gap-3">
            {uniqueDates.map(date => (
              <button
                key={date}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedSlot(null);
                }}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-150 cursor-pointer
                  ${selectedDate === date
                    ? 'bg-[#FFD643] border-transparent text-black shadow-sm'
                    : 'border-[#BDBDBD] border-[0.6px] text-[#838383] hover:bg-gray-100'
                  }`}
              >
                {formatDate(date)}
              </button>
            ))}
          </div>

          {/* Time Picker */}
          <h2 className="mb-2 text-lg font-semibold text-[#161616]">Choose a Time</h2>
          <div className="flex flex-wrap gap-3">
            {timeSlotsForSelectedDate.map(slot => (
              <button
                key={slot._id}
                onClick={() => setSelectedSlot(slot)}
                disabled={slot.isSoldOut}
                className={`rounded-lg border px-4 py-2 text-sm transition-all duration-150 flex flex-row items-center justify-center
      ${selectedSlot?._id === slot._id
                    ? 'bg-[#FFD643] border-transparent text-black shadow-sm cursor-pointer'
                    : slot.isSoldOut
                      ? 'cursor-not-allowed border-gray-200 bg-[#F1F1F1] text-[#6A6A6A]'
                      : 'border-[#BDBDBD] border-[0.6px] text-[#838383] hover:bg-gray-100 cursor-pointer '
                  }`}
              >
                <span>{slot.time}</span>

                {slot.isSoldOut ? (
                  <span className="ml-1 text-[10px] font-medium text-[#6A6A6A]">
                    Sold Out
                  </span>
                ) : (
                  <span className="ml-2 text-xs font-medium text-[#FF4C0A]">
                    ({slot.slotsLeft} left)
                  </span>
                )}
              </button>
            ))}

          </div>
          <p className="mt-4 text-xs text-[#838383]">All times are in IST (GMT +5:30)</p>

          {/* About */}
          <h2 className="mb-3 mt-10 text-lg font-semibold text-[#161616]">About</h2>
          <div className="rounded-lg bg-[#EEEEEE] p-5">
            <p className="text-sm leading-relaxed text-[#838383]">
              {experience.longDescription}
            </p>
          </div>
        </div>

        {/* Price Card */}
        <div className="md:col-span-1">
          <div className="sticky top-28 rounded-xl bg-[#EFEFEF] p-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-[#656565]">
                <span>Starts at</span>
                <span className="font-semibold text-[#161616]">₹{experience.basePrice}</span>
              </div>

              <div className="flex items-center justify-between text-sm text-[#656565]">
                <span>Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-lg font-bold text-gray-600 transition hover:bg-gray-100 disabled:opacity-50"
                  >
                    −
                  </button>
                  <span className="w-5 text-center font-semibold text-gray-800">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-lg font-bold text-gray-600 transition hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex justify-between text-sm text-[#656565]">
                <span>Subtotal</span>
                <span className="font-medium text-[#161616]">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#656565] mb-2">
                <span>Taxes</span>
                <span className="font-medium text-[#161616]">₹{taxes.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-6 flex justify-between border-t border-gray-200 pt-4 text-lg font-bold text-[#161616]">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleConfirm}
              disabled={!selectedSlot}
              className={`w-full rounded-lg py-3 text-sm font-semibold transition 
                ${selectedSlot
                  ? 'bg-[#FFD643] text-black hover:bg-yellow-400 cursor-pointer'
                  : 'cursor-not-allowed bg-gray-200 text-gray-500'
                }`}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
