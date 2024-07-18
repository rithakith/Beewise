import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BoxCollection from "./pages/BoxCollection/BoxCollection";
import Dashboard from "./pages/Dashboard/Dashboard";
import Signup from "./pages/Signup/Signup";
import LoginPage from "./pages/LoginPage/LoginPage";
import HumidityPage from "./pages/HumidityPage/HumidityPage"; 
import WeightPage from "./pages/WeightPage/WeightPage"; 
import TemperaturePage from "./pages/TemperaturePage/TemperaturePage"; 
import AirQualityPage from "./pages/AirQualityPage/AirQualityPage"
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/boxes" element={<BoxCollection />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/humidity" element={<HumidityPage />} />
        <Route path="/weight" element={<WeightPage />} />
        <Route path="/temperature" element={<TemperaturePage />} />
        <Route path="/airquality" element={<AirQualityPage />} />
         {/* Route for HumidityPage */}
      </Routes>
    </Router>
  );
}

export default App;
