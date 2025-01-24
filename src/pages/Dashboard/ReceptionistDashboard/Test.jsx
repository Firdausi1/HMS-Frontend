import React, { useState, useEffect } from "react";
import axios from "axios";

const Appointment = () => {
  const [showForm, setShowForm] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({}); // For validation errors

  useEffect(() => {
    // Fetch all registered patients
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/patients");
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    // Fetch existing appointments
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/appointment");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchPatients();
    fetchAppointments();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!selectedPatient) {
      newErrors.selectedPatient = "Please select a patient.";
    }
    if (!doctorName) {
      newErrors.doctorName = "Please select a doctor.";
    }
    if (!date) {
      newErrors.date = "Please select a date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/appointment/new", {
        patient_name: selectedPatient,
        doctorName,
        date,
      });

      alert("Appointment created successfully!");
      setAppointments((prevAppointments) => [...prevAppointments, response.data]);
      setSelectedPatient("");
      setDoctorName("");
      setDate("");
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Failed to create appointment. Please try again.");
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:3001/api/appointment/${appointmentId}`);
      alert("Appointment deleted successfully!");
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== appointmentId)
      );
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium ${!showForm ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-700"
            }`}
          onClick={() => setShowForm(false)}
        >
          Appointments
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${showForm ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-700"
            }`}
          onClick={() => setShowForm(true)}
        >
          Book Appointment
        </button>
      </div>

      {!showForm && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Patient Name</th>
                <th className="py-2 px-4 text-left">Doctor</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-center">Options</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr
                  key={appointment._id}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} border-b`}
                >
                  <td className="py-2 px-4 text-left">{index + 1}</td>
                  <td className="py-2 px-4 text-left">{appointment.patient_name}</td>
                  <td className="py-2 px-4 text-left">{appointment.doctorName}</td>
                  <td className="py-2 px-4 text-left">{appointment.date}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handleDelete(appointment._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="bg-blue-100 w-[550px] p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Book Patient Appointment</h2>
            <form onSubmit={handleCreateAppointment}>
              <div className="mb-4">
                <label htmlFor="patient" className="block text-md font-medium text-blue-800">
                  Select Patient
                </label>
                <select
                  id="patient"
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a patient</option>
                  {patients.map((patient) => (
                    <option key={patient._id} value={patient.name}>
                      {patient.name}
                    </option>
                  ))}
                </select>
                {errors.selectedPatient && (
                  <p className="text-red-500 text-sm mt-1">{errors.selectedPatient}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="doctor" className="block text-md font-medium text-blue-800">
                  Select Doctor
                </label>
                <select
                  id="doctor"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a doctor</option>
                  <option value="Dr. Smith">Dr. Smith</option>
                  <option value="Dr. Johnson">Dr. Johnson</option>
                </select>
                {errors.doctorName && (
                  <p className="text-red-500 text-sm mt-1">{errors.doctorName}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="date" className="block text-md font-medium text-blue-800">
                  Select Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>

              <button type="submit" className="w-[25%] py-2 px-2 bg-blue-900 text-white rounded-md hover:bg-blue-600">
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;



