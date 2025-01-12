import React, { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState({
    categories: 0,
    customers: 0,
    orders: 0,
    products: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data from backend APIs
  const fetchData = async () => {
    try {
      const responses = await Promise.all([
        fetch("http://localhost:8000/home/cats/count"),
        fetch("http://localhost:8000/home/customers/count"),
        fetch("http://localhost:8000/home/orders/count"),
        fetch("http://localhost:8000/home/products/count"),
        fetch("http://localhost:8000/home/users/count"),
      ]);

      // Check if all responses are OK
      if (!responses.every((response) => response.ok)) {
        throw new Error("One or more API calls failed");
      }

      const results = await Promise.all(responses.map((res) => res.json()));

      setData({
        categories: results[0].total,
        customers: results[1].totalCustomers,
        orders: results[2].totalOrders,
        products: results[3].total,
        users: results[4].total,
      });
    } catch (err) {
      console.error("Error fetching data:", err.message);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-lg font-medium text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-600">Error</h1>
          <p className="text-lg text-red-500">{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-10">
        Dashboard Overview
      </h1>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4">
        <Card title="Categories" value={data.categories} color="bg-blue-100" />
        <Card title="Customers" value={data.customers} color="bg-green-100" />
        <Card title="Orders" value={data.orders} color="bg-yellow-100" />
        <Card title="Products" value={data.products} color="bg-purple-100" />
        <Card title="Users" value={data.users} color="bg-pink-100" />
      </div>
    </div>
  );
};

// Card Component
const Card = ({ title, value, color }) => {
  return (
    <div className={`p-6 rounded-lg shadow-md border border-gray-200 ${color}`}>
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default Home;
