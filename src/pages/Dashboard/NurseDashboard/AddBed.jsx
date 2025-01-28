import axios from "axios";
import React, { useEffect, useState } from "react";

const AddBed = () => {
  const BASE_URL_BEDS = "http://localhost:3001/api/bed";
  const [beds, setBeds] = useState([]);
  const [formData, setFormData] = useState({
    bedNumber: "",
    ward: "",
    status: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [showBeds, setShowBeds] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentBedId, setCurrentBedId] = useState(null);

  // Fetch the beds from the server
  useEffect(() => {
    const fetchBeds = async () => {
      try {
        const response = await axios.get(BASE_URL_BEDS);
        setBeds(response.data.data); // Assuming the API returns an array of beds
      } catch (error) {
        console.error("Error fetching beds:", error);
      }
    };
    fetchBeds();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.bedNumber) newErrors.bedNumber = "Bed number is required.";
    if (!formData.ward) newErrors.ward = "Ward is required.";
    if (!formData.status) newErrors.status = "Status is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (editing) {
        // If we're editing, send a PUT request
        const response = await axios.put(
          `${BASE_URL_BEDS}/${currentBedId}`,
          formData
        );
        alert("Bed updated successfully!");
        setBeds((prevBeds) =>
          prevBeds.map((bed) =>
            bed._id === currentBedId ? { ...bed, ...response.data } : bed
          )
        );
      } else {
        // If we're adding, send a POST request
        const response = await axios.post(
          `${BASE_URL_BEDS}/add_beds`,
          formData
        );
        alert("Bed added successfully!");
        setBeds((prevBeds) => [...prevBeds, response.data]);
      }

      setFormData({
        bedNumber: "",
        ward: "",
        status: "",
        notes: "",
      });
      setEditing(false);
      setShowBeds(true);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding/updating bed:", error);
      alert("Failed to save bed.");
    }
  };

  const handleEdit = (bed) => {
    setFormData({
      bedNumber: bed.bedNumber,
      ward: bed.ward,
      status: bed.status,
      notes: bed.notes,
    });
    setEditing(true);
    setCurrentBedId(bed._id);
    setShowBeds(false);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL_BEDS}/${id}`);
      setBeds(beds.filter((bed) => bed._id !== id));
      alert("Bed deleted successfully!");
    } catch (error) {
      console.error("Error deleting bed:", error);
      alert("Failed to delete bed.");
    }
  };
  return (
    <div className="p-6">
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            showBeds
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-700"
          }`}
          onClick={() => {
            setShowBeds(true);
            setShowForm(false);
          }}
        >
          Beds
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            showForm
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-700"
          }`}
          onClick={() => {
            setShowForm(true);
            setShowBeds(false);
          }}
        >
          Add Bed
        </button>
      </div>

      {showBeds && (
        <div>
          <h2 className="text-lg font-bold text-gray-700 mb-4">Beds List</h2>
          <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 border bg-blue-600 text-white">#</th>
                <th className="px-4 py-2 border bg-blue-600 text-white">
                  Bed Number
                </th>
                <th className="px-4 py-2 border bg-blue-600 text-white">
                  Ward
                </th>
                <th className="px-4 py-2 border bg-blue-600 text-white">
                  Status
                </th>
                <th className="px-4 py-2 border bg-blue-600 text-white">
                  Notes
                </th>
                <th className="px-4 py-2 border bg-blue-600 text-white">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {beds?.map((bed, index) => (
                <tr key={bed._id} className="border text-xs">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{bed.bedNumber}</td>
                  <td className="border px-4 py-2">{bed.ward}</td>
                  <td className="border px-4 py-2">{bed.status}</td>
                  <td className="border px-4 py-2">{bed.notes}</td>
                  <td className="border px-4 py-2 flex justify-between">
                    <button
                      className="px-2 py-1 bg-blue-700 text-white rounded-md"
                      onClick={() => handleEdit(bed)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded-md ml-2"
                      onClick={() => handleDelete(bed._id)}
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
              {editing ? "Edit Bed" : "Add Bed"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-md font-medium text-blue-800">
                  Bed Number
                </label>
                <input
                  name="bedNumber"
                  type="text"
                  value={formData.bedNumber}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border rounded-md"
                  required
                />
                {errors.bedNumber && (
                  <p className="text-red-600 text-sm">{errors.bedNumber}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-md font-medium text-blue-800">
                  Ward
                </label>
                <input
                  name="ward"
                  type="text"
                  value={formData.ward}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border rounded-md"
                  required
                />
                {errors.ward && (
                  <p className="text-red-600 text-sm">{errors.ward}</p>
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
                  required
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="Available">Available</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Reserved">Reserved</option>
                </select>
                {errors.status && (
                  <p className="text-red-600 text-sm">{errors.status}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-md font-medium text-blue-800">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border rounded-md"
                  placeholder="Additional Notes"
                  rows="3"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                {editing ? "Update Bed" : "Add Bed"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBed;
