import React from 'react';
import InfoBox from '../InfoBox/InfoBox';
import './Box.css';

const Box = ({ box }) => {
  return (
    <div className="box">
      <div className="info-boxes-container">
        <InfoBox  title="Temperature" value={box.temperature} unit="°C" min={box.minTemperature} max={box.maxTemperature} />
        <InfoBox title="Humidity" value={box.humidity} unit="%" min={box.minHumidity} max={box.maxHumidity} />
        <InfoBox title="Air Quality Level" value={box.co2Level} unit="ppm" min={box.minCo2Level} max={box.maxCo2Level} />
        <InfoBox title="Weight" value={box.weight} unit="g" min={box.minWeight} max={box.maxWeight} />
      </div>
  
    </div>
  );
};

export default Box;
