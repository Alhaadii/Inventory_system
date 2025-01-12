import React, { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState(null);

  // Load user details from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      {/* Left Section: Title or Logo */}
      <div className="text-xl font-bold text-gray-800">
        Inventory Management System
      </div>

      {/* Right Section: Search and User Info */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* Display User Info */}
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">{user.name}</span>
            <img
              src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border"
            />
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:opacity-90"
            >
              Logout
            </button>
          </div>
        ) : (
          <span className="text-gray-700">Guest</span>
        )}
      </div>
    </header>
  );
};

export default Header;
