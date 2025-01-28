import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientVitalsModal from './PatientVitalsModal'; // Import the Patient Vitals Modal

const PatientModal = ({ isOpen, onClose, patients }) => {
    const navigate = useNavigate(); // Hook for navigation
    const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false); // State to control vitals modal visibility
    const [selectedPatient, setSelectedPatient] = useState(null); // State to store selected patient

    if (!isOpen) return null; // Don't render the modal if it's not open

    const handleViewMore = (patient) => {
        navigate(`/patients/${patient.id}`); // Navigate to the single patient page
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-11/12 md:w-3/4 lg:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Patients List</h2>
                <button 
                    onClick={onClose} 
                    className="text-red-600 hover:underline mb-4 self-center"
                >
                    Close
                </button>
                {patients.length > 0 ? (
                    <div className="space-y-4">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 p-2 text-left">Patient ID</th>
                                    <th className="border border-gray-300 p-2 text-left">Name</th>
                                    <th className="border border-gray-300 p-2 text-left">Email</th>
                                    <th className="border border-gray-300 p-2 text-left">View More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.map((patient) => (
                                    <tr key={patient.id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 p-2">{patient.id}</td>
                                        <td className="border border-gray-300 p-2">{patient.name}</td>
                                        <td className="border border-gray-300 p-2">{patient.email}</td>
                                        <td className="border border-gray-300 p-2">
                                            <button 
                                                onClick={() => handleViewMore(patient)} 
                                                className="text-blue-600 hover:underline"
                                            >
                                                View More
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No patients found.</p>
                )}
                {/* Patient Vitals Modal */}
                <PatientVitalsModal 
                    isOpen={isVitalsModalOpen} 
                    onClose={() => setIsVitalsModalOpen(false)} 
                    patient={selectedPatient} 
                />
            </div>
        </div>
    );
};

export default PatientModal;
