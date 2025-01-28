import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QueueModal = ({ isOpen, onClose, queuePatients }) => {
    const navigate = useNavigate();
    const [selectedPatientId, setSelectedPatientId] = useState(''); // Store selected patient ID

    if (!isOpen) return null;

    const handlePatientSelection = (event) => {
        setSelectedPatientId(event.target.value); // Update selected patient ID
    };

    const handleOkClick = () => {
        if (selectedPatientId) {
            navigate(`/patients/${selectedPatientId}`); // Navigate to SinglePatient with selected ID
        } else {
            alert('Please select a patient first.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
                <h2 className="text-xl font-semibold mb-4">Select Patient</h2>
                <div className="overflow-x-auto">
                    <select
                        className="border border-gray-300 p-2 w-full"
                        value={selectedPatientId}
                        onChange={handlePatientSelection}
                    >
                        <option value="">Select a patient</option>
                        {queuePatients.length > 0 ? (
                            queuePatients.map((patient) => (
                                <option key={patient._id} value={patient._id}>
                                    {patient.patient_name} - {new Date(patient.createdAt).toLocaleDateString()}
                                </option>
                            ))
                        ) : (
                            <option disabled>No patients in the queue.</option>
                        )}
                    </select>
                </div>
                <div className="flex justify-end mt-4 gap-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleOkClick}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                        Ok
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QueueModal;
