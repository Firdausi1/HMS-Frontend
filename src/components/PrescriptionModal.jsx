import React, { useState } from 'react';

const PrescriptionModal = ({ isOpen, onClose, patientName }) => {
    const [patient, setPatient] = useState(patientName);
    const [caseHistory, setCaseHistory] = useState('');
    const [ailment, setAilment] = useState('');
    const [medication, setMedication] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({
            patient,
            caseHistory,
            ailment,
            medication,
            amount,
            date,
        });
        onClose(); // Close the modal after submission
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
                <h2 className="text-xl font-semibold mb-4">Manage Prescriptions</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Patient Name</label>
                        <input 
                            type="text" 
                            value={patient} 
                            onChange={(e) => setPatient(e.target.value)} 
                            className="mt-1 block w-full border border-gray-300 rounded p-2" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Case History</label>
                        <textarea 
                            value={caseHistory} 
                            onChange={(e) => setCaseHistory(e.target.value)} 
                            className="mt-1 block w-full border border-gray-300 rounded p-2" 
                            rows="2" 
                            required 
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Ailment/Description</label>
                        <textarea 
                            value={ailment} 
                            onChange={(e) => setAilment(e.target.value)} 
                            className="mt-1 block w-full border border-gray-300 rounded p-2" 
                            rows="2" 
                            required 
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Medication</label>
                        <input 
                            type="text" 
                            value={medication} 
                            onChange={(e) => setMedication(e.target.value)} 
                            className="mt-1 block w-full border border-gray-300 rounded p-2" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Amount</label>
                        <input 
                            type="number" 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                            className="mt-1 block w-full border border-gray-300 rounded p-2" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Date</label>
                        <input 
                            type="date" 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                            className="mt-1 block w-full border border-gray-300 rounded p-2" 
                            required 
                        />
                    </div>
                    <div className="flex justify-end">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Save Prescription
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PrescriptionModal;
