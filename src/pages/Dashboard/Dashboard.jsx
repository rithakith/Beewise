import React, { useEffect, useState } from "react";
import Box from "../../Components/Box/Box";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import Navbar from "../../Components/Navbar/Navbar";
import './Dashboard.css';

const Dashboard = () => {
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "boxes"));
        const boxData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBoxes(boxData);
      } catch (error) {
        console.error("Error fetching boxes: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      {boxes.map((box) => (
        <Box key={box.id} box={box} />
      ))}
    </>
  );
};

export default Dashboard;
