import React from 'react';

const QueueModal = ({ isOpen, onClose, queuePatients }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
                <h2 className="text-xl font-semibold mb-4">Patient Queue</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2 text-left">Patient Name</th>
                                <th className="border border-gray-300 p-2 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queuePatients.length > 0 ? (
                                queuePatients.map((patient) => (
                                    <tr key={patient._id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 p-2">{patient.patient_name}</td>
                                        <td className="border border-gray-300 p-2">{new Date(patient.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="border border-gray-300 p-2 text-center">No patients in the queue.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end mt-4">
                    <button 
                        onClick={onClose} 
                        className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QueueModal;
