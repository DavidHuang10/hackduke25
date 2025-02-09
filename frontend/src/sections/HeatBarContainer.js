import React, { useState, useEffect } from 'react';
import HeatBar from '../components/HeatBar';

function HeatBarContainer() {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  // Updated mock data with start and end times and names.
  const mockData = {
    day: [
      { type: 'productive', start: '08:00', end: '11:00', name: 'Google Docs' },
      { type: 'neutral', start: '12:00', end: '13:00', name: 'Wikipedia' }
    ],
    night: [
      { type: 'distracting', start: '21:00', end: '23:00', name: 'YouTube' }
    ],
    focusSessions: [
      { type: 'focus', start: '10:00', end: '10:30', name: 'Focus Session' }
    ]
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <HeatBar
      dayData={mockData.day}
      nightData={mockData.night}
      focusSessions={mockData.focusSessions}
      currentTime={currentTime}
    />
  );
}

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export default HeatBarContainer;
