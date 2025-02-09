import React from 'react';
import FocusSession from '../components/FocusSession';
import './EclipseList.css';

function EclipseList({ sessions }) {
  const nowSessions = sessions.filter(session => session.mode === 'current');
  const upcomingSessions = sessions.filter(session => session.mode === 'future');

  return (
    <div className="eclipse-list">
      {/* Now Section */}
      {nowSessions.length > 0 && (
        <div className="focus-section now-section">
          <h3 className="focus-section-title">Now</h3>
          {nowSessions.map(session => (
            <FocusSession
              key={session.id}
              title={session.title}
              schedule={session.schedule}
              mode={session.mode}
              timeRemaining={session.timeRemaining}
            />
          ))}
        </div>
      )}

      {/* Upcoming Section */}
      {upcomingSessions.length > 0 && (
        <div className="focus-section upcoming-section">
          <h3 className="focus-section-title">Upcoming</h3>
          {upcomingSessions.map(session => (
            <FocusSession
              key={session.id}
              title={session.title}
              schedule={session.schedule}
              mode={session.mode}
              timeRemaining={session.timeRemaining}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default EclipseList;
