import React from 'react';

const PatientVitalsModal = ({ isOpen, onClose, patient }) => {
    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-lg shadow-xl p-8 w-11/12 md:w-3/4 lg:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Patient Information</h2>
                <button 
                    onClick={onClose} 
                    className="text-red-600 hover:underline mb-4 self-center"
                >
                    Close
                </button>
                {patient ? (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700">Patient Details</h3>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Name:</span>
                            <span className="text-gray-600">{patient.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Email:</span>
                            <span className="text-gray-600">{patient.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Phone:</span>
                            <span className="text-gray-600">{patient.phone}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Age:</span>
                            <span className="text-gray-600">{patient.age}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Gender:</span>
                            <span className="text-gray-600">{patient.gender}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Blood Group:</span>
                            <span className="text-gray-600">{patient.bloodGroup}</span>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No patient data available.</p>
                )}
            </div>
        </div>
    );
};

export default PatientVitalsModal;
