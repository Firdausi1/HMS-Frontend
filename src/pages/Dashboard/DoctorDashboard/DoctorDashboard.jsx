import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import PatientModal from '../../../components/PatientModal'; // Import the patient modal component
import AppointmentModal from '../../../components/AppointmentModal'; // Import the appointment modal component
import PatientDropdown from '../../../components/PatientDropdown'; // Import the patient dropdown component
import PrescriptionModal from '../../../components/PrescriptionModal'; // Import the prescription modal component
import QueueModal from '../../../components/QueueModal'; // Import the queue modal component
import PatientVitalsModal from '../../../components/PatientVitalsModal'; // Import the patient vitals modal component
import DoctorSideBar from '../../../pages/Dashboard/DoctorDashboard/DoctorSidebar'; // Import the SideBar component

function DoctorDashboard() {
    const { user, logout } = useContext(AuthContext); // Access the doctor's first name and logout function from context
    const navigate = useNavigate(); // Hook for navigation
    const [isPatientModalOpen, setIsPatientModalOpen] = useState(false); // State to control patient modal visibility
    const [patients, setPatients] = useState([]); // State to store patients data
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false); // State to control appointment modal visibility
    const [appointments, setAppointments] = useState([]); // State to store appointments data
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility
    const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false); // State to control prescription modal visibility
    const [queuePatients, setQueuePatients] = useState([]); // State to store queue patients
    const [isQueueModalOpen, setIsQueueModalOpen] = useState(false); // Define the state for modal visibility
    const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false); // State to control vitals modal visibility
    const [selectedPatient, setSelectedPatient] = useState(null); // State to store selected patient for vitals

    useEffect(() => {
        if (!user) {
            // navigate('/'); // Redirect to login if not logged in
        }
    }, [user, navigate]);

    // Move the function definition outside useEffect
    const fetchQueuePatients = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/queue');
            if (response.ok) {
                const data = await response.json();
                console.log('Queue Patients Data:', data);
                setQueuePatients(data);
            } else {
                console.error('Failed to fetch queue patients:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching queue patients:', error);
        }
    };

    useEffect(() => {
        fetchQueuePatients();
    }, []);

    const handleLogout = () => {
        logout(); // Call the logout function from context
        navigate('/'); // Navigate back to the login page
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
            const result = await response.json(); // Get the full response
            console.log('Appointments data:', result.data); // Log the appointments data
            setAppointments(result.data); // Set the appointments data from the 'data' property
            setIsAppointmentModalOpen(true); // Open the appointment modal
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    // const handleViewReports = async () => {
    //     try {
    //         const response = await fetch('http://localhost:3001/api/patients');
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch patients for reports');
    //         }
    //         const data = await response.json();
    //         console.log('Patients data for reports:', data); // Log the patients data
    //         setPatients(data); // Set the patients data
    //         setIsDropdownOpen(true); // Open the dropdown
    //     } catch (error) {
    //         console.error('Error fetching patients for reports:', error);
    //     }
    // };

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

    const handleOpenPrescriptionModal = () => {
        setIsPrescriptionModalOpen(true); // Open the prescription modal
    };

    const handleOpenQueueModal = () => {
        fetchQueuePatients(); // Use the renamed function
        setIsQueueModalOpen(true);
    };

    const handleCloseQueueModal = () => {
        setIsQueueModalOpen(false); // Close the queue modal
    };

    const handleOpenVitalsModal = (patient) => {
        setSelectedPatient(patient); // Set the selected patient for vitals
        setIsVitalsModalOpen(true); // Open the vitals modal
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex gap-3">
            <DoctorSideBar 
                handleViewPatients={handleViewPatients} 
                handleOpenQueueModal={handleOpenQueueModal}
                handleViewAppointments={handleViewAppointments}
            />

            <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Welcome, Dr. {user ? user.firstName : 'Name'}</h1>
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Card for View Patients */}
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Patients</h3>
                        <p>View and manage your patients.</p>
                        <button 
                            onClick={handleViewPatients} 
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Go to Patients
                        </button>
                    </div>

                    {/* Card for View Queue */}
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Queue</h3>
                        <p>Manage the patient queue.</p>
                        <button 
                            onClick={handleOpenQueueModal} // Open queue modal
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Go to Queue
                        </button>
                    </div>

                    {/* Card for View Appointments */}
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Appointments</h3>
                        <p>Schedule and manage your appointments.</p>
                        <button 
                            onClick={handleViewAppointments} 
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Go to Appointments
                        </button>
                    </div>

                    {/* Card for View Vital Signs */}
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Vital Signs</h3>
                        <p>Monitor and view patient vital signs.</p>
                        <button 
                            onClick={() => handleOpenVitalsModal(selectedPatient)} // Open patient vitals modal
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Go to Vital Signs
                        </button>
                    </div>


                    {/* Card for View Bed Allotment */}
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Bed Allotment</h3>
                        <p>Manage bed allotments for patients.</p>
                        <button 
                            onClick={() => {}} // Add functionality here
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Go to Bed Allotment
                        </button>
                    </div>

                    {/* Card for View Blood Donors */}
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Blood Donors</h3>
                        <p>Manage blood donor information.</p>
                        <button 
                            onClick={() => {}} // Add functionality here
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Go to Blood Donors
                        </button>
                    </div>

                    {/* Card for Dispatch Blood */}
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Dispatch Blood</h3>
                        <p>Manage blood dispatch requests.</p>
                        <button 
                            onClick={() => {}} // Add functionality here
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Go to Dispatch Blood
                        </button>
                    </div>
                    {/* Card for Profile */}
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Profile</h3>
                        <p>Manage your profile.</p>
                        <button 
                           onClick={() => navigate('/doctor-profile')}
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for viewing patients */}
            <PatientModal isOpen={isPatientModalOpen} onClose={() => setIsPatientModalOpen(false)} patients={patients} />
            {/* Modal for viewing appointments */}
            <AppointmentModal isOpen={isAppointmentModalOpen} onClose={() => setIsAppointmentModalOpen(false)} appointments={appointments} />
            {/* Dropdown for viewing reports */}
            <PatientDropdown isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} patients={patients} />
            {/* Prescription Modal */}
            <PrescriptionModal isOpen={isPrescriptionModalOpen} onClose={() => setIsPrescriptionModalOpen(false)} />
            <QueueModal isOpen={isQueueModalOpen} onClose={handleCloseQueueModal} queuePatients={queuePatients} />
            <PatientVitalsModal isOpen={isVitalsModalOpen} onClose={() => setIsVitalsModalOpen(false)} patient={selectedPatient} />
        </div>
    );
}

export default DoctorDashboard;
