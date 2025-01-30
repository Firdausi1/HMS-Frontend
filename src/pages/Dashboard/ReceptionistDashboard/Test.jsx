import React, { useState, useEffect } from "react";
import axios from "axios";

const Appointment = () => {
  const [showForm, setShowForm] = useState(false);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedPatientName, setSelectedPatientName] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/patients");
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/doctor");
        setDoctors(response.data.data || response.data); // Adjust based on the response structure
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setDoctors([]);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/appointment");
        console.log("Fetched appointments:", response.data); // Log the response data
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]); // Set to empty if an error occurs
      }
    };

    fetchPatients();
    fetchDoctors();
    fetchAppointments();
  }, []);


const validateForm = () => {
    const errors = {};
    if (!selectedPatientId) errors.selectedPatientId = "Patient is required.";
    if (!doctorName) errors.doctorName = "Doctor name is required.";
    if (!date) errors.date = "Date is required.";
    if (!time) errors.time = "Time is required.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();

    // Validation
    if (!validateForm()) return;

    const appointmentData = {
      patientId: selectedPatientId,
      doctorName,
      date,
      time,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/appointment/new",
        appointmentData
      );

      // After creating the appointment, reset the form
      setAppointments((prev) => [...prev, response.data.appointment]);

      alert("Appointment created successfully!");

      // Reset form state after successful submission
      setSelectedPatientName(""); // Reset patient selection
      setSelectedPatientId(""); // Reset patient ID
      setDoctorName(""); // Reset doctor name
      setDate(""); // Reset date
      setTime(""); // Reset time
    } catch (error) {
      alert("Failed to create appointment.");
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:3001/api/appointment/${appointmentId}`);
      alert("Appointment deleted successfully!");
      setAppointments((prev) =>
        prev.filter((appointment) => appointment._id !== appointmentId)
      );
    } catch (error) {
      alert(`Failed to delete appointment: ${error.response?.data?.message || error.message}`);
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
                <th className="py-2 px-4 text-left">Time</th>
                <th className="py-2 px-4 text-center">Options</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={appointment._id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td> {/* Add index for numbering */}
                  <td className="border border-gray-300 px-4 py-2">{appointment.patient.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{appointment.doctorName}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatDate(appointment.date)}</td>
                  <td className="border border-gray-300 px-4 py-2">{appointment.time}</td>
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
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Book Patient Appointment
            </h2>
            <form onSubmit={handleCreateAppointment}>
              {/* Patient Field */}
              <div className="mb-4">
                <label htmlFor="patient" className="block text-md font-medium text-blue-800">
                  Select Patient
                </label>
                <select
                  id="patient"
                  value={selectedPatientName}
                  onChange={(e) => {
                    const patient = patients.find((p) => p.name === e.target.value);
                    setSelectedPatientName(e.target.value);
                    setSelectedPatientId(patient ? patient._id : "");
                  }}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a patient</option>
                  {patients.map((patient) => (
                    <option key={patient._id} value={patient.name}>
                      {patient.name}
                    </option>
                  ))}
                </select>
                {errors.selectedPatientId && <p className="text-red-500 text-sm mt-1">{errors.selectedPatientId}</p>}
              </div>

              {/* Doctor Field */}
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
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={`${doctor.firstName} ${doctor.lastName}`}>
                      {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
                </select>
                {errors.doctorName && <p className="text-red-500 text-sm mt-1">{errors.doctorName}</p>}
              </div>

              {/* Date Field */}
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

              {/* Time Field */}
              <div className="mb-4">
                <label htmlFor="time" className="block text-md font-medium text-blue-800">
                  Select Time
                </label>
                <input
                  type="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Create Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;



