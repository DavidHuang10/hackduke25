import React, { useState, useEffect } from 'react';
import Eclipse from '../components/Eclipse';
import './EclipseList.css';

function EclipseList() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const mockData = [
        {
          name: 'Morning Focus',
          startTime: '09:00 AM',
          endTime: '11:00 AM',
          allowedDistractionTime: 0,
          domains: ['youtube.com', 'reddit.com', 'twitter.com', 'instagram.com'],
          selectedDays: ['Mo', 'Tu', 'We', 'Th', 'Fr']
        },
        {
          name: 'Afternoon Study',
          startTime: '12:00 PM',
          endTime: '1:42 PM',
          allowedDistractionTime: 0,
          domains: ['linkedin.com', 'medium.com'],
          selectedDays: ['Mo', 'We', 'Fr','Su']
        },
        {
          name: 'Evening Focus',
          startTime: '07:00 PM',
          endTime: '09:00 PM',
          allowedDistractionTime: 0,
          domains: ['facebook.com'],
          selectedDays: ['Tu', 'Th']
        }
      ];
      setSessions(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const getDayAbbreviation = (date) => {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return days[date.getDay()];
  };

  const timeToMinutes = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const getTimeUntilStart = (session) => {
    const todayAbbr = getDayAbbreviation(currentTime);
    const nowMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    const sessionStart = timeToMinutes(session.startTime);
    
    if (session.selectedDays.includes(todayAbbr) && nowMinutes < sessionStart) {
      return sessionStart - nowMinutes;
    }
    const dayMap = { 'Su': 0, 'Mo': 1, 'Tu': 2, 'We': 3, 'Th': 4, 'Fr': 5, 'Sa': 6 };
    const currentDay = currentTime.getDay();
    const selectedDayNumbers = session.selectedDays.map(day => dayMap[day]).sort((a, b) => a - b);
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
    return daysUntilNext * 24 * 60 + sessionStart - nowMinutes;
  };

  const isCurrentSession = (session) => {
    const todayAbbr = getDayAbbreviation(currentTime);
    if (!session.selectedDays.includes(todayAbbr)) return false;
    const nowMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    const startMinutes = timeToMinutes(session.startTime);
    const endMinutes = timeToMinutes(session.endTime);
    return nowMinutes >= startMinutes && nowMinutes < endMinutes;
  };

  const nowSessions = sessions.filter(session => isCurrentSession(session));
  const upcomingSessions = sessions.filter(session => !isCurrentSession(session));

  return (
    <div className="eclipse-list">
      {loading ? (
        <div className="eclipse-list-loading">Loading sessions...</div>
      ) : (
        <>
          {nowSessions.length > 0 && (
            <div className="focus-section now-section">
              <h3 className="focus-section-title">Now</h3>
              {nowSessions
                .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime))
                .map((session, index) => (
                  <Eclipse key={index} session={session} currentTime={currentTime} />
              ))}
            </div>
          )}
          {upcomingSessions.length > 0 && (
            <div className="focus-section upcoming-section">
              <h3 className="focus-section-title">Upcoming</h3>
              {upcomingSessions
                .sort((a, b) => getTimeUntilStart(a) - getTimeUntilStart(b))
                .map((session, index) => (
                  <Eclipse key={index} session={session} currentTime={currentTime} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default EclipseList;