import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth} from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import './Navbar.css'

const Navbar = () => {
  const [name, setName] = useState("User");
  const [logoutError, setLogoutError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logout Success");
        navigate("/");
      })
      .catch((error) => {
        setLogoutError(error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setName(user.displayName);
      } else {
        console.log("User is logged out");
        setUser(null);
        setName("User");
      }
    });

    console.log(name)

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
    <header className="header">
      <a href="/" className="logo">Logo</a>

      <nav className="navbar">
        <a href="/">CONTACT US</a>
        <a href="/">SIGN OUT</a>
       

        
      </nav>
    </header>
      {user && (
        <>
          <span>Hi {name}</span>
          <span
            onClick={handleSignout}
            style={{ cursor: "pointer", marginLeft: "10px" }}
          >
            Sign out
          </span>
        </>
      )}
      {logoutError && <div>Error: {logoutError}</div>}
      <br /><br />
    </>
    
  );
  
};

export default Navbar;
