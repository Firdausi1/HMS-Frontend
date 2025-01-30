import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Vitals = () => {
  const BASE_URL_VITALS = "http://localhost:3001/api/vitals";
  const BASE_URL_QUEUEDPATIENTS = "http://localhost:3001/api/queue";
  const [vitals, setVitals] = useState([]);
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patientId: "",
    bloodPressure: { systolic: "", diastolic: "" },
    heartRate: "",
    temperature: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [showVitals, setShowVitals] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false); // New state to track edit mode
  const [currentVitalId, setCurrentVitalId] = useState(null); // To track which vital is being edited

  const fetchVitals = async () => {
    try {
      const response = await axios.get(BASE_URL_VITALS);
      console.log("this is the patient vitals:", response.data.data);
      setVitals(response.data.data);
    } catch (error) {
      console.error("Error fetching vitals:", error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get(BASE_URL_QUEUEDPATIENTS);
      // console.log("this is the patient data:", response.data)
      setPatients(response.data); // Assuming the API returns an array of patients
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchVitals();
    fetchPatients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Handle nested updates for bloodPressure
    if (name === "systolic" || name === "diastolic") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        bloodPressure: {
          ...prevFormData.bloodPressure,
          [name]: value,
        },
      }));
    } else {
      // Handle other fields
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.patientId) newErrors.patientId = "Patient ID is required.";
    if (!formData.bloodPressure.systolic || !formData.bloodPressure.diastolic)
      newErrors.bloodPressure =
        "Both systolic and diastolic values are required.";
    if (!formData.heartRate) newErrors.heartRate = "Heart rate is required.";
    if (!formData.temperature)
      newErrors.temperature = "Temperature is required.";
    if (!formData.respiratoryRate)
      newErrors.respiratoryRate = "Respiratory rate is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (editing) {
        // If we're editing, send a PUT request
        const response = await axios.put(
          `${BASE_URL_VITALS}/${currentVitalId}`,
          formData
        );
        // alert("Vitals updated successfully!");
        toast.success("Vitals updated successfully!");

        // Update the vitals state immediately after the update
        setVitals((prevVitals) =>
          prevVitals.map((vital) =>
            vital._id === currentVitalId
              ? { ...vital, ...response.data.data }
              : vital
          )
        );
      } else {
        // If we're adding, send a POST request
        const response = await axios.post(
          `${BASE_URL_VITALS}/add_vitals`,
          formData
        );
        // alert("Vitals added successfully!");
        toast.success("Vitals added successfully!");

        // Find the patient details and attach them to the new vital entry
        const patient = patients.find(
          (p) => p.patient._id === formData.patientId
        );

        const newVital = {
          ...response.data.data,
          patient: patient ? patient.patient : null, // Attach patient data if available
        };
  

        // Update vitals list immediately with patient details
      setVitals((prevVitals) => [...prevVitals, newVital]);

        // Ensure patients are refetched after adding new vitals
        fetchPatients();
      }

      // Reset form and states
      setFormData({
        patientId: "",
        bloodPressure: { systolic: "", diastolic: "" },
        heartRate: "",
        temperature: "",
        respiratoryRate: "",
        oxygenSaturation: "",
        notes: "",
      });
      setEditing(false); // Reset the editing state
      setShowVitals(true);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding/updating vitals:", error);
      // alert("Failed to save vitals.");
      toast.error("Failed to save vitals.");
    }
  };

  const handleEdit = (vital) => {
    setFormData({
      patientId: vital.patient?._id,
      bloodPressure: {
        systolic: vital.bloodPressure.systolic,
        diastolic: vital.bloodPressure.diastolic,
      },
      heartRate: vital.heartRate,
      temperature: vital.temperature,
      respiratoryRate: vital.respiratoryRate,
      oxygenSaturation: vital.oxygenSaturation,
      notes: vital.notes,
    });
    setEditing(true); // Set editing to true
    setCurrentVitalId(vital._id); // Save the vital ID being edited
    setShowVitals(false); // Hide the list to show the form
    setShowForm(true); // Show the form for editing
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL_VITALS}/${id}`);
      setVitals(vitals.filter((vital) => vital._id !== id)); // Remove deleted vital from the list
      // alert("Vitals deleted successfully!");
      toast.success("Vitals deleted successfully!");
    } catch (error) {
      console.error("Error deleting vitals:", error);
      // alert("Failed to delete vitals.");
      toast.error("Failed to delete vitals.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            showVitals
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-700"
          }`}
          onClick={() => {
            setShowVitals(true);
            setShowForm(false);
          }}
        >
          Vitals
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            showForm
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-700"
          }`}
          onClick={() => {
            setShowForm(true);
            setShowVitals(false);
          }}
        >
          Add Vitals
        </button>
      </div>

      {showVitals && (
        <div>
          <h2 className="text-lg font-bold text-gray-700 mb-4">Vitals List</h2>
          <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 border bg-blue-600 text-white">#</th>
                <th className="px-4 py-2 border bg-blue-600 text-white">
                  Patient
                </th>
                <th className="px-4 py-2 border bg-blue-600 text-white">BP</th>
                <th className="px-4 py-2 border bg-blue-600 text-white">
                  Heart Rate (bpm)
                </th>
                <th className="px-4 py-2 border bg-blue-600 text-white">
                  Temp (°F)
                </th>
                <th className="px-4 py-2 border bg-blue-600 text-white">
                  Resp Rate (b/min)
                </th>
                <th className="px-4 py-2 border bg-blue-600 text-white">
                  O2 Sat (%)
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
              {vitals.map((vital, index) => (
                <tr key={vital._id} className="border text-xs">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{vital?.patient.name}</td>
                  <td className="border px-4 py-2">
                    {vital?.bloodPressure.systolic}/
                    {vital?.bloodPressure.diastolic}
                  </td>
                  <td className="border px-4 py-2">{vital?.heartRate}</td>
                  <td className="border px-4 py-2">{vital?.temperature}</td>
                  <td className="border px-4 py-2">{vital?.respiratoryRate}</td>
                  <td className="border px-4 py-2">
                    {vital?.oxygenSaturation}
                  </td>
                  <td className="border px-4 py-2">{vital?.notes}</td>
                  <td className="border px-4 py-2 flex justify-between">
                    <button
                      className="px-2 py-1 bg-blue-700 text-white rounded-md"
                      onClick={() => handleEdit(vital)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded-md ml-2"
                      onClick={() => handleDelete(vital._id)}
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
              {editing ? "Edit Vitals" : "Add Vitals"}
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Form fields */}
              <div className="mb-4">
                <label className="block text-md font-medium text-blue-800">
                  Patient ID
                </label>
                <select
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border rounded-md"
                  required
                >
                  <option value="">Select a patient</option>
                  {patients.map((patient) => (
                    <option
                      key={patient.patient._id}
                      value={patient.patient._id}
                    >
                      {patient.patient.name}
                    </option>
                  ))}
                </select>
                {errors.patientId && (
                  <p className="text-red-600 text-sm">{errors.patientId}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-md font-medium text-blue-800">
                  Blood Pressure (Systolic / Diastolic)
                </label>
                <div className="flex space-x-2">
                  <input
                    name="systolic"
                    type="text"
                    value={formData.bloodPressure.systolic}
                    onChange={handleInputChange}
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="Systolic"
                  />
                  <input
                    name="diastolic"
                    type="text"
                    value={formData.bloodPressure.diastolic}
                    onChange={handleInputChange}
                    className="w-full mt-2 p-2 border rounded-md"
                    placeholder="Diastolic"
                  />
                </div>
                {errors.bloodPressure && (
                  <p className="text-red-600 text-sm">{errors.bloodPressure}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-md font-medium text-blue-800">
                  Heart Rate (bpm)
                </label>
                <input
                  name="heartRate"
                  type="text"
                  value={formData.heartRate}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border rounded-md"
                />
                {errors.heartRate && (
                  <p className="text-red-600 text-sm">{errors.heartRate}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-md font-medium text-blue-800">
                  Temperature (°F)
                </label>
                <input
                  name="temperature"
                  type="text"
                  value={formData.temperature}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border rounded-md"
                />
                {errors.temperature && (
                  <p className="text-red-600 text-sm">{errors.temperature}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-md font-medium text-blue-800">
                  Respiratory Rate (breaths/min)
                </label>
                <input
                  name="respiratoryRate"
                  type="text"
                  value={formData.respiratoryRate}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border rounded-md"
                />
                {errors.respiratoryRate && (
                  <p className="text-red-600 text-sm">
                    {errors.respiratoryRate}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-md font-medium text-blue-800">
                  Oxygen Saturation (%)
                </label>
                <input
                  name="oxygenSaturation"
                  type="text"
                  value={formData.oxygenSaturation}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border rounded-md"
                  placeholder="Oxygen Saturation"
                />
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
                {editing ? "Update Vitals" : "Add Vitals"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vitals;
