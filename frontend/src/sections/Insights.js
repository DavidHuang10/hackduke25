import React from 'react';
import './Insights.css';

function Insights({ insights }) {
  return (
    <div className="insights-section">
      <h2 className="insights-title">Insights</h2>
      <ul className="insights-list">
        {insights.map((insight, index) => (
          <li key={index} className="insight-item">
            {insight}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Insights;
