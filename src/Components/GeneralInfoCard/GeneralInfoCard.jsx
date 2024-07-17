import React, { useState, useEffect } from "react";
import "./GeneralInfoCard.css";

const GeneralInfoCard = () => {
  const [syrupMode, setSyrupMode] = useState(false);
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
