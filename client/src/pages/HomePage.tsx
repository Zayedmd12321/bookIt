import { useEffect, useState } from 'react';
import { getExperiences } from '../services/api';
import type { IExperience } from '../types';
import ExperienceCard from '../components/ExperienceCard';
import { useSearch } from '../context/SearchContext';
import ExperienceCardSkeleton from '../components/skeletons/ExperienceCardSkeleton';

const HomePage = () => {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { searchQuery } = useSearch();

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setIsLoading(true);
        const data = await getExperiences();
        setExperiences(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError('An unknown error occurred while fetching experiences.');
      }
    };

    fetchExperiences();
  }, []);

  // --- Filter based on searchQuery ---
  const filteredExperiences = experiences.filter(
    (exp) =>
      exp.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ExperienceCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="p-8 text-center text-lg text-red-600">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  // --- Success State ---
  return (
    <div className="p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        {filteredExperiences.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredExperiences.map((exp) => (
              <ExperienceCard key={exp._id} experience={exp} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            No experiences found for "{searchQuery}".
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;