import React, { useState, useEffect } from "react";
import { getDatabase, ref, set } from "firebase/database";
import "./GeneralInfoCard.css";

const GeneralInfoCard = () => {
  const [syrup, setSyrup] = useState(2);
  const [startDate, setStartDate] = useState(null);
  const [ageOfBeehive, setAgeOfBeehive] = useState(null);

  useEffect(() => {
    const getStartDate = async () => {
      try {
        const response = await fetch('/api/start-date');
        const data = await response.json();
        const startDate = new Date(data.startDate);
        setStartDate(startDate);
        const age = calculateBeehiveAge(startDate);
        setAgeOfBeehive(age);
      } catch (error) {
        console.error('Error fetching start date:', error);
      }
    };

    getStartDate();
  }, []);

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

  const calculateBeehiveAge = (startDate) => {
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44)); // Average days in a month
    return diffMonths;
  };

  return (
    <div className="general-info-container">
      <div className="general-info-card">
        <div className="general-info-card-01">
          <h2>General Information</h2>
          <p>Age of Beehive: {ageOfBeehive !== null ? `${ageOfBeehive} months` : 'Loading...'}</p>
          <p>Start Date: {startDate ? startDate.toLocaleDateString() : 'Invalid Date'}</p>
        </div>
        <div className="general-info-card-02">
          <h2>Sugar Syrup Activation Mode:</h2>
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
