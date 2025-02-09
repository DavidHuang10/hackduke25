import React from 'react';
import './DayPicker.css';

function DayPicker({ selectedDays, onChange }) {
  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']; // Use full abbreviations

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      onChange(selectedDays.filter(d => d !== day));
    } else {
      onChange([...selectedDays, day]);
    }
  };

  return (
    <div className="day-picker">
      <div className="day-picker-label">Select Days for Recurring Limit (optional)</div>
      {days.map(day => (
        <button
          key={day}
          className={`day-button ${selectedDays.includes(day) ? 'selected' : ''}`}
          onClick={() => toggleDay(day)}
        >
          {day}
        </button>
      ))}
    </div>
  );
}

export default DayPicker;
