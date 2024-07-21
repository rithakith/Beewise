// Box.js
import React from 'react';
import InfoBox from '../InfoBox/InfoBox';
import './Box.css';

const Box = ({ box, index }) => {
  console.log("this is box info", box);
  return (
    <div className="box">
     
      <div className="info-boxes-container">
        <InfoBox title="Temperature" value={box.temperature} unit="°C" />
        <InfoBox title="Humidity" value={box.humidity} unit="%" />
        <InfoBox title="Air Quality level (ppm)" value={box.co2Level} unit="ppm" />
        <InfoBox title="Weight" value={box.weight} unit="g" />

      </div>
    
    </div>
  );
};

export default Box;
