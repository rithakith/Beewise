// Box.js
import React from 'react';
import InfoBox from '../InfoBox/InfoBox';
import './Box.css';

const Box = ({ box, index }) => {
  return (
    <div className="box">
     
      <div className="info-boxes-container">
        <InfoBox title="Temperature" value={box.temperature} unit="°C" />
        <InfoBox title="Humidity" value={box.humidity} unit="%" />
        <InfoBox title="CO₂ Level" value={box.co2Level} unit="ppm" />
      </div>
    
    </div>
  );
};

export default Box;
