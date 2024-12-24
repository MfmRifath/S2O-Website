import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import{ jwtDecode }from "jwt-decode";

const Navbar: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
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
        const decodedToken: any = jwtDecode(token);
        const roles = decodedToken.roles || [];
        if (roles.includes("ROLE_ADMIN")) {
          setUserRole("ROLE_ADMIN");
        } else if (roles.includes("ROLE_TEACHER")) {
          setUserRole("ROLE_TEACHER");
        }
        else if (roles.includes("ROLE_USER")) {
          setUserRole("ROLE_USER");
        }
         else {
          setUserRole(null);
        }
      } catch (error) {
        console.error("Error decoding token", error);
      }
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/login");
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    checkLoginStatus();
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 backdrop-blur-md shadow-lg rounded-b-3xl"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div>
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              className="bg-blue p-3 rounded-full shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <motion.img
                src={require("./../../Images/logo.png")}
                alt="Logo"
                className="h-15 w-20 rounded-full"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6 items-center">
          {[
            { to: "/home", label: "Home" },
            (userRole === "ROLE_USER" ||userRole === "ROLE_ADMIN"||userRole === "ROLE_TEACHER") && { to: "/s2oAcademy", label: "S2O Academy" },
            (userRole === "ROLE_USER" ||userRole === "ROLE_ADMIN"||userRole === "ROLE_TEACHER") && { to: "/eventCalender", label: "Event Calendar" },
            (userRole === "ROLE_USER" ||userRole === "ROLE_ADMIN"||userRole === "ROLE_TEACHER") && { to: "/register", label: "Registration" },
            (userRole === "ROLE_USER" ||userRole === "ROLE_ADMIN"||userRole === "ROLE_TEACHER") &&{ to: "/article", label: "Article" },
            userRole === "ROLE_ADMIN" && { to: "/admin", label: "Admin" },
            userRole === "ROLE_TEACHER" && { to: "/teacher", label: "Teacher" },
            (userRole === "ROLE_USER" ||userRole === "ROLE_ADMIN"||userRole === "ROLE_TEACHER") && { to: "/chat", label: "Chat" },
          ]
            .filter(Boolean)
            .map((link) =>
              link ? (
                <motion.div
                  key={link.to}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-md"
                >
                  <Link
                    to={link.to}
                    className={`text-sm font-medium px-6 py-3 rounded-lg transition ${
                      location.pathname === link.to
                        ? "bg-white text-blue-700 shadow-lg"
                        : "text-white hover:bg-blue-700 hover:shadow-md"
                    } no-underline`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ) : null
            )}
        </div>

        {/* Desktop Profile/Sign Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {isLoggedIn && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <Link
                to="/profile"
                className="px-4 py-2 border rounded-lg shadow-md bg-white text-blue-700 hover:bg-blue-600 hover:text-blue-400 transition no-underline"
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
                className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-800 transition no-underline"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-800 transition no-underline"
              >
                Sign In
              </Link>
            )}
          </motion.div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden text-white text-2xl focus:outline-none"
        >
          <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.4 }}
        className={`lg:hidden overflow-hidden bg-white rounded-b-2xl shadow-md`}
      >
        <div className="flex flex-col px-6 py-4 space-y-3">
          {[
            { to: "/home", label: "Home" },
            (userRole === "ROLE_USER" ||userRole === "ROLE_ADMIN"||userRole === "ROLE_TEACHER") && { to: "/s2oAcademy", label: "S2O Academy" },
            (userRole === "ROLE_USER" ||userRole === "ROLE_ADMIN"||userRole === "ROLE_TEACHER") &&  { to: "/eventCalender", label: "Event Calendar" },
            (userRole === "ROLE_USER" ||userRole === "ROLE_ADMIN"||userRole === "ROLE_TEACHER") && { to: "/register", label: "Registration" },
            (userRole === "ROLE_USER" ||userRole === "ROLE_ADMIN"||userRole === "ROLE_TEACHER") && { to: "/article", label: "Article" },
            userRole === "ROLE_ADMIN" && { to: "/admin", label: "Admin" },
            userRole === "ROLE_TEACHER" && { to: "/teacher", label: "Teacher" },
            (userRole === "ROLE_USER" ||userRole === "ROLE_ADMIN"||userRole === "ROLE_TEACHER") && { to: "/chat", label: "Chat" },
          ]
            .filter(Boolean)
            .map((link) =>
              link ? (
                <motion.div
                  key={link.to}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.to}
                    className={`text-base font-medium px-4 py-2 rounded-lg transition ${
                      location.pathname === link.to
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-blue-500 hover:text-white"
                    } no-underline`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ) : null
            )}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;