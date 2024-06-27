import React, { useState } from "react";
import { Container } from "@mui/material";

import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PostDetails from "./components/PostDetails/PostDetails.jsx";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Container maxWidth="2000px" className="h1">
          <Navbar setUser={setUser} user={user}></Navbar>
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
            <Route path="/posts/:id" element={<PostDetails />} />
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
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
