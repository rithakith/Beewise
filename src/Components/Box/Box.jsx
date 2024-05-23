import React from "react";
import { Link } from "react-router-dom";

const Box = ({ box }) => {
  return (
    <>
      <label htmlFor="humidity">Humidity: {box.Humidity}</label>
      <br />
      <label htmlFor="temperature">Temperature {box.Temperature}</label>
      <br />
      <label htmlFor="CO2 level">Co2 Level {box.Co2} ppm </label>
      <br />
      <span>
        <Link to={`/dashboard/${box.id}`}>View Box</Link>{" "}
      </span>
    </>
  );
};

export default Box;
