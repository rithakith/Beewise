import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import GraphCard from '../../Components/GraphCard/GraphCard';
import Navbar from '../../Components/Navbar/Navbar'; 
import './AirQualityPage.css';


const AirQualityPage = () => {
  const [airQualityData, setAirQualityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'airQualityData'));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setAirQualityData(data);
      } catch (error) {
        console.error('Error fetching air quality data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="content">
    <div className='box-analysis-container'>
    <h2>Air Quality Page</h2>
      <GraphCard title="CO₂ Level (ppm)" data={airQualityData} />
    
    </div>
    </div>
    
    </>
   
  );
};

export default AirQualityPage;
