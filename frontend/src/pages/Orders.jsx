import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    items: [{ productId: "", name: "", quantity: 1, price: 0 }],
    customer: "",
    orderedBy: "",
    paymentMethod: "USD",
    paymentStatus: "paid",
  });
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const paymentStatuses = ["pending", "paid", "cancelled", "refunded"];

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchCustomers();
    fetchUsers();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/orders");
      setOrders(response.data);
    } catch (err) {
      setError("Failed to fetch orders");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/products");
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products");
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/customers");
      setCustomers(response.data.customers);
    } catch (err) {
      setError("Failed to fetch customers");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users");
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users");
    }
  };

  const createOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/orders",
        formData
      );
      setOrders([...orders, response.data.order]);
      resetForm();
      setError(null);
      setShowModal(false); // Close modal after successful creation
    } catch (err) {
      setError("Failed to create order");
    }
  };

  const updateOrder = async (id) => {
    try {
      const updatedOrder = { ...formData };
      const response = await axios.put(
        `http://localhost:8000/orders/${id}`,
        updatedOrder
      );
      setOrders(
        orders.map((order) => (order._id === id ? response.data.order : order))
      );
      setError(null);
      setShowModal(false); // Close modal after successful update
    } catch (err) {
      setError("Failed to update order");
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/orders/${id}`);
      setOrders(orders.filter((order) => order._id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete order");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    if (field === "productId") {
      const selectedProduct = products.find((product) => product._id === value);
      updatedItems[index].name = selectedProduct ? selectedProduct.name : "";
      updatedItems[index].price = selectedProduct ? selectedProduct.cost : 0;
    }
    updatedItems[index][field] = value;
    setFormData({ ...formData, items: updatedItems });
  };

  const calculateTotal = () => {
    return formData.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  };

  useEffect(() => {
    setFormData({ ...formData, total: calculateTotal() });
  }, [formData.items]);

  const resetForm = () => {
    setFormData({
      items: [{ productId: "", name: "", quantity: 1, price: 0 }],
      customer: "",
      orderedBy: "",
      paymentMethod: "USD",
      paymentStatus: "paid",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Orders Management
      </h1>

      {/* Modal for creating/updating orders */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Create/Update Order</h2>
            <form>
              {formData.items.map((item, index) => (
                <div key={index} className="flex space-x-4 mb-4">
                  <select
                    className="p-2 border rounded w-1/3"
                    value={item.productId}
                    onChange={(e) =>
                      handleItemChange(index, "productId", e.target.value)
                    }
                  >
                    <option value="">Select Product</option>
                    {products.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.name} (${product.cost})
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Quantity"
                    className="p-2 border rounded w-1/3"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    className="p-2 border rounded w-1/3"
                    value={item.price}
                    disabled
                  />
                </div>
              ))}
              <button
                type="button"
                className="p-2 bg-green-500 text-white rounded mb-4"
                onClick={() =>
                  setFormData({
                    ...formData,
                    items: [
                      ...formData.items,
                      { productId: "", name: "", quantity: 1, price: 0 },
                    ],
                  })
                }
              >
                Add Item
              </button>
              <select
                name="customer"
                className="p-2 border rounded w-full mb-4"
                value={formData.customer}
                onChange={handleFormChange}
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.name}
                  </option>
                ))}
              </select>
              <select
                name="orderedBy"
                className="p-2 border rounded w-full mb-4"
                value={formData.orderedBy}
                onChange={handleFormChange}
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <select
                name="paymentMethod"
                className="p-2 border rounded w-full mb-4"
                value={formData.paymentMethod}
                onChange={handleFormChange}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
              </select>
              <select
                name="paymentStatus"
                className="p-2 border rounded w-full mb-4"
                value={formData.paymentStatus}
                onChange={handleFormChange}
              >
                {paymentStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <p className="mb-4 font-semibold">Total: ${calculateTotal()}</p>
              <button
                type="button"
                className="p-2 bg-blue-500 text-white rounded"
                onClick={createOrder}
              >
                Submit Order
              </button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="p-2 bg-red-500 text-white rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 bg-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Customer
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4">{order._id}</td>
                <td className="px-6 py-4">
                  {
                    customers.find(
                      (customer) => customer._id === order.customer
                    )?.name
                  }
                </td>
                <td className="px-6 py-4">${order.total}</td>
                <td className="px-6 py-4">{order.paymentStatus}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setFormData(order);
                      setShowModal(true);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to open modal */}
      <button
        onClick={() => setShowModal(true)}
        className="p-2 bg-green-500 text-white rounded mt-6"
      >
        Add New Order
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Orders;
