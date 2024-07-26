import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Navbar.css';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
            }
            setLastScrollY(window.scrollY);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);

    return (
        <nav className={`d-flex navbar navbar-expand-lg navbar-dark main-color py-3 ${showNavbar ? 'navbar-show' : 'navbar-hide'}`}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={require("./../../Images/logo.png")} alt="Logo" width='175' height='175' />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle Navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to='/home'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/s2oAcademy'>S2O ACADEMY</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/Register'>Online Registration</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/article'>Article</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/admin'>Admin</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Teacher</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link"  to='/chat'>Chat With Admin</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                    <li className="nav-item m-1">
                            <Link type="button" className="btn btn-outline-light" to='/profile'>
                                <i className="fas fa-user"></i> 
                            </Link>
                        </li>
                        <li className="nav-item m-1">
                            <Link type="button" className="btn btn-outline-light" to='login'>
                                Sign in
                            </Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
};

// Add CSS styles for additional styling and hover effects
const styles = {
    '.navbar-nav .nav-link': {
        transition: 'color 0.3s',
    },
    '.navbar-nav .nav-link:hover': {
        color: '#ffdd57', // Change to your desired hover color
    },
    '.navbar-brand img': {
        maxHeight: '50px', // Adjust to fit your navbar
        maxWidth: 'auto',
    },
    '.btn-outline-light': {
        transition: 'background-color 0.3s, color 0.3s',
    },
    '.btn-outline-light:hover': {
        backgroundColor: '#ffdd57',
        color: '#000',
    },
    '.btn-outline-light i': {
        marginRight: '5px', // Add some spacing between the icon and text
    }
};

export default Navbar;
