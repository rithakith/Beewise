// GeneralInfoCard.jsx
import React from "react";

const GeneralInfoCard = ({ ageOfBeehive }) => {
  return (
    <div className="general-info-card">
      <h3>General Information</h3>
      <p>Age of Beehive: {ageOfBeehive} months</p>
    </div>
  );
};

export default GeneralInfoCard;
