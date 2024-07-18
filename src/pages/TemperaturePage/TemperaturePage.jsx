import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import GraphCard from '../../Components/GraphCard/GraphCard';
import Navbar from '../../Components/Navbar/Navbar'; 
import './TemperaturePage.css';


const TemperaturePage = () => {
  const [temperatureData, setTemperatureData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'temperatureData'));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setTemperatureData(data);
      } catch (error) {
        console.error('Error fetching temperature data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="content">
    <div className='box-analysis-container'>

      <h2>Temperature Page</h2>
      <GraphCard title="Temperature (°C)" data={temperatureData} />
    </div>
    </div>
    </>
  
  );
};

export default TemperaturePage;
