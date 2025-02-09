import React, { useState } from 'react';
import './HeatBar.css';

function HeatBar({ dayData = [], nightData = [], focusSessions = [], currentTime }) {
  // State for the tooltip popup (text and absolute x,y coordinates)
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });

  // Convert a "HH:MM" string to minutes from midnight
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Compute the block's start position (percentage) and width (percentage)
  const computeBlockPosition = (block, barStart, barEnd) => {
    const blockStart = timeToMinutes(block.start);
    const blockEnd = timeToMinutes(block.end);
    let adjustedStart = blockStart;
    let adjustedEnd = blockEnd;
    if (barStart > barEnd) {
      // For a bar that crosses midnight (night bar)
      if (blockStart < barEnd) adjustedStart += 1440;
      if (blockEnd <= barEnd) adjustedEnd += 1440;
    }
    const totalRange = barEnd > barStart ? barEnd - barStart : barEnd + 1440 - barStart;
    const startPercentage = ((adjustedStart - barStart) / totalRange) * 100;
    const widthPercentage = ((adjustedEnd - adjustedStart) / totalRange) * 100;
    return { startPercentage, widthPercentage };
  };

  // Process an array of blocks for a given bar (day or night)
  const processBlocks = (blocks, barStart, barEnd) => {
    return blocks.map(block => {
      const pos = computeBlockPosition(block, barStart, barEnd);
      return { ...block, ...pos };
    });
  };

  // Define day: 7:00 (420 min) to 19:00 (1140 min); night: 19:00 (1140) to 7:00 (420 next day)
  const processedDayData = processBlocks(dayData, 420, 1140);
  const processedNightData = processBlocks(nightData, 1140, 420);
  const processedFocusSessionsDay = processBlocks(focusSessions, 420, 1140);
  const processedFocusSessionsNight = processBlocks(focusSessions, 1140, 420);

  // Determine if currentTime is in the day period
  const isDayTime = (time) => {
    const minutes = timeToMinutes(time);
    return minutes >= 420 && minutes < 1140;
  };

  // Get current time position for a given bar range (in percentage)
  const getCurrentPosition = (time, barStart, barEnd) => {
    let currentMinutes = timeToMinutes(time);
    if (barStart > barEnd && currentMinutes < 420) currentMinutes += 1440;
    const totalRange = barEnd > barStart ? barEnd - barStart : barEnd + 1440 - barStart;
    return ((currentMinutes - barStart) / totalRange) * 100;
  };

  // Generate an hourly scale for a bar, with markers at every hour
  const generateScale = (barStart, barEnd) => {
    const scale = [];
    if (barStart < barEnd) {
      for (let t = barStart; t <= barEnd; t += 60) {
        scale.push({ time: t, percentage: ((t - barStart) / (barEnd - barStart)) * 100 });
      }
    } else {
      // For the night bar: from barStart to 1440, then 0 to barEnd
      for (let t = barStart; t < 1440; t += 60) {
        scale.push({ time: t, percentage: ((t - barStart) / (1440 - barStart + barEnd)) * 100 });
      }
      for (let t = 0; t <= barEnd; t += 60) {
        scale.push({ time: t, percentage: ((t + 1440 - barStart) / (1440 - barStart + barEnd)) * 100 });
      }
    }
    return scale;
  };

  const dayScale = generateScale(420, 1140);
  const nightScale = generateScale(1140, 420);

  // When hovering over a block, show its name in a popup positioned above the block
  const handleMouseEnter = (e, name) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      text: name,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, text: '', x: 0, y: 0 });
  };

  return (
    <div className="heatbar-container">
      {tooltip.visible && (
        <div className="heatbar-popup" style={{ top: tooltip.y, left: tooltip.x }}>
          <strong>{tooltip.text}</strong>
        </div>
      )}

      {/* Day Bar */}
      <div className="heatbar-row">
        <h4 className="heatbar-title">Day</h4>
        <div className="heatbar-wrapper">
          <div className="heatbar scale-day">
            {/* Render usage blocks */}
            {processedDayData.map((block, index) => (
              <div
                key={index}
                className={`heatbar-block ${block.type}`}
                style={{ left: `${block.startPercentage}%`, width: `${block.widthPercentage}%` }}
                onMouseEnter={(e) => handleMouseEnter(e, block.name)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
            {/* Render focus sessions as dashed blue-bordered boxes */}
            {processedFocusSessionsDay.map((block, index) => (
              <div
                key={`focus-${index}`}
                className="heatbar-block focus"
                style={{ left: `${block.startPercentage}%`, width: `${block.widthPercentage}%` }}
                onMouseEnter={(e) => handleMouseEnter(e, block.name)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
            {/* Current time indicator for day */}
            {isDayTime(currentTime) && (
              <div className="heatbar-current-time">
                <div
                  className="current-time-line"
                  style={{ left: `${getCurrentPosition(currentTime, 420, 1140)}%` }}
                />
                <div
                  className="current-time-label"
                  style={{ left: `${getCurrentPosition(currentTime, 420, 1140)}%` }}
                >
                  Current Time
                </div>
              </div>
            )}
          </div>
          {/* Time scale below the day heatbar */}
          <div className="heatbar-scale">
            {dayScale.map((mark, index) => (
              <div key={index} className="heatbar-scale-mark" style={{ left: `${mark.percentage}%` }}>
                {Math.floor(mark.time / 60)}:00
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Night Bar */}
      <div className="heatbar-row">
        <h4 className="heatbar-title">Night</h4>
        <div className="heatbar-wrapper">
          <div className="heatbar scale-night">
            {processedNightData.map((block, index) => (
              <div
                key={index}
                className={`heatbar-block ${block.type}`}
                style={{ left: `${block.startPercentage}%`, width: `${block.widthPercentage}%` }}
                onMouseEnter={(e) => handleMouseEnter(e, block.name)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
            {processedFocusSessionsNight.map((block, index) => (
              <div
                key={`focus-night-${index}`}
                className="heatbar-block focus"
                style={{ left: `${block.startPercentage}%`, width: `${block.widthPercentage}%` }}
                onMouseEnter={(e) => handleMouseEnter(e, block.name)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
            {/* Current time indicator for night */}
            {!isDayTime(currentTime) && (
              <div className="heatbar-current-time">
                <div
                  className="current-time-line"
                  style={{ left: `${getCurrentPosition(currentTime, 1140, 420)}%` }}
                />
                <div
                  className="current-time-label"
                  style={{ left: `${getCurrentPosition(currentTime, 1140, 420)}%` }}
                >
                  Current Time
                </div>
              </div>
            )}
          </div>
          {/* Time scale below the night heatbar */}
          <div className="heatbar-scale">
            {nightScale.map((mark, index) => (
              <div key={index} className="heatbar-scale-mark" style={{ left: `${mark.percentage}%` }}>
                {mark.time >= 1440 ? Math.floor((mark.time - 1440) / 60) : Math.floor(mark.time / 60)}:00
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeatBar;
