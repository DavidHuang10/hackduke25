import React from 'react';
import './FocusSession.css';
import { FaSun, FaMoon } from 'react-icons/fa';

const FocusSession = ({ title, schedule, mode, timeRemaining }) => {
  const isCurrent = mode === 'current';
  const statusIcon = isCurrent ? <FaSun /> : <FaMoon />;
  const statusText = isCurrent ? `Active for ${timeRemaining}` : `Starting in ${timeRemaining}`;

  return (
    <div className={`focus-session ${isCurrent ? 'current' : 'future'}`}>
      <h3 className="focus-session-title">{title}</h3>
      <p className="focus-session-schedule">{schedule}</p>
      <div className={`focus-session-status ${isCurrent ? 'current' : 'future'}`}>
        {statusIcon}
        <span className="status-text">{statusText}</span>
      </div>
    </div>
  );
};

export default FocusSession;
