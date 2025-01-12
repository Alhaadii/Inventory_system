import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    cost: 0,
    quantity: 0,
    salesprice: 0,
    description: "",
    category: "",
  });
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/cats");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "cost" || name === "quantity") {
      const cost = name === "cost" ? parseFloat(value) || 0 : formData.cost;
      const quantity =
        name === "quantity" ? parseInt(value) || 0 : formData.quantity;
      setTotal(cost * quantity);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData, total, category: formData.category }; // Send the category name

    try {
      if (isEdit) {
        await axios.put(`http://localhost:8000/products/${currentId}`, payload);
      } else {
        await axios.post("http://localhost:8000/products", payload);
      }
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      cost: product.cost,
      quantity: product.quantity,
      salesprice: product.salesprice,
      description: product.description,
      category: product.category.name, // Set the category name instead of ID
    });
    setTotal(product.total);
    setCurrentId(product._id);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      // confirmation
      if (window.confirm("Are you sure you want to delete this product?")) {
        await axios.delete(`http://localhost:8000/products/${id}`);
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      cost: 0,
      quantity: 0,
      salesprice: 0,
      description: "",
      category: "",
    });
    setTotal(0);
    setIsEdit(false);
    setCurrentId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Add Product
      </button>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Cost</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Sales Price</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.cost}</td>
              <td className="border px-4 py-2">{product.quantity}</td>
              <td className="border px-4 py-2">{product.salesprice}</td>
              <td className="border px-4 py-2">{product.total}</td>
              <td className="border px-4 py-2">
                {product.category ? product.category.name : "Unknown"}{" "}
                {/* Display category name */}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
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
              {isEdit ? "Edit Product" : "Add Product"}
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
                <label className="block text-gray-700">Cost</label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Sales Price</label>
                <input
                  type="number"
                  name="salesprice"
                  value={formData.salesprice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {" "}
                      {/* Use category name here */}
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Total</label>
                <input
                  type="number"
                  value={total}
                  readOnly
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
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

export default Products;
