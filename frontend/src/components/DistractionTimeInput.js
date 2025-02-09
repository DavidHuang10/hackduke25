import React from 'react';
import './DistractionTimeInput.css';

function DistractionTimeInput({ value, onChange }) {
  return (
    <div className="distraction-time-input">
      <label className="input-label">Allowed Distraction Time (minutes)</label>
      <input
        type="number"
        min="0"
        className="time-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default DistractionTimeInput;
