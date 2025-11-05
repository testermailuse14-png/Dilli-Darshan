import { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

export  function Navbar({ isLoggedIn, user, onLogout }) {
  // We'll keep the mobile menu logic even if not explicitly shown in your image,
  // as it's good practice for responsive design.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Places', path: '/Places' },
    { label: 'Cab Booking', path: '/cab-booking' },
    { label: 'Hidden Gems', path: '/hidden-gems' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            {/* The orange square icon with a monument */}
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white text-xl">🏛️</span>
            </div>
            <div>
              <span className="block text-xl font-bold text-gray-800">Delhi Darshan</span>
              <span className="block text-xs text-gray-600 -mt-1">Discover & Explore</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-0"> {/* space-x-0 for minimal gap */}
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-3 py-2 text-orange-800 font-medium hover:text-orange-600 transition-colors duration-200"
                // No border-bottom on hover, as seen in the image
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Section (Sign In/Logout) */}
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              // If logged in, show user info and logout button (not in image but good practice)
              <div className="flex items-center space-x-3">
                <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              // Sign In button as seen in the image
              <Link
                to="/signin" // Assuming a sign-in route
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button (Hamburger/Close icon) */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {isLoggedIn ? (
                <button
                  onClick={() => { onLogout(); setIsMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/signin"
                  className="block w-full text-center px-3 py-2 mt-2 bg-orange-500 text-white rounded-md text-base font-medium hover:bg-orange-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}