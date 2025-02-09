import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SectionHeader from './components/SectionHeader';
import Dashboard from './sections/Dashboard';
import EclipseList from './sections/EclipseList';
import HeatBarContainer from './sections/HeatBarContainer';
function App() {
  
  const hardcodedSessions = [
    {
      id: 1,
      title: 'Morning Focus',
      schedule: 'Every day, 10-12 am',
      mode: 'current',
      timeRemaining: '1 hr 30 min',
    },
    {
      id: 2,
      title: 'Afternoon Study',
      schedule: 'Every day, 2-4 pm',
      mode: 'future',
      timeRemaining: '3 hr 15 min',
    },
    {
      id: 3,
      title: 'Evening Focus',
      schedule: 'Every day, 7-9 pm',
      mode: 'future',
      timeRemaining: '6 hr',
    },
  ];

  return (
    <div className="App">
      <Header />

      <SectionHeader>Dashboard</SectionHeader>
      <Dashboard />

      <SectionHeader>Eclipses</SectionHeader>
      <EclipseList sessions={hardcodedSessions} />

      <SectionHeader>Daily Usage</SectionHeader>
      <HeatBarContainer />
      <SectionHeader>Insights</SectionHeader>
      <SectionHeader>Set Limits</SectionHeader>

      {/* Add content below to fill sections */}
      <p style={{ padding: '20px', color: 'white' }}>
        Scroll down to explore each section. Add more content as needed.
      </p>
      <div style={{ height: '1000px' }}></div>
    </div>
  );
}

export default App;
