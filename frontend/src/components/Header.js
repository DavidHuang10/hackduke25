// In Header.js
import React from 'react';
import './Header.css'; // Header-specific styles
import Button from './Button'; // Import the Button component
import eclipseLogo from '../assets/eclipse.png';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Header = () => {
  return (
    <div className="header">
      <div className="header-logo">
        <img src={eclipseLogo} alt="Eclipse Logo" style={{ height: '50px' }} />
      </div>
      <div className="header-actions">
        <Button className="notifications-button">
          <i className="fas fa-bell"></i> {/* Using Font Awesome icons for example */}
        </Button>
        <Button className="profile-button">
          <i className="fas fa-user"></i> {/* Placeholder for profile picture */}
        </Button>
      </div>
    </div>
  );
};

export default Header;
