import React, { useState } from 'react';
import { useUser } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PatientModal from '../../components/PatientModal'; // Import the patient modal component
import AppointmentModal from '../../components/AppointmentModal'; // Import the appointment modal component
import PatientDropdown from '../../components/PatientDropdown'; // Import the patient dropdown component

function DoctorDashboard() {
    const { doctor, setDoctor, logout } = useUser(); // Access the doctor's first name and setDoctor function from context
    const navigate = useNavigate(); // Hook for navigation
    const [isPatientModalOpen, setIsPatientModalOpen] = useState(false); // State to control patient modal visibility
    const [patients, setPatients] = useState([]); // State to store patients data
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false); // State to control appointment modal visibility
    const [appointments, setAppointments] = useState([]); // State to store appointments data
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility

    const handleLogout = () => {
        logout(); // Call the logout function from context
        navigate('/DoctorLogin'); // Navigate back to the login page
    };

    const handleViewPatients = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/patients');
            if (!response.ok) {
                throw new Error('Failed to fetch patients');
            }
            const data = await response.json();
            console.log('Patients data:', data); // Log the patients data
            setPatients(data); // Set the patients data
            setIsPatientModalOpen(true); // Open the patient modal
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    const handleViewAppointments = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/appointment');
            if (!response.ok) {
                throw new Error('Failed to fetch appointments');
            }
            const data = await response.json();
            console.log('Appointments data:', data); // Log the appointments data
            setAppointments(data); // Set the appointments data
            setIsAppointmentModalOpen(true); // Open the appointment modal
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleViewReports = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/patients');
            if (!response.ok) {
                throw new Error('Failed to fetch patients for reports');
            }
            const data = await response.json();
            console.log('Patients data for reports:', data); // Log the patients data
            setPatients(data); // Set the patients data
            setIsDropdownOpen(true); // Open the dropdown
        } catch (error) {
            console.error('Error fetching patients for reports:', error);
        }
    };

    const closePatientModal = () => {
        setIsPatientModalOpen(false); // Close the patient modal
    };

    const closeAppointmentModal = () => {
        setIsAppointmentModalOpen(false); // Close the appointment modal
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false); // Close the dropdown
    };

    const handlePatientSelect = (patient) => {
        console.log('Selected patient:', patient); // Handle the selected patient
        navigate(`/patients/${patient.id}`); // Navigate to the single patient page with the patient's ID
        setIsDropdownOpen(false); // Close the dropdown after selection
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 relative">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Welcome, Dr. {doctor ? doctor : 'Name'}</h1>
                <button 
                    onClick={handleLogout} 
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Logout
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Patient Management</h2>
                    <p>View and manage your patients.</p>
                    <button 
                        onClick={handleViewPatients} 
                        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    >
                        View Patients
                    </button>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Appointments</h2>
                    <p>Schedule and manage your appointments.</p>
                    <button 
                        onClick={handleViewAppointments} 
                        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    >
                        View Appointments
                    </button>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Reports</h2>
                    <p>Access patient reports and analytics.</p>
                    <button 
                        onClick={handleViewReports} 
                        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    >
                        View Reports
                    </button>
                </div>
            </div>

            {/* Modal for viewing patients */}
            <PatientModal isOpen={isPatientModalOpen} onClose={closePatientModal} patients={patients} />
            {/* Modal for viewing appointments */}
            <AppointmentModal isOpen={isAppointmentModalOpen} onClose={closeAppointmentModal} appointments={appointments} />
            {/* Dropdown for viewing reports */}
            <PatientDropdown isOpen={isDropdownOpen} onClose={closeDropdown} patients={patients} onPatientSelect={handlePatientSelect} />
        </div>
    );
}

export default DoctorDashboard;
