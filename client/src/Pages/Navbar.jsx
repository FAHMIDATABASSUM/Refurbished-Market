import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { logOut } from '@/Api/authApi';
import { Button } from '@/components/ui/button';
import { FiShoppingCart, FiHeart } from 'react-icons/fi'; // ✅ Icons

const Navbar = () => {
  const { role, setRole } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      setRole(null);
      navigate('/login'); 
    } catch (error) {
      console.log('Logout failed:', error);
    }
  };

  if (!role) return null;

  return (
    <nav className="bg-white py-4 px-8 flex justify-between items-center shadow">
      {/* Left Side Navigation */}
      <div className="flex items-center space-x-6">
        {["user", "seller", "admin"].includes(role) && (
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300"
          >
            Home
          </Link>
        )}

        {role === 'user' && (
          <Link
            to="/allproductbystatus"
            className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300"
          >
            All Products
          </Link>
        )}

        {role === 'seller' && (
          <>
            <Link
              to="/product-upload"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300"
            >
              Upload Product
            </Link>
            <Link
              to="/my-products"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300"
            >
              My Products
            </Link>
          </>
        )}

        {role === 'admin' && (
          <Link
            to="/allproduct"
            className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-300"
          >
            Products
          </Link>
        )}
      </div>

      {/* Right Side - Wishlist, Cart & Logout */}
      <div className="flex items-center space-x-4">
        {role === 'user' && (
          <>
            <Link to="/wishlist" className="text-gray-700 hover:text-red-500 text-2xl">
              <FiHeart />
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-blue-500 text-2xl">
              <FiShoppingCart />
            </Link>
          </>
        )}
        <Button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md"
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
