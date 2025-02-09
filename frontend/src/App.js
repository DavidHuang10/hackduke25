import React from 'react';
import './App.css';
import Header from './components/Header';
import SectionHeader from './components/SectionHeader';
import Dashboard from './sections/Dashboard';
import EclipseList from './sections/EclipseList';
import HeatBarContainer from './sections/HeatBarContainer';
import Insights from './sections/Insights';
import SetLimitSection from './sections/SetLimitSection';

function App() {
  const mockInsights = [
    "Your most productive time is between 9 AM and 11 AM. Consider scheduling focus sessions during this period.",
    "You spent 2 hours on distracting websites yesterday, mostly on YouTube and Reddit.",
    "You’ve been active past midnight for three days in a row. Adjust your screen time for better sleep.",
    "Distractions peak for you between 3 PM and 5 PM. Try adding a focus session during this period.",
    "Great progress! You completed 8 focus sessions this week, reducing distractions by 40%."
  ];
  
  return (
    <div className="App">
      <Header />
      
      <SectionHeader>Dashboard</SectionHeader>
      <Dashboard />

      <SectionHeader>Eclipses</SectionHeader>
      {/* EclipseList now simulates an API call to get Eclipse data */}
      <EclipseList />

      <SectionHeader>Daily Usage</SectionHeader>
      <HeatBarContainer />

      <SectionHeader>Insights</SectionHeader>
      <Insights insights={mockInsights} />

      <SectionHeader>Set Limits</SectionHeader>
      <SetLimitSection />

      <p style={{ padding: '20px', color: 'white' }}>
        Scroll down to explore each section. Add more content as needed.
      </p>
      <div style={{ height: '1000px' }}></div>
    </div>
  );
}

export default App;
