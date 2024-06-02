import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './index.css';  // Import your CSS file for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">Trendz</Link>
                <div className="navbar-links">
                    <Link to="/" className="navbar-link">Home</Link>
                    <Link to="/products" className="navbar-link">Products</Link>
                    <Link to="/about" className="navbar-link">About</Link>
                </div>
                <div className="navbar-cart">
                    <Link to="/cart" className="cart-icon">
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </Link>
                    {/* You can add a badge for cart items count if needed */}
                    <span className="cart-badge">0</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
