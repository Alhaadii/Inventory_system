import React, { useState, useEffect } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const API_URL = "http://localhost:8000/cats";

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/`);
      setCategories(response.data);
      const totalResponse = await axios.get(`${API_URL}/total`);
      setTotal(totalResponse.data.total);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Category
  const handleAddCategory = async () => {
    if (!categoryName) return alert("Category name is required.");

    try {
      await axios.post(`${API_URL}/`, { name: categoryName });
      setCategoryName("");
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Handle Update Category
  const handleUpdateCategory = async () => {
    if (!categoryName || !editCategoryId)
      return alert("Category name is required.");

    try {
      await axios.put(`${API_URL}/${editCategoryId}`, { name: categoryName });
      setCategoryName("");
      setEditCategoryId(null);
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Handle Delete Category
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Load categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      {/* Add or Edit Category */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 w-[850px]"
        />
        <button
          onClick={editCategoryId ? handleUpdateCategory : handleAddCategory}
          className={`ml-2 px-4 py-2 ${
            editCategoryId ? "bg-yellow-500" : "bg-blue-500"
          } text-white rounded-lg hover:opacity-90`}
        >
          {editCategoryId ? "Update Category" : "Add Category"}
        </button>
        {editCategoryId && (
          <button
            onClick={() => {
              setEditCategoryId(null);
              setCategoryName("");
            }}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:opacity-90"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Total Categories */}
      <div className="mb-4 text-gray-700">
        Total Categories: <span className="font-bold">{total}</span>
      </div>

      {/* List of Categories */}
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr>
              <th className="border p-4 text-left">#</th>
              <th className="border p-4 text-left">Name</th>
              <th className="border p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id} className="hover:bg-gray-100">
                <td className="border p-4">{index + 1}</td>
                <td className="border p-4">{category.name}</td>
                <td className="border p-4">
                  <button
                    onClick={() => {
                      setEditCategoryId(category._id);
                      setCategoryName(category.name);
                    }}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:opacity-90"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="ml-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:opacity-90"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Categories;
