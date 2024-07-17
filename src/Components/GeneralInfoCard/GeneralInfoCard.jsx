import React, { useState, useEffect } from "react";
import { getDatabase, ref, set } from "firebase/database";
import "./GeneralInfoCard.css";

const GeneralInfoCard = ({ startDate }) => {
  const [syrupMode, setSyrupMode] = useState(false);

  useEffect(() => {
    let timer;
    if (syrupMode) {
      // Set a timer to turn off the syrupMode after 5 seconds
      timer = setTimeout(() => {
        setSyrupMode(false);
        updateSyrupModeInDatabase(false); // Update database when syrupMode is turned off
      }, 5000);
    }

    // Cleanup the timer if the component unmounts or syrupMode changes
    return () => {
      clearTimeout(timer);
    };
  }, [syrupMode]);

  const handleToggle = () => {
    const newSyrupMode = !syrupMode;
    setSyrupMode(newSyrupMode);
    updateSyrupModeInDatabase(newSyrupMode); // Update database when button is toggled
  };

  const updateSyrupModeInDatabase = (mode) => {
    const db = getDatabase();
    set(ref(db, 'syrupMode'), mode)
      .then(() => {
        console.log("Syrup mode updated successfully in the database.");
      })
      .catch((error) => {
        console.error("Error updating syrup mode in the database: ", error);
      });
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
