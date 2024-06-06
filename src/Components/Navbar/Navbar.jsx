import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth} from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import './Navbar.css'
import logo from '../../assets/beelogo.png';

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
    <header className="header">
    <a href="/" className="logo">
      <img src={logo} alt="Logo" />
    </a>

    <nav className="navbar">
      <a href="/">CONTACT US</a>
      {user ? (
        <>
          <span className="user-name">Hi, {name}</span>
          <button onClick={handleSignout} className="sign-out-btn">SIGN OUT</button>
        </>
      ) : (
        <a href="/login">LOGIN</a>
      )}
    </nav>

    {logoutError && <div className="error-message">Error: {logoutError}</div>}
  </header>
);
};

export default Navbar;
