import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Medication = () => {
  const BASE_URL_MEDICATION = "http://localhost:3001/api/medication";
  const [medications, setMedications] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    status: "Available",
  });
  const [errors, setErrors] = useState({});
  const [showMedications, setShowMedications] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentMedicationId, setCurrentMedicationId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axios.get( `${BASE_URL_MEDICATION}?search=${searchTerm}`);
        setMedications(response.data.data);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedications();
  }, [searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.quantity) newErrors.quantity = "Quantity is required.";
    if (!formData.price) newErrors.price = "Price is required.";
    if (!formData.status) newErrors.status = "Status is required.";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      if (editing) {
        // Update medication
        const response = await axios.put(
          `${BASE_URL_MEDICATION}/update/${currentMedicationId}`,
          formData
        );
        // alert("Medication updated successfully!");
        toast.success("Medication updated successfully!");
        // Update medications state immediately after successful update
        setMedications((prevMedications) =>
          prevMedications.map((med) =>
            med._id === currentMedicationId ? { ...med, ...response.data.data } : med
          )
        );
      } else {
        // Add new medication
        const response = await axios.post(
          `${BASE_URL_MEDICATION}/add_medicine`,
          formData
        );
        // alert("Medication added successfully!");
        toast.success("Medication added successfully!");
  
        // Add new medication to state immediately
        setMedications((prevMedications) => [...prevMedications, response.data.data]);
      }
  
      // Reset form and close form view
      setFormData({
        name: "",
        description: "",
        quantity: "",
        price: "",
        status: "Available",
      });
      setEditing(false);
      setShowMedications(true);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving medication:", error);
      // alert("Failed to save medication.");
      toast.error("Failed to save medication.");
    }
  };
  
  

  const handleEdit = (medication) => {
    setFormData({
      name: medication.name,
      description: medication.description,
      quantity: medication.quantity,
      price: medication.price,
      status: medication.status,
    });
    setEditing(true);
    setCurrentMedicationId(medication._id);
    setShowMedications(false);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL_MEDICATION}/delete/${id}`);
      setMedications((prevMedications) =>
        prevMedications.filter((med) => med._id !== id)
      );
      // alert("Medication deleted successfully!");
      toast.success("Medication deleted successfully!");
    } catch (error) {
      console.error("Error deleting medication:", error);
      // alert("Failed to delete medication.");
      toast.error("Failed to delete medication.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            showMedications
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-700"
          }`}
          onClick={() => {
            setShowMedications(true);
            setShowForm(false);
          }}
        >
          Medications
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            showForm
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-700"
          }`}
          onClick={() => {
            setShowForm(true);
            setShowMedications(false);
          }}
        >
          Add Medication
        </button>
      </div>

      {showMedications && (
        <div>
          <div className="flex justify-between">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
            Medications List
          </h2>
          <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-96 outline-none"
        />
          </div>
          
          <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 border bg-blue-600 text-white">#</th>
                <th className="px-4 py-2 border bg-blue-600 text-white">
                  Name
                </th>
                <th className="px-4 py-2 border bg-blue-600 text-white">
                  Description
                </th>
                <th className="px-4 py-2 border bg-blue-600 text-white">
                  Quantity
                </th>
                <th className="px-4 py-2 border bg-blue-600 text-white">
                  Price
                </th>
                <th className="px-4 py-2 border bg-blue-600 text-white">
                  Status of Medication
                </th>
                <th className="px-4 py-2 border bg-blue-600 text-white">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {medications?.map((med, index) => (
                <tr key={med?._id} className="border text-xs">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{med?.name}</td>
                  <td className="border px-4 py-2">{med?.description}</td>
                  <td className="border px-4 py-2">{med?.quantity}</td>
                  <td className="border px-4 py-2">&#8358;{med?.price}</td>
                  <td className="border px-4 py-2">{med.status}</td>
                  <td className="border px-4 py-2 flex justify-between">
                    <button
                      className="px-2 py-1 bg-blue-700 text-white rounded-md"
                      onClick={() => handleEdit(med)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded-md ml-2"
                      onClick={() => handleDelete(med._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="bg-blue-100 w-[600px] p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              {editing ? "Edit Medication" : "Add Medication"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-md font-medium text-blue-800">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border rounded-md"
                  placeholder="Medication Name"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-md font-medium text-blue-800">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border rounded-md"
                  placeholder="Description"
                  rows="3"
                />
                {errors.description && (
                  <p className="text-red-600 text-sm">{errors.description}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-md font-medium text-blue-800">
                  Quantity
                </label>
                <input
                  name="quantity"
                  type="text"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border rounded-md"
                  placeholder="Quantity"
                />
                {errors.quantity && (
                  <p className="text-red-600 text-sm">{errors.quantity}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-md font-medium text-blue-800">
                  Price
                </label>
                <input
                  name="price"
                  type="text"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border rounded-md"
                  placeholder="Price"
                />
                {errors.price && (
                  <p className="text-red-600 text-sm">{errors.price}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-md font-medium text-blue-800">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border rounded-md"
                >
                  <option value="Available">Available</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
                {errors.status && (
                  <p className="text-red-600 text-sm">{errors.status}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
              >
                {editing ? "Update Medication" : "Add Medication"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Medication;
