import React from 'react';

const AppointmentModal = ({ isOpen, onClose, appointments }) => {
    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-11/12 md:w-3/4">
                <h2 className="text-xl font-semibold mb-4">Appointments List</h2>
                <button onClick={onClose} className="text-red-500 hover:underline mb-4">Close</button>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2 text-left">Appointment ID</th>
                                <th className="border border-gray-300 p-2 text-left">Patient Name</th>
                                <th className="border border-gray-300 p-2 text-left">Date</th>
                                <th className="border border-gray-300 p-2 text-left">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.length > 0 ? (
                                appointments.map((appointment) => (
                                    <tr key={appointment.id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 p-2">{appointment.id}</td>
                                        <td className="border border-gray-300 p-2">{appointment.patientName}</td>
                                        <td className="border border-gray-300 p-2">{appointment.date}</td>
                                        <td className="border border-gray-300 p-2">{appointment.time}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="border border-gray-300 p-2 text-center">No appointments found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AppointmentModal;
