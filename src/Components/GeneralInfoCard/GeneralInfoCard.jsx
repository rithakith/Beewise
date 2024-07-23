import React, { useState, useEffect } from "react";
import { getDatabase, ref, set } from "firebase/database";
import "./GeneralInfoCard.css";

const GeneralInfoCard = ({age}) => {
  const [syrup, setSyrup] = useState(2);
  const [startDate, setStartDate] = useState(null);
  const [ageOfBeehive, setAgeOfBeehive] = useState(age);

  useEffect(() => {
    const getStartDate = async () => {
      try {
        const now = new Date();
        const startDate = new Date(now.setDate(now.getDate() - age));
        setStartDate(startDate);
        setAgeOfBeehive(age);
      } catch (error) {
        console.error('Error fetching start date:', error);
      }
    };

    getStartDate();
  }, [ageOfBeehive]);

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
          <h2>General Information</h2>
          <p>Age of Beehive: {ageOfBeehive !== null ? `${ageOfBeehive} days` : 'Loading...'}</p>
          <p>Start Date: {startDate ? startDate.toLocaleDateString() : 'Invalid Date'}</p>
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
