import React, { useState, useEffect } from "react";
import axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/customers");
      setCustomers(response.data.customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(
          `http://localhost:8000/customers/${currentId}`,
          formData
        );
      } else {
        await axios.post("http://localhost:8000/customers", formData);
      }
      fetchCustomers();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  const handleEdit = (customer) => {
    setFormData({
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      email: customer.email,
    });
    setCurrentId(customer._id);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      phone: "",
      address: "",
      email: "",
    });
    setIsEdit(false);
    setCurrentId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Customers</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Add Customer
      </button>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td className="border px-4 py-2">{customer.name}</td>
              <td className="border px-4 py-2">{customer.phone}</td>
              <td className="border px-4 py-2">{customer.address}</td>
              {console.log(customer.email)}
              <td className="border px-4 py-2">{customer.email}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(customer)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(customer._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {isEdit ? "Edit Customer" : "Add Customer"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  {isEdit ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
