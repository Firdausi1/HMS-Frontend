import React, { useState, useEffect } from "react";
import axios from "axios";



const Patients = () => {
  //const [showPatients, setShowPatients] = useState(true); // Assuming you want to show the list by default
  const [patients, setPatients] = useState([]);
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [editedPatientData, setEditedPatientData] = useState({});
  const [showPatients, setShowPatients] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    bloodGroup: "",
    phone: "",
    address: "",
    date: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    bloodGroup: "",
    phone: "",
    address: "",
    date: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors before validation
    setErrors({
      name: "",
      email: "",
      gender: "",
      age: "",
      bloodGroup: "",
      phone: "",
      address: "",
      date: "",
    });


    // Regex patterns
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^\d{11}$/;

    // Validate form data
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email address.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.age) newErrors.age = "Age is required.";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Enter a valid phone number (10 digits).";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.date) newErrors.date = "Date of registration is required.";

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop form submission if there are validation errors
    }

    try {
      const response = await axios.post("http://localhost:3001/api/patients/new", formData);
      console.log("Patient registered successfully:", response.data);
      alert("Patient registered successfully!");

      // Reset the form data after successful registration
      setFormData({
        name: "",
        email: "",
        gender: "",
        age: "",
        bloodGroup: "",
        phone: "",
        address: "",
        date: "",
      });
    } catch (error) {
      console.error("Error registering patient:", error.response ? error.response.data : error.message);
      alert("Failed to register patient. Please try again.");
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:3001/api/patients/new", formData);
  //     console.log("Patient registered successfully:", response.data);
  //     alert("Patient registered successfully!");
  //     setFormData({
  //       name: "",
  //       email: "",
  //       gender: "",
  //       age: "",
  //       bloodGroup: "",
  //       phone: "",
  //       address: "",
  //       date: "",
  //     });
  //   } catch (error) {
  //     console.error("Error registering patient:", error.response ? error.response.data : error.message);
  //     alert("Failed to register patient. Please try again.");
  //   }
  // };




  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/patients");
        console.log(response.data); // Log the data to check the structure
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  // Handle delete patient
  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:3001/api/patients/${id}`);
  //     setPatients(patients.filter((patient) => patient._id !== id)); // Remove patient from state
  //     alert("Patient deleted successfully");
  //   } catch (error) {
  //     console.error("Error deleting patient:", error);
  //     alert("Failed to delete patient");
  //   }
  // };



  // Handle Edit
  const handleEdit = (patient) => {
    setEditingPatientId(patient._id); // Set the row to be editable
    setEditedPatientData({ ...patient }); // Set the patient data to be edited
  };

  // Handle Save
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/patients/${editingPatientId}`,
        editedPatientData
      );
      if (response.data) {
        // Update the patients list with the edited data
        setPatients((prevPatients) =>
          prevPatients.map((patient) =>
            patient._id === editingPatientId ? { ...patient, ...editedPatientData } : patient
          )
        );
        alert("Patient updated successfully!");
      } else {
        alert("Failed to update patient.");
      }
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient.");
    } finally {
      setEditingPatientId(null);  // Close edit mode
      setEditedPatientData({});
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/patients/${id}`);
      if (response.data) {
        setPatients((prevPatients) =>
          prevPatients.filter((patient) => patient._id !== id)
        );
        alert("Patient deleted successfully!");
      } else {
        alert("Failed to delete patient.");
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Failed to delete patient.");
    }
  };


  return (
    <div className="p-6">
      {/* Header Buttons */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium ${showPatients ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-700"}`}
          onClick={() => {
            setShowPatients(true);
            setShowForm(false); // Ensure only one section is visible
          }}
        >
          Patients
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${showForm ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-700"}`}
          onClick={() => {
            setShowForm(true);
            setShowPatients(false); // Ensure only one section is visible
          }}
        >
          Add Patient
        </button>


      </div>

      {/* Patient List */}
      {/* Patient List */}
      {showPatients && (
        <div>
          <h2 className="text-lg font-bold text-gray-700 mb-4">Patient List</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border bg-blue-600 text-white">#</th>
                <th className="px-4 py-2 border bg-blue-600 text-white">Name</th>
                <th className="px-4 py-2 border bg-blue-600 text-white">Phone</th>
                <th className="px-4 py-2 border bg-blue-600 text-white">Gender</th>
                <th className="px-4 py-2 border bg-blue-600 text-white">Age</th>
                <th className="px-4 py-2 border bg-blue-600 text-white">Blood Group</th>
                <th className="px-4 py-2 border bg-blue-600 text-white">Time Of Registration</th>
                <th className="px-4 py-2 border bg-blue-600 text-white">Options</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={patient._id} className="border">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    {editingPatientId === patient._id ? (
                      <input
                        type="text"
                        value={editedPatientData.name}
                        onChange={(e) => setEditedPatientData({ ...editedPatientData, name: e.target.value })}
                        className="border px-2 py-1 w-full"
                      />
                    ) : (
                      patient.name
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingPatientId === patient._id ? (
                      <input
                        type="text"
                        value={editedPatientData.phone}
                        onChange={(e) => setEditedPatientData({ ...editedPatientData, phone: e.target.value })}
                        className="border px-2 py-1 w-full"
                      />
                    ) : (
                      patient.phone
                    )}
                  </td>
                  <td className="border px-2 py-2">
                    {editingPatientId === patient._id ? (
                      <input
                        type="text"
                        value={editedPatientData.gender}
                        onChange={(e) => setEditedPatientData({ ...editedPatientData, gender: e.target.value })}
                        className="border px-2 py-1 w-full"
                      />
                    ) : (
                      patient.gender
                    )}
                  </td>
                  <td className="border px-2 py-2">
                    {editingPatientId === patient._id ? (
                      <input
                        type="number"
                        value={editedPatientData.age}
                        onChange={(e) => setEditedPatientData({ ...editedPatientData, age: e.target.value })}
                        className="border px-2 py-1 w-full"
                      />
                    ) : (
                      patient.age
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingPatientId === patient._id ? (
                      <input
                        type="text"
                        value={editedPatientData.bloodGroup}
                        onChange={(e) => setEditedPatientData({ ...editedPatientData, bloodGroup: e.target.value })}
                        className="border px-2 py-1 w-full"
                      />
                    ) : (
                      patient.bloodGroup
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingPatientId === patient._id ? (
                      <input
                        type="date"
                        value={editedPatientData.date}
                        onChange={(e) => setEditedPatientData({ ...editedPatientData, date: e.target.value })}
                        className="border px-2 py-1 w-full"
                      />
                    ) : (
                      patient.date
                    )}
                  </td>
                  <td className="border px-2 py-4">
                    {editingPatientId === patient._id ? (
                      <button
                        className="px-2 py-1 mb-2 bg-green-500 text-white rounded-md"
                        onClick={handleSave} // Save changes
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="px-2 py-1 bg-blue-700 text-white rounded-md"
                        onClick={() => handleEdit(patient)} // Enter edit mode
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded-md ml-2"
                      onClick={() => handleDelete(patient._id)} // Optional delete functionality
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


      {/* Add Patient Form */}
      {showForm && (
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="bg-blue-100 w-[600px] p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700 mb-4">ADD PATIENT</h2>
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-md font-medium text-blue-800"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter patient name"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-md font-medium text-blue-800"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
              </div>

              {/* Gender Field */}
              <div className="mb-4">
                <label
                  htmlFor="gender"
                  className="block text-md font-medium text-blue-800"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && <p className="text-red-600 text-sm">{errors.gender}</p>}
              </div>



              {/* Age Field */}
              <div className="mb-4">
                <label
                  htmlFor="age"
                  className="block text-md font-medium text-blue-800"
                >
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  type="text"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Enter age"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.age && <p className="text-red-600 text-sm">{errors.age}</p>}
              </div>

              {/* Blood Group Field */}
              <div className="mb-4">
                <label
                  htmlFor="bloodGroup"
                  className="block text-md font-medium text-blue-800"
                >
                  Blood Group
                </label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
                {errors.bloodGroup && <p className="text-red-600 text-sm">{errors.bloodGroup}</p>}
              </div>

              {/* Phone Number Field */}
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-md font-medium text-blue-800"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
              </div>

              {/* Address Field */}
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-md font-medium text-blue-800"
                >
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
              </div>

              {/* Date Field */}
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-md font-medium text-blue-800"
                >
                  Date of Registration
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.date && <p className="text-red-600 text-sm">{errors.date}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-900 text-white rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
