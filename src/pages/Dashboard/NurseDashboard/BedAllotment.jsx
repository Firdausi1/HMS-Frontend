import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BedAllotment = () => {
  const BASE_URL_ALLOTMENT = "http://localhost:3001/api/bedallotment";
  const BASE_URL_PATIENTS = "http://localhost:3001/api/queue"; // Add the patients API endpoint
  const BASE_URL_BEDS = "http://localhost:3001/api/bed"; // Add the beds API endpoint

  const [allotments, setAllotments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [beds, setBeds] = useState([]);
  const [formData, setFormData] = useState({
    patientId: "",
    bedId: "",
    status: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [showAllotments, setShowAllotments] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentAllotmentId, setCurrentAllotmentId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch allotments
        const allotmentResponse = await axios.get(BASE_URL_ALLOTMENT);
        setAllotments(allotmentResponse.data.data);

        // Fetch patients
        const patientResponse = await axios.get(BASE_URL_PATIENTS);
        console.log("This is queued patients:", patientResponse.data);
        setPatients(patientResponse.data);

        // Fetch beds
        const bedResponse = await axios.get(`${BASE_URL_BEDS}/available`);
        // console.log("This is the bed info:", bedResponse.data.data);
        setBeds(bedResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.patientId) newErrors.patientId = "Patient is required.";
    if (!formData.bedId) newErrors.bedId = "Bed is required.";
    if (!formData.status) newErrors.status = "Status is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (editing) {
        // Update existing allotment
        const response = await axios.put(
          `${BASE_URL_ALLOTMENT}/${currentAllotmentId}`,
          formData
        );
        // alert("Bed allotment updated successfully!");
        toast.success("Bed allotment updated successfully!");
        setAllotments((prevAllotments) =>
          prevAllotments.map((allotment) =>
            allotment._id === currentAllotmentId
              ? { ...allotment, ...response.data.data }
              : allotment
          )
        );
      } else {
        // Add new allotment
        const response = await axios.post(
          `${BASE_URL_ALLOTMENT}/allot`,
          formData
        );
        // alert("Bed allotment added successfully!");
        toast.success("Bed allotment added successfully!");
        // Fetch fresh data to ensure proper population
        // Refetch all allotments to get the updated data
        const allotmentResponse = await axios.get(BASE_URL_ALLOTMENT);
        setAllotments(allotmentResponse.data.data);;
      }

      setFormData({
        patientId: "",
        bedId: "",
        status: "",
        notes: "",
      });
      setEditing(false);
      setShowAllotments(true);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving bed allotment:", error);
      // alert("Failed to save bed allotment.");
      toast.error( "Failed to save bed allotment.");
    }
  };

  const handleEdit = (allotment) => {
    setFormData({
      patientId: allotment.patient._id,
      bedId:  allotment.bed ? allotment.bed._id : "",
      status: allotment.status,
      notes: allotment.notes || "",
    });
    setEditing(true);
    setCurrentAllotmentId(allotment._id);
    setShowAllotments(false);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL_ALLOTMENT}/${id}`);
      setAllotments(allotments.filter((allotment) => allotment._id !== id));
      // alert("Bed allotment deleted successfully!");
      toast.success("Bed allotment deleted successfully!");
    } catch (error) {
      console.error("Error deleting bed allotment:", error);
      // alert("Failed to delete bed allotment.");
      toast.error( "Failed to delete bed allotment.");
    }
  };
  return (
    <div className="p-6">
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            showAllotments
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-700"
          }`}
          onClick={() => {
            setShowAllotments(true);
            setShowForm(false);
          }}
        >
          Allotments
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            showForm
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-700"
          }`}
          onClick={() => {
            setShowForm(true);
            setShowAllotments(false);
          }}
        >
          Add Allotment
        </button>
      </div>

      {showAllotments && (
        <div>
          <h2 className="text-lg font-bold text-gray-700 mb-4">
            Bed Allotments
          </h2>
          <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 border bg-blue-600 text-white">#</th>
                <th className="px-4 py-2 border bg-blue-600 text-white">
                  Patient
                </th>
                <th className="px-4 py-2 border bg-blue-600 text-white">Bed</th>
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
              {allotments.map((allotment, index) => (
                <tr key={allotment._id} className="border text-xs">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{allotment.patient.name}</td>
                  <td className="border px-4 py-2">
                    {allotment.bed.bedNumber}
                  </td>
                  <td className="border px-4 py-2">{allotment.status}</td>
                  <td className="border px-4 py-2">{allotment.notes}</td>
                  <td className="border px-4 py-2 flex justify-between">
                    <button
                      className="px-2 py-1 bg-blue-700 text-white rounded-md"
                      onClick={() => handleEdit(allotment)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded-md ml-2"
                      onClick={() => handleDelete(allotment._id)}
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
              {editing ? "Edit Allotment" : "Add Allotment"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-md font-medium text-blue-800">
                  Patient
                </label>
                <select
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border rounded-md"
                >
                  <option value="">Select Patient</option>
                  {patients?.map((patient) => (
                    <option key={patient?.patient._id} value={patient?.patient._id}>
                      {patient?.patient?.name}
                    </option>
                  ))}
                </select>
                {errors.patientId && (
                  <p className="text-red-600 text-sm">{errors.patientId}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-md font-medium text-blue-800">
                  Bed
                </label>
                <select
                  name="bedId"
                  value={formData.bedId}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border rounded-md"
                >
                  <option value="">Select Bed</option>
                  {beds && beds.length > 0 ? (
                    beds?.map((bed) => (
                      <option key={bed?._id} value={bed?._id}>
                        {bed?.bedNumber}
                      </option>
                    ))
                  ) : (
                    <option>No beds available</option>
                  )}
                </select>

                {errors.bedId && (
                  <p className="text-red-600 text-sm">{errors.bedId}</p>
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
                  <option value="Status">Status</option>
                  <option value="Alloted">Alloted</option>
                  <option value="Discharged">Discharged</option>
                  <option value="Expired">Expired</option>
                </select>
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
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                {editing ? "Update Allotment" : "Add Allotment"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BedAllotment;
