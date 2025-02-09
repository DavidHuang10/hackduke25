// In Button.js
import React from 'react';
import './Button.css'; // Assuming you'll use a separate CSS file for button styles

const Button = ({ onClick, children, className }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
