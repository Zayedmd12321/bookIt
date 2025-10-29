import { Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

const Navbar = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <nav className="relative z-10 w-full bg-[#F9F9F9] shadow-[0px_2px_16px_0px_#0000001A]">
      <div className="flex w-full flex-col items-center justify-between gap-4 px-5 py-4 md:flex-row md:gap-0 md:px-10">
        <Link to="/">
          <img
            src="/logo.png"
            alt="Highway Delite Logo"
            className="h-[55px] w-[100px] shrink-0"
          />
        </Link>

        <div className="flex w-full gap-3 md:max-w-lg">
          <input
            type="text"
            placeholder="Search experiences"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-gray-200 bg-gray-100 p-2.5 text-sm placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none focus:ring-0"
          />
          <button
            className="rounded-md bg-[#FFD643] px-6 text-sm font-medium text-[#161616] hover:bg-yellow-500 focus:outline-none"
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
