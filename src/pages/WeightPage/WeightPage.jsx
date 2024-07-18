import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import GraphCard from '../../Components/GraphCard/GraphCard';
import Navbar from '../../Components/Navbar/Navbar'; 
import './WeightPage.css';



const WeightPage = () => {
  const [weightData, setWeightData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'weightData'));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setWeightData(data);
      } catch (error) {
        console.error('Error fetching weight data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="content">
    <div className='box-analysis-container'>
      <h2>Weight Page</h2>
      <GraphCard title="Weight (kg)" data={weightData} />
    </div>
    </div>
    </>
    
  );
};

export default WeightPage;
