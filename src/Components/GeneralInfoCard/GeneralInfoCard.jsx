import React, { useState } from "react";
import "./GeneralInfoCard.css";

const GeneralInfoCard = () => {
  const [syrupMode, setSyrupMode] = useState(false);

  const handleToggle = () => {
    setSyrupMode(!syrupMode);
  };

  return (
    <div className="general-info-container">
      <div className="general-info-card">
        <div className="general-info-card-01">
          <h2>General Information</h2>
          <p>Age of Beehive: 6 months</p>
        </div>
        <div className="general-info-card-02">
          <h2>Sugar Syrup Activation Mode:</h2>
          <button
            onClick={handleToggle}
            className={`toggle-button ${syrupMode ? 'on' : 'off'}`}
          >
            {syrupMode ? "ON" : "OFF"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoCard;
