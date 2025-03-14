import { FaSearch } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();  // Get the current location

  // Function to check if the link matches the current route
  const isActive = (path) => location.pathname === path;

  return (
    <header className='bg-white shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Urban</span>
            <span className='text-slate-700'> '94</span>
          </h1>
        </Link>

        {/* <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />
          <FaSearch className='text-slate-600' />
        </form> */}

        <ul className='flex gap-4'>
          <Link to='/'>
            <li className={`hidden sm:inline text-slate-700 hover:underline ${isActive('/') && 'underline font-bold'}`}>
              Home
            </li>
          </Link>

          <Link to='/wardrobe'>
            <li className={`hidden sm:inline text-slate-700 hover:underline ${isActive('/wardrobe') && 'underline font-bold'}`}>
              Wardrobe
            </li>
          </Link>
          <Link to='/video'>
          <li className={`hidden sm:inline text-slate-700 hover:underline ${isActive('/hj') && 'underline font-bold'}`}>
  <span className="relative flex items-center">
    <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4"></span>
    {/* <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500 mr-0.5"></span> */}
    Mix and match
  </span>
</li>

</Link>

          <Link to='/home'>
            <li className={`hidden sm:inline text-slate-700 hover:underline ${isActive('/shop') && 'underline font-bold'}`}>
              Shop now
            </li>
          </Link>

          <Link to='/about'>
            <li className={`hidden sm:inline text-slate-700 hover:underline ${isActive('/about') && 'underline font-bold'}`}>
              About
            </li>
          </Link>

          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className='text-slate-700 hover:underline'>Login</li>
            )}
          </Link>
            <Link to='/cart'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='size-6'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z' />
          </svg>
          </Link>
        </ul>
      </div>
    </header>
  );
}
