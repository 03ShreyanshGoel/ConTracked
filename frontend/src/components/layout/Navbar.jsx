import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import { FaUserCircle, FaLaptopCode } from "react-icons/fa"; // <-- Added FaLaptopCode

const Navbar = () => {
  const { isAuthenticated, user, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsUserDropdownOpen(false);
  };

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white px-16 py-3 shadow-md w-full">
      {/* Left - Logo */}
      <Link
        to="/contests"
        className="flex items-center gap-4 text-3xl font-bold"
      >
        <FaLaptopCode className="text-gray-400 text-6xl" /> {/* Logo Icon */}
        ConTracked
      </Link>

      {/* Right - User Dropdown */}
      <div className="relative">
        <button
          className="flex items-center gap-2 px-3 py-2 text-white hover:text-gray-300"
          onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
        >
          <FaUserCircle />
          {isAuthenticated
            ? `${user?.username.toUpperCase()} (${
                role === "admin" ? "Admin" : "User"
              })`
            : "LOGIN"}
        </button>

        {isUserDropdownOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-lg p-2 z-10">
            {isAuthenticated ? (
              <>
                {/* Bookmarks Option */}
                <Link
                  to="/bookmarks"
                  className="block p-2 hover:bg-gray-200"
                  onClick={() => setIsUserDropdownOpen(false)}
                >
                  📌 Bookmarks
                </Link>

                {/* Logout Button */}
                <button
                  className="w-full text-left p-2 hover:bg-gray-200 text-red-600"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="block p-2 hover:bg-gray-200"
                onClick={() => setIsUserDropdownOpen(false)}
              >
                🔑 Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
