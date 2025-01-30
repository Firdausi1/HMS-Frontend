import React from 'react';

const AppointmentModal = ({ isOpen, onClose, appointments }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 md:w-3/4 lg:w-2/3">
                <h2 className="text-2xl font-semibold mb-4 text-center">Appointments</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-3 text-left">Patient Name</th>
                                <th className="border border-gray-300 p-3 text-left">Doctor's Name</th>
                                <th className="border border-gray-300 p-3 text-left">Date</th>
                                <th className="border border-gray-300 p-3 text-left">Time</th>
                                <th className="border border-gray-300 p-3 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.length > 0 ? (
                                appointments.map((appointment) => (
                                    <tr key={appointment._id} className="hover:bg-gray-100 transition duration-200">
                                        <td className="border border-gray-300 p-3">{appointment.patient.name}</td>
                                        <td className="border border-gray-300 p-3">{appointment.doctorName}</td>
                                        <td className="border border-gray-300 p-3">{new Date(appointment.date).toLocaleDateString()}</td>
                                        <td className="border border-gray-300 p-3">{appointment.time}</td>
                                        <td className="border border-gray-300 p-3">{appointment.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="border border-gray-300 p-3 text-center">No appointments available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end mt-4">
                    <button 
                        onClick={onClose} 
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentModal;
