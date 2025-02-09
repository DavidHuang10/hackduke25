import React from 'react';
import Block from '../components/Block';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      {/* High emphasis block at the top */}
      <div className="centered-block">
        <Block title="4 hr 51m" size="large" className="big-boy-block">
          Screen time today
        </Block>
      </div>

      {/* Row for time blocks: Productive, Neutral, Distracted */}
      <div className="time-row">
        <Block title="3 hr" size="medium" className="time-block">
          Productive time
        </Block>
        <Block title="2 hr" size="medium" className="time-block">
          Neutral time
        </Block>
        <Block title="1 hr" size="medium" className="time-block">
          Distracted time
        </Block>
      </div>

      {/* Row with two blocks below */}
      <div className="block-row">
        {/* Top websites block */}
        <Block title="Top Websites" size="medium">
          <ul className="website-list">
            <li>1. YouTube</li>
            <li>2. Reddit</li>
            <li>3. Google Docs</li>
          </ul>
        </Block>

        {/* Eclipse Score block with larger content */}
        <Block title="Eclipse Score" size="medium">
          <div className="eclipse-score-content">73.5%</div>
        </Block>
      </div>
    </div>
  );
}

export default Dashboard;
