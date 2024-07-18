// InfoBox.js
import React from 'react';
import './InfoBox.css';

const InfoBox = ({ title, value, unit }) => {
  return (
    <div className="info-box">
      <h3>{title}</h3>
      <p>{value} {unit}</p>
    </div>
  );
};

export default InfoBox;
