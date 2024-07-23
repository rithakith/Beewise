import React, { useState, useEffect } from "react";
import { getDatabase, ref, set } from "firebase/database";
import "./GeneralInfoCard.css";

const GeneralInfoCard = ({ age }) => {
  const [syrup, setSyrup] = useState(2);
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    // Calculate the start date by subtracting the age (in days) from the current date
    const now = new Date();
    const calculatedStartDate = new Date(now);
    calculatedStartDate.setDate(now.getDate() - age);
    setStartDate(calculatedStartDate);
  }, [age]);

  const handleToggle = () => {
    const newSyrup = syrup === 2 ? 1 : 2;
    setSyrup(newSyrup);
    updateSyrupInDatabase(newSyrup); // Update database when button is toggled
  };

  const updateSyrupInDatabase = (mode) => {
    const db = getDatabase();
    set(ref(db, 'syrup'), mode)
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
          <h2 className="general-name">General Information</h2>
          <p className="para1">Age of Beehive : <span>{age !== null ? `${age}` : 'Loading...'} days </span></p>
          <p className="para2">Start Date : <span>{startDate ? startDate.toLocaleDateString() : 'Invalid Date'}</span></p>
        </div>
        <div className="general-info-card-02">
          <h2 className="sugar-name">Sugar Syrup Activation Mode:</h2>
          <button
            onClick={handleToggle}
            className={`toggle-button ${syrup === 1 ? 'on' : 'off'}`}
          >
            {syrup === 1 ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoCard;
