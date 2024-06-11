import React from "react";
import { Container } from "@mui/material";

import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth.js";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
