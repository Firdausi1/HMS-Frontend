import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PrescriptionModal from '../components/PrescriptionModal';

const SinglePatient = () => {
    const location = useLocation();
    const { prescriptionId } = location.state || {}; // Access prescriptionId from state
    const { patientId } = useParams(); // Get both patient ID and prescription ID from URL parameters
    console.log('useParams:', { patientId, prescriptionId }); // Log the entire useParams object
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCase, setNewCase] = useState('');
    const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
    const [newPrescription, setNewPrescription] = useState('');
    const [isAdditionalInfoModalOpen, setIsAdditionalInfoModalOpen] = useState(false);
    const [newAdditionalInfo, setNewAdditionalInfo] = useState('');
    const [prescriptions, setPrescriptions] = useState([]); // State to hold prescriptions
    const [prescriptionData, setPrescriptionData] = useState(null); // State to hold the fetched prescription data

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const baseUrl = 'http://localhost:3001/api'; // Define your base URL here
                const patientResponse = await fetch(`${baseUrl}/patients/${patientId}`); // Fetch patient data
                if (patientResponse.ok) {
                    const patientData = await patientResponse.json();
                    setPatient(patientData); // Set the patient data
    
                    // Fetch vitals data by patient ID
                    const vitalsResponse = await fetch(`${baseUrl}/vitals/${patientId}`);
                    if (vitalsResponse.ok) {
                        const vitalsData = await vitalsResponse.json();
                        console.log('Vitals Data:', vitalsData); // Log the vitals data
    
                        // Check if data exists and set it
                        if (vitalsData.success && vitalsData.data.length > 0) {
                            const vitals = vitalsData.data[0]; // Get the first item in the data array
                            setPatient(prevPatient => ({
                                ...prevPatient,
                                vitals: vitals // Set the vitals data
                            }));
                        } else {
                            setError('No vitals data available');
                        }
                    } else {
                        setError('Failed to fetch vitals data');
                    }
                } else {
                    setError('Failed to fetch patient data');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchPatientData();
    }, [patientId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleAddMedicalHistory = () => {
        setIsModalOpen(true);
    };

    const handleSubmitMedicalHistory = () => {
        if (newMedicalHistory) {
            setPatient(prevPatient => ({
                ...prevPatient,
                medicalHistory: [...prevPatient.medicalHistory, newMedicalHistory] // Add the new medical history to the existing history
            }));
            setNewMedicalHistory(''); // Clear the input
            setIsModalOpen(false); // Close the modal
        }
    };

    const handleCloseModal = () => {
        setNewMedicalHistory(''); // Clear the input
        setIsModalOpen(false); // Close the modal
    };

    const handleAddPrescription = () => {
        setIsPrescriptionModalOpen(true);
    };

    const closePrescriptionModal = () => {
        setIsPrescriptionModalOpen(false);
    };

    const handleViewPreviousPrescriptions = async () => {
        console.log('Prescription ID:', prescriptionId); // Log the prescriptionId

        if (!prescriptionId) { // Check for prescriptionId instead of patientId
            alert('Prescription ID is not defined');
            return; // Exit the function if the prescription ID is not valid
        }

        try {
            const baseUrl = 'http://localhost:3001/api';
            const response = await fetch(`${baseUrl}/patientPrescriptions/${prescriptionId}`); // Updated route
            if (response.ok) {
                const prescriptionsData = await response.json();
                console.log('Previous Prescriptions:', prescriptionsData);
                setPrescriptionData(prescriptionsData.data);
                setIsPrescriptionModalOpen(true);
            } else {
                alert('Failed to fetch previous prescriptions');
            }
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    const handleAddAdditionalInfo = () => {
        setIsAdditionalInfoModalOpen(true); // Open the additional information modal
    };

    const handleSubmitAdditionalInfo = () => {
        if (newAdditionalInfo) {
            setPatient(prevPatient => ({
                ...prevPatient,
                additionalInfo: newAdditionalInfo // Set the new additional information
            }));
            setNewAdditionalInfo(''); // Clear the input
            setIsAdditionalInfoModalOpen(false); // Close the modal
        }
    };

    const handleCloseAdditionalInfoModal = () => {
        setNewAdditionalInfo(''); // Clear the input
        setIsAdditionalInfoModalOpen(false); // Close the modal
    };

    const handleViewPrescriptionDetails = async (prescriptionId) => {
        console.log('Prescription ID:', prescriptionId); // Log the prescriptionId

        if (!prescriptionId) {
            alert('Prescription ID is not defined');
            return; // Exit the function if the prescription ID is not valid
        }

        try {
            const baseUrl = 'http://localhost:3001/api';
            const response = await fetch(`${baseUrl}/patientPrescriptions/${prescriptionId}`); // Fetch specific prescription
            if (response.ok) {
                const prescriptionData = await response.json();
                console.log('Prescription Details:', prescriptionData);
                // Handle the prescription data as needed
            } else {
                alert('Failed to fetch prescription details');
            }
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Patient Details</h1>
            {patient && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Name: {patient.name}</h2>
                    <p className="text-gray-600">ID: {patient._id}</p>
                    <p className="text-gray-600">Updated At: {new Date(patient.updatedAt).toLocaleString()}</p>

                    {/* Patient Information */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">Basic Information</h2>
                        <p><strong>Email:</strong> {patient.email}</p>
                        <p><strong>Gender:</strong> {patient.gender}</p>
                        <p><strong>Blood Group:</strong> {patient.bloodGroup}</p>
                        <p><strong>Age:</strong> {patient.age}</p>
                        <p><strong>Phone:</strong> {patient.phone}</p>
                        <p><strong>Address:</strong> {patient.address || 'No address available.'}</p>
                    </div>

                    {/* Vitals */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">Vitals</h2>
                        {patient.vitals ? (
                            <ul className="list-disc ml-4">
                                {patient.vitals.bloodPressure && (
                                    <li>
                                        <strong>Blood Pressure:</strong> {patient.vitals.bloodPressure.systolic}/{patient.vitals.bloodPressure.diastolic} mmHg
                                    </li>
                                )}
                                {patient.vitals.heartRate && (
                                    <li><strong>Heart Rate:</strong> {patient.vitals.heartRate} bpm</li>
                                )}
                                {patient.vitals.temperature && (
                                    <li><strong>Temperature:</strong> {patient.vitals.temperature} °C</li>
                                )}
                                {patient.vitals.respiratoryRate && (
                                    <li><strong>Respiratory Rate:</strong> {patient.vitals.respiratoryRate} breaths/min</li>
                                )}
                                {patient.vitals.oxygenSaturation && (
                                    <li><strong>Oxygen Saturation:</strong> {patient.vitals.oxygenSaturation} %</li>
                                )}
                                {patient.vitals.notes && (
                                    <li><strong>Notes:</strong> {patient.vitals.notes}</li>
                                )}
                                {patient.vitals.nurse && patient.vitals.nurse.full_name && (
                                    <li><strong>Nurse:</strong> {patient.vitals.nurse.full_name}</li>
                                )}
                            </ul>
                        ) : (
                            <p>No vitals available.</p>
                        )}
                    </div>

                    {/* Medicals */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">Medical History</h2>
                        {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
                            <ul className="list-disc ml-4">
                                {patient.medicalHistory.map((medicalItem, index) => (
                                    <li key={index}>{medicalItem}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No Medical history available.</p>
                        )}
                        <button 
                            onClick={handleAddMedicalHistory} 
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Add Medical History
                        </button>
                    </div>

                    {/* Prescriptions */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">Prescriptions</h2>
                        {patient.prescriptions && patient.prescriptions.length > 0 ? (
                            <ul className="list-disc ml-4">
                                {patient.prescriptions.map((prescription, index) => (
                                    <li key={index} onClick={() => handleViewPrescriptionDetails(prescription._id)}>
                                        {prescription}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No prescriptions available.</p>
                        )}
                        <div className="mt-4">
                            <button 
                                onClick={handleAddPrescription} 
                                className="mr-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Add Prescription
                            </button>
                            <button 
                                onClick={handleViewPreviousPrescriptions} 
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                View Previous Prescriptions
                            </button>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">Additional Information</h2>
                        <p>{patient.additionalInfo || 'No additional information available.'}</p>
                        <button 
                            onClick={handleAddAdditionalInfo} 
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Add Additional Information
                        </button>
                    </div>

                    {prescriptionData && (
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold">Prescription Details</h2>
                            <p><strong>Prescription ID:</strong> {prescriptionData._id}</p>
                            <p><strong>Patient Name:</strong> {prescriptionData.patient.name}</p>
                            <p><strong>Notes:</strong> {prescriptionData.notes}</p>
                            <p><strong>Date:</strong> {new Date(prescriptionData.date).toLocaleDateString()}</p>
                            <h3 className="font-semibold">Medications:</h3>
                            <ul className="list-disc ml-4">
                                {prescriptionData.medications.map((medication) => (
                                    <li key={medication._id}>
                                        <strong>{medication.medication.name}</strong> - {medication._id}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Add New Medical</h2>
                        <input 
                            type="text" 
                            value={newCase} 
                            onChange={(e) => setNewMedical(e.target.value)} 
                            className="border border-gray-300 p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter medical details"
                        />
                        <div className="flex justify-end">
                            <button 
                                onClick={handleCloseModal} 
                                className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSubmitMedicalHistory} 
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isPrescriptionModalOpen && prescriptionData && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Prescription Details</h2>
                        <p><strong>Prescription ID:</strong> {prescriptionData._id}</p>
                        <p><strong>Patient Name:</strong> {prescriptionData.patient.name}</p>
                        <p><strong>Notes:</strong> {prescriptionData.notes}</p>
                        <p><strong>Date:</strong> {new Date(prescriptionData.date).toLocaleDateString()}</p>
                        <h3 className="font-semibold mt-4">Medications:</h3>
                        <ul className="list-disc ml-4">
                            {prescriptionData.medications.map((medication) => (
                                <li key={medication._id}>
                                    <strong>{medication.medication.name}</strong> - {medication._id}
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-end mt-4">
                            <button 
                                onClick={() => setIsPrescriptionModalOpen(false)} 
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <PrescriptionModal 
                isOpen={isPrescriptionModalOpen} 
                onClose={closePrescriptionModal} 
                patientName={patient ? patient.name : ''}
            />

            {isAdditionalInfoModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Add Additional Information</h2>
                        <textarea 
                            value={newAdditionalInfo} 
                            onChange={(e) => setNewAdditionalInfo(e.target.value)} 
                            className="border border-gray-300 p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter additional information"
                            rows="4"
                        />
                        <div className="flex justify-end">
                            <button 
                                onClick={handleCloseAdditionalInfoModal} 
                                className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSubmitAdditionalInfo} 
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SinglePatient;
