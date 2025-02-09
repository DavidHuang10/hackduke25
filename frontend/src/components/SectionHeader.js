// sectionheader.js
import React from 'react';
import './SectionHeader.css'; // Import the CSS styles

function SectionHeader({ children }) {
  return (
    <div className="section-header">
      <h2 className="section-header-title">{children}</h2>
      <div className="section-header-line-wrapper">
        <div className="section-header-line"></div>
      </div>
    </div>
  );
}

export default SectionHeader;
