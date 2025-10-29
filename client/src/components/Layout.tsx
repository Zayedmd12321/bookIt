import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className=' bg-[#F9F9F9] mt-1'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;