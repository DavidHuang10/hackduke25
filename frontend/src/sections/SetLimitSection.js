import React, { useState } from 'react';
import './SetLimitSection.css';
import TimePicker from '../components/TimePicker';
import DistractionTimeInput from '../components/DistractionTimeInput';
import DomainListInput from '../components/DomainListInput';
import DayPicker from '../components/DayPicker';

function SetLimitSection() {
  const [limitData, setLimitData] = useState({
<<<<<<< HEAD
    name: '',  // Added for session name
=======
>>>>>>> main
    startTime: '',
    endTime: '',
    allowedDistractionTime: 0,
    domains: [],
    selectedDays: []
  });

  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setLimitData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
<<<<<<< HEAD
    // Validation checks including name
    if (!limitData.name || !limitData.startTime || !limitData.endTime || limitData.domains.length === 0) {
=======
    if (!limitData.startTime || !limitData.endTime || limitData.domains.length === 0) {
>>>>>>> main
      setFeedback({ message: 'Please fill in all fields.', type: 'error' });
      return;
    }

    const startTime = new Date(`01/01/2000 ${limitData.startTime}`);
    const endTime = new Date(`01/01/2000 ${limitData.endTime}`);
<<<<<<< HEAD
=======

>>>>>>> main
    if (startTime >= endTime) {
      setFeedback({ message: 'Start time must be before end time.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFeedback({ message: 'Limit saved successfully!', type: 'success' });
    } catch (error) {
      setFeedback({ message: 'Error saving limit. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="set-limit-section">
<<<<<<< HEAD
      <h2 className="section-title">Schedule Eclipse</h2>
      <div className="form-container">
        <input
          type="text"
          className="input-text"
          placeholder="Eclipse Name"
          value={limitData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
=======
      <h2 className="section-title">Set New Limit</h2>
      <div className="form-container">
>>>>>>> main
        <TimePicker
          label="Start Time"
          value={limitData.startTime}
          onChange={(value) => handleInputChange('startTime', value)}
        />
        <TimePicker
          label="End Time"
          value={limitData.endTime}
          onChange={(value) => handleInputChange('endTime', value)}
        />
        <DistractionTimeInput
          value={limitData.allowedDistractionTime}
          onChange={(value) => handleInputChange('allowedDistractionTime', value)}
        />
        <DomainListInput
          domains={limitData.domains}
          onChange={(domains) => handleInputChange('domains', domains)}
        />
        <DayPicker
          selectedDays={limitData.selectedDays}
          onChange={(days) => handleInputChange('selectedDays', days)}
        />
        <button className="submit-button" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Saving...' : 'Save Limit'}
        </button>
        <div className={`feedback-message ${feedback.type}`}>{feedback.message}</div>
      </div>
    </div>
  );
}

export default SetLimitSection;
