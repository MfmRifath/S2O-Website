import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {jwtDecode }from "jwt-decode"; // Import jwt-decode

const Navbar: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null); // Track user role
  const location = useLocation();
  const navigate = useNavigate();

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      try {
        // Decode the token to get user roles
        const decodedToken: any = jwtDecode(token);

        // Check if the roles array contains specific roles
        const roles = decodedToken.roles || [];
        if (roles.includes("ROLE_ADMIN")) {
          setUserRole("ROLE_ADMIN");
        } else if (roles.includes("ROLE_TEACHER")) {
          setUserRole("ROLE_TEACHER");
        } else {
          setUserRole(null); // Default if no role found
        }
      } catch (error) {
        console.error("Error decoding token", error);
      }
    } else {
      setIsLoggedIn(false);
      setUserRole(null); // Clear role if no token is found
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(null); // Clear role state
    navigate("/login");
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    checkLoginStatus();
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
      className="fixed top-0 left-0 w-full z-40 bg-gradient-to-r from-white/70 to-blue-50 backdrop-blur-md border-b border-gray-200 shadow-lg rounded-b-2xl"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center bg-black p-2 rounded-full"> {/* Dark background added here */}
          <Link to="/" className="flex items-center">
            <motion.img
              src={require("./../../Images/logo.png")}
              alt="Logo"
              className="h-12 w-auto rounded-full"
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </div>

        <div className="hidden lg:flex space-x-6">
          {[
            { to: "/home", label: "Home" },
            { to: "/s2oAcademy", label: "S2O Academy" },
            { to: "/eventCalender", label: "Event Calendar" },
            { to: "/register", label: "Registration" },
            { to: "/article", label: "Article" },
            // Conditionally render Admin and Teacher based on user role
            userRole === "ROLE_ADMIN" && { to: "/admin", label: "Admin" },
            userRole === "ROLE_TEACHER" && { to: "/teacher", label: "Teacher" },
            { to: "/chat", label: "Chat" },
          ]
            .filter(Boolean) // Filter out undefined values (Admin, Teacher)
            .map((link) => 
              link && (
                <motion.div
                  key={link.to}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-md"
                >
                  <Link
                    to={link.to}
                    className={`no-underline text-sm font-medium px-6 py-3 rounded-lg transition-all block ${
                      location.pathname === link.to
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-700 hover:text-blue-600 hover:shadow-md"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            )}
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          {isLoggedIn && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <Link
                to="/profile"
                className="flex items-center px-6 py-3 border rounded-lg shadow-md transition-all block text-gray-800 border-gray-300 hover:bg-blue-600 hover:text-white"
              >
                <i className="fas fa-user mr-2"></i> Profile
              </Link>
            </motion.div>
          )}
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {isLoggedIn ? (
              <button
                onClick={handleSignOut}
                className="px-6 py-3 rounded-lg font-medium bg-gray-100 text-gray-800 hover:bg-blue-600 hover:text-white"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="px-6 py-3 rounded-lg font-medium bg-gray-100 text-gray-800 hover:bg-blue-600 hover:text-white"
              >
                Sign In
              </Link>
            )}
          </motion.div>
        </div>

        <motion.button
          onClick={toggleMobileMenu}
          className="lg:hidden text-gray-800 text-2xl focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle Mobile Menu"
        >
          <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : -50 }}
        transition={{ duration: 0.4 }}
        className={`lg:hidden ${isMobileMenuOpen ? "h-auto" : "h-0"} overflow-hidden bg-gradient-to-r from-white/70 to-blue-100 backdrop-blur-md rounded-b-2xl shadow-md`}
      >
        <div className="flex flex-col px-6 py-4 space-y-3">
          {[
            { to: "/home", label: "Home" },
            { to: "/s2oAcademy", label: "S2O Academy" },
            { to: "/eventCalender", label: "Event Calendar" },
            { to: "/register", label: "Registration" },
            { to: "/article", label: "Article" },
            userRole === "ROLE_ADMIN" && { to: "/admin", label: "Admin" },
            userRole === "ROLE_TEACHER" && { to: "/teacher", label: "Teacher" },
            { to: "/chat", label: "Chat" },
          ]
            .filter(Boolean) // Filter out undefined values (Admin, Teacher)
            .map((link) => 
              link && (
                <motion.div
                  key={link.to}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.to}
                    className={`no-underline text-base font-medium px-6 py-4 rounded-lg transition-all block ${
                      location.pathname === link.to
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-700 hover:text-blue-600 hover:shadow-md"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            )}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;