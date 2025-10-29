import { useLocation, Link, Navigate } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';

const ResultPage = () => {
  const location = useLocation();
  const { state } = location as { state: { bookingId: string } };

  // If no bookingId is passed, redirect to home
  if (!state?.bookingId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mx-auto max-w-lg p-8 text-center">
      <div className="flex flex-col items-center justify-center py-16">
        <span className="mb-6 text-6xl text-green-500">
          <BsCheckCircleFill />
        </span>        
        <h1 className="mb-2 text-3xl font-medium text-[#161616]">Booking Confirmed</h1>
        <p className="mb-8 text-[#656565]">
          Ref ID: {state.bookingId.slice(-10).toUpperCase()}
        </p> 
        <Link
          to="/"
          className="rounded-md bg-[#E3E3E3] px-6 py-2 text-sm font-semibold
                     text-[#656565] hover:bg-gray-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ResultPage;