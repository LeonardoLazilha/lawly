import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">Lawly</div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="hamburger"></span>
        </button>
        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="/">Converter PDF</a></li>
            <li><a href="/">em breve</a></li>
            <li><a href="/">em breve</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 