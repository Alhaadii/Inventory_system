import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./Header";
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import Orders from "../pages/Orders";
import Users from "../pages/Users";
import Customers from "../pages/Customers";
import Products from "../pages/Products";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-800 text-white p-4">
          <ul className="space-y-4">
            <li>
              <Link
                to="/home"
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                to="/orders"
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/customers"
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Customers
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="block px-4 py-2 rounded hover:bg-gray-700"
              >
                Products
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/customers" element={<Customers />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
