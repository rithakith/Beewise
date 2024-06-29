import React, { useState, useEffect } from "react";
import "./GeneralInfoCard.css";

const GeneralInfoCard = ({ startDate }) => {
  const [syrupMode, setSyrupMode] = useState(false);

  useEffect(() => {
    let timer;
    if (syrupMode) {
      // Set a timer to turn off the syrupMode after 5 seconds
      timer = setTimeout(() => {
        setSyrupMode(false);
      }, 5000);
    }

    // Cleanup the timer if the component unmounts or syrupMode changes
    return () => {
      clearTimeout(timer);
    };
  }, [syrupMode]);

  const handleToggle = () => {
    setSyrupMode(prevState => !prevState);
  };

  return (
    <div className="general-info-container">
      <div className="general-info-card">
        <div className="general-info-card-01">
          <h2>General Information</h2>
          <p>Age of Beehive: 6 months</p>
          <p>Start Date: {startDate ? new Date(startDate).toLocaleDateString() : 'Invalid Date'}</p>
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
