import React from 'react';
import './Block.css';

const Block = ({ title, children, size = 'medium', fullWidth = false, className = '' }) => {
  return (
    <div className={`block ${size} ${fullWidth ? 'full-width' : ''} ${className}`}>
      <h3 className="block-title">{title}</h3>
      <div className="block-content">{children}</div>
    </div>
  );
};

export default Block;
