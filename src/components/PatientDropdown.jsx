import React, { useState } from 'react';
import PatientVitalsModal from './PatientVitalsModal'; // Import the Patient Vitals Modal

const PatientDropdown = ({ isOpen, onClose, patients }) => {
    const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false); // State to control vitals modal visibility
    const [selectedPatient, setSelectedPatient] = useState(null); // State to store selected patient
    const [vitals, setVitals] = useState(null); // State to store fetched vitals

    if (!isOpen) return null; // Don't render the dropdown if it's not open

    const handleViewMore = async (patient) => {
        console.log('View More clicked for patient:', patient); // Debugging log
        setSelectedPatient(patient); // Set the selected patient

        try {
            const response = await fetch(`http://localhost:3001/api/vitals/${patient.id}`); // Fetch vitals for the selected patient
            if (!response.ok) {
                throw new Error('Failed to fetch vitals');
            }
            const data = await response.json();
            setVitals(data); // Set the fetched vitals
            setIsVitalsModalOpen(true); // Open the vitals modal
        } catch (error) {
            console.error('Error fetching vitals:', error);
        }
    };

    return (
        <div className="absolute z-10 bg-white border border-gray-300 rounded shadow-lg mt-2 w-64">
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">Patients List</h2>
                <button onClick={onClose} className="text-red-500 hover:underline mb-2">Close</button>
                <ul>
                    {patients.length > 0 ? (
                        patients.map((patient) => (
                            <li 
                                key={patient.id} 
                                className="border-b py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleViewMore(patient)} // Handle patient selection
                            >
                                {patient.name} - {patient.email}
                                <button 
                                    onClick={() => handleViewMore(patient)} 
                                    className="text-blue-600 hover:underline ml-2"
                                >
                                    View More
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="py-2 text-center">No patients found.</li>
                    )}
                </ul>
                {/* Patient Vitals Modal */}
                <PatientVitalsModal 
                    isOpen={isVitalsModalOpen} 
                    onClose={() => setIsVitalsModalOpen(false)} 
                    patient={selectedPatient} 
                    vitals={vitals} // Pass the fetched vitals to the modal
                />
            </div>
        </div>
    );
};

export default PatientDropdown;
