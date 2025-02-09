import React, { useState } from 'react';
import './DomainListInput.css';

function DomainListInput({ domains, onChange }) {
  const [newDomain, setNewDomain] = useState('');

  const handleAddDomain = () => {
    if (newDomain && !domains.includes(newDomain)) {
      onChange([...domains, newDomain]);
      setNewDomain('');
    }
  };

  const handleRemoveDomain = (domain) => {
    onChange(domains.filter(d => d !== domain));
  };

  return (
    <div className="domain-list-input">
      <label className="input-label">Blocked Domains</label>
      <div className="domain-input-container">
        <input
          type="text"
          className="domain-input"
          value={newDomain}
          onChange={(e) => setNewDomain(e.target.value)}
          placeholder="Enter domain (e.g., youtube.com)"
        />
        <button className="add-domain-button" onClick={handleAddDomain}>Add</button>
      </div>
      <ul className="domain-list">
        {domains.map((domain, index) => (
          <li key={index} className="domain-item">
            {domain}
            <button className="remove-domain-button" onClick={() => handleRemoveDomain(domain)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DomainListInput;
