import React from 'react';
import './TimePicker.css';

function TimePicker({ label, value, onChange }) {
  return (
    <div className="time-picker">
      <label className="time-picker-label">{label}</label>
      <input
        type="time"
        className="time-picker-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        step="300" // Steps of 5 minutes
      />
    </div>
  );
}

export default TimePicker;
