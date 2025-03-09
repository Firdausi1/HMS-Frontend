import React from 'react';
import { useNavigate } from 'react-router-dom';

const QueueModal = ({ isOpen, onClose, queuePatients }) => {
    const navigate = useNavigate();
    const handleAttend = (patient) => {
        console.log(`Navigating to patientId: ${patient._id}, prescriptionId: ${patient.prescriptionId}`);
        navigate(`/patients/${patient?.patient._id}`, { state: { prescriptionId: patient.prescriptionId } });
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full md:w-3/4 lg:w-2/3">
                <h2 className="text-xl font-semibold mb-4">Patient Queue</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="border border-gray-300 p-4 text-left text-lg">Patient Name</th>
                                <th className="border border-gray-300 p-4 text-left text-lg">Patient ID</th>
                                <th className="border border-gray-300 p-4 text-left text-lg">Date</th>
                                <th className="border border-gray-300 p-4 text-left text-lg">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queuePatients.length > 0 ? (
                                queuePatients.map((patient) => (
                                    <tr key={patient._id} className="hover:bg-blue-100 transition duration-200">
                                        <td className="border border-gray-300 p-4 text-lg">{patient.patient_name}</td>
                                        <td className="border border-gray-300 p-4 text-lg">{patient._id}</td>
                                        <td className="border border-gray-300 p-4 text-lg">{new Date(patient.createdAt).toLocaleDateString()}</td>
                                        <td className="border border-gray-300 p-4 text-lg">
                                            <button 
                                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
                                                onClick={() => handleAttend(patient)} 
                                            >
                                                Attend
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="border border-gray-300 p-2 text-center">No patients in the queue.</td>
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
