import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartLength }) => {
  return (
    <header className="bg-gray-900 text-white py-4 shadow-md header">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          <span className="text-black">Profile</span><span className="text-white ">Cart</span>
        </Link>
        
        {/* Navigation Links */}
        <nav className="space-x-4">
          <Link to="/" className="hover:text-black transform transition-transform duration-300 hover:scale-105">Home</Link>
          <Link to="/cart" className="relative group">
            <span className="hover:text-black transition-colors"><i className="fa fa-shopping-cart"></i></span>
            {cartLength > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center cartIcon">
                {cartLength}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
