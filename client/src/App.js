import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";

import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PostDetails from "./components/PostDetails/PostDetails.jsx";
import { ForgotPassword } from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  /**
   * useEffect hook to listen for changes in localStorage and update user profile accordingly.
   */
  useEffect(() => {
    /**
     * Function to handle changes in localStorage and update user profile.
     */
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("profile")));
    };

    // Add event listener for storage changes
    window.addEventListener("storage", handleStorageChange);

    // Clean up by removing event listener when component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Container maxWidth="2000px" className="h1">
          {user && <Navbar setUser={setUser} user={user} />}
          <Routes>
            {/* {console.log(user)} */}
            <Route path="/" element={<Navigate to="/posts"></Navigate>} />
            <Route
              path="/posts"
              element={user ? <Home /> : <Navigate to="/auth"></Navigate>}
            />
            <Route
              path="/posts/search"
              exact
              element={user ? <Home /> : <Navigate to="/auth"></Navigate>}
            />
            <Route
              path="/posts/:id"
              element={
                user ? <PostDetails /> : <Navigate to="/auth"></Navigate>
              }
            />
            <Route
              path="/auth"
              element={
                user ? (
                  <Navigate to="/"></Navigate>
                ) : (
                  <Auth user={user} setUser={setUser} />
                )
              }
            />
            <Route
              path="/forgot-password"
              element={<ForgotPassword></ForgotPassword>}
            />
            <Route
              path="/resetPassword/:id/:token"
              element={<ResetPassword></ResetPassword>}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
