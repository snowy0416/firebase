import { auth,googleProvider } from "../config/firebase";
import '../components/auth.css';
import React, { useState } from "react";
import { createUserWithEmailAndPassword,signInWithPopup, signOut } from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User registered successfully");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("The email address is already in use by another account.");
      } else {
        console.error("Error creating user:", error.message);
        alert(error.message);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (error) {
        console.error(error)
    }
   
  }
  const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <div className="main">
      <input className="ip1"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      /><br/>

      <input  className="ip1"
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      /><br/><div className="buttons">
      <button  onClick={signIn}>
        Sign-in
      </button><br/>
      <button onClick={signInWithGoogle}>
       signInWithGoogle
      </button><br/>
      <button onClick={logout}>
        Log-out
      </button>
      </div>
    </div>
  );
};
