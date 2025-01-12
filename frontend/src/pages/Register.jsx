import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/users", formData);
      navigate("/login"); // Redirect to Login page after successful registration
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Register
          </button>
          <p className="mt-4 text-sm text-gray-600 text-center">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
