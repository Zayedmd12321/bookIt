import { Link } from 'react-router-dom';
import type { IExperience } from '../types';

type ExperienceCardProps = {
  experience: IExperience;
};

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-[#F0F0F0] transition-shadow duration-300 hover:shadow-xl">
      <Link to={`/details/${experience._id}`}>
        {/* Card Image */}
        <img
          src={experience.image}
          alt={experience.title}
          className="h-48 w-full object-cover" // Fixed height for uniformity
        />

        {/* Card Content */}
        <div className="flex flex-col gap-2 p-4">
          {/* Row 1: Title and Location */}
          <div className="flex items-center justify-between">
            <h3 className="truncate text-[16px] font-medium text-[#161616]">
              {experience.title}
            </h3>
            <span className="shrink-0 rounded-sm bg-[#D6D6D6] px-1.5 py-1.5 text-[11px] font-medium text-[#161616]">
              {experience.location}
            </span>
          </div>

          {/* Row 2: Description */}
          <p className="text-[12px] text-[#6C6C6C] line-clamp-2">
            {experience.shortDescription}
          </p>

          {/* Row 3: Price and Button */}
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm flex items-center gap-1.5">
              <span className="text-[#161616] text-[12px]">From </span>
              <span className="text-lg font-medium text-[#161616]">
                ₹{experience.basePrice}
              </span>
            </p>
            {/* This is a styled span, not a button, because the whole card is a link */}
            <span
              className="rounded-md bg-[#FFD643] px-4 py-2 text-sm font-semibold text-gray-900 
                         hover:bg-yellow-400"
            >
              View Details
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ExperienceCard;