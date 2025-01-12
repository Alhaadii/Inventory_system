import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <Routes>
      {/* Default route redirects to the Login page */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
