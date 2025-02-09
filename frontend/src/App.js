import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SectionHeader from './components/SectionHeader';
import Dashboard from './sections/Dashboard';
import { applyScrollEffect } from './scripts/scrollEffect';

function App() {
  useEffect(() => {
    const removeScrollEffect = applyScrollEffect();

    return removeScrollEffect;
  }, []);

  return (
    <div className="App">
      <Header />

      <SectionHeader>Dashboard</SectionHeader>
      <Dashboard />
      <SectionHeader>Focus Sessions</SectionHeader>
      <SectionHeader>Daily Usage</SectionHeader>
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
