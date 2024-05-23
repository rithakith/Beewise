import React from "react";
import { useState } from "react";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signUpFail, setSignUpFail] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const handleSignup = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        updateProfile(user, { displayName: username });

        console.log(user);
        setSignUpFail(false);
        setSignUpSuccess(true);
        setTimeout(() => {
          setSignUpSuccess(false);
          navigate("/dashboard");
        }, 2500);
        // ...
      })
      .catch((error) => {
        setSignUpFail(true);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        setSignUpError(error.message);
        // ..
      });
  };
  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="username"
          id=""
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <input type="submit" value="Sign up" />
        {/* dont touch below */}
        {signUpSuccess && (
          <>
            <div>Logged In successfully!!!</div>
          </>
        )}
        {signUpFail && (
          <>
            <div>{signUpError}</div>
          </>
        )}
        {/* dont touch above */}
        <p>
          Already have an account? then{" "}
          <span>
            <u>
              <a href="/login">Login</a>
            </u>
          </span>
        </p>
      </form>
    </>
  );
};

export default Signup;
