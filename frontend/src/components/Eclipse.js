import React from 'react';
import './Eclipse.css';
import { FaSun, FaMoon } from 'react-icons/fa';

const Eclipse = ({ session, mode, currentTime }) => {
  const { name, startTime, endTime, selectedDays, domains } = session;
  
  // Use currentTime prop instead of local Date
  const getDayAbbreviation = (date) => {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return days[date.getDay()];
  };

  const currentDayAbbrev = getDayAbbreviation(currentTime);
  const nowMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  const timeToMinutes = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  const isCurrent = selectedDays.includes(currentDayAbbrev) && 
                    nowMinutes >= startMinutes && 
                    nowMinutes < endMinutes;

  const getTimeRemaining = () => {
    if (isCurrent) {
      const diff = endMinutes - nowMinutes;
      const hrs = Math.floor(diff / 60);
      const mins = diff % 60;
      return `${hrs > 0 ? hrs + ' hr ' : ''}${mins} mins remaining`;
    } else {
      const diff = getTimeUntilStart();
      const hrs = Math.floor(diff / 60);
      const mins = diff % 60;
      return `${hrs > 0 ? hrs + ' hr ' : ''}${mins} mins until start`;
    }
  };

  const getTimeUntilStart = () => {
    if (selectedDays.includes(getDayAbbreviation(currentTime)) && nowMinutes < startMinutes) {
      return startMinutes - nowMinutes;
    }
    const dayMap = { 'Su': 0, 'Mo': 1, 'Tu': 2, 'We': 3, 'Th': 4, 'Fr': 5, 'Sa': 6 };
    const currentDay = currentTime.getDay();
    const selectedDayNumbers = selectedDays.map(day => dayMap[day]).sort((a, b) => a - b);
    let daysUntilNext = null;
    for (let d of selectedDayNumbers) {
      if (d > currentDay) {
        daysUntilNext = d - currentDay;
        break;
      }
    }
    if (daysUntilNext === null) {
      daysUntilNext = (7 - currentDay) + selectedDayNumbers[0];
    }
    return daysUntilNext * 24 * 60 + startMinutes - nowMinutes;
  };

  const timeRemaining = getTimeRemaining();
  const statusIcon = isCurrent ? <FaSun /> : <FaMoon />;
  const domainDisplay = domains.length > 3 ? `${domains.slice(0, 3).join(', ')}...` : domains.join(', ');

  return (
    <div className={`eclipse ${isCurrent ? 'current' : 'future'}`}>
      <h3 className="eclipse-title">{name}</h3>
      <p className="eclipse-schedule">{`${startTime} - ${endTime}`}</p>
      <p className="eclipse-blocked">
        <strong>Blocking:</strong> {domainDisplay}
      </p>
      {selectedDays && selectedDays.length > 0 && (
        <p className="eclipse-days"><strong>Recurring on:</strong> {selectedDays.join(', ')}</p>
      )}
      <div className={`eclipse-status ${isCurrent ? 'current' : 'future'}`}>
        {statusIcon}
        <span className="status-text">{isCurrent ? `Active, ${timeRemaining}` : `Upcoming, ${timeRemaining}`}</span>
      </div>
    </div>
  );
};

export default Eclipse;