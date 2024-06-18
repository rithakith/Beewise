// src/Components/GeneralInfoCard/GeneralInfoCard.jsx
import React, { useState } from "react";
import "./GeneralInfoCard.css";

const GeneralInfoCard = () => {
  const [syrupMode, setSyrupMode] = useState(false);

  const handleToggle = () => {
    setSyrupMode(!syrupMode);
  };

  return (
  <div>
<div className="general-info-card">
      <h2>General Information</h2>
      <p>Age of Beehive: 6 months</p>
    </div>
    <div className="general-info-card">
        <button onClick={handleToggle} className={`toggle-button ${syrupMode ? 'on' : 'off'}`}>
        Sugar Syrup Mode: {syrupMode ? "ON" : "OFF"}
      </button>
    </div>
  </div>
    
   
  );
};

export default GeneralInfoCard;
