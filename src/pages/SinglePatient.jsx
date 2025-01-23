import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SinglePatient = () => {
    const { patientId } = useParams(); // Get the patient ID from the URL
    const [patient, setPatient] = useState(null); // State to store patient data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/patients/${patientId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch patient data');
                }
                const data = await response.json();
                setPatient(data); // Set the patient data
            } catch (err) {
                setError(err.message); // Set error message
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchPatient();
    }, [patientId]);

    if (loading) return <div>Loading...</div>; // Show loading state
    if (error) return <div>Error: {error}</div>; // Show error message

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Patient Details</h1>
            {patient ? (
                <div>
                    <h2 className="text-xl">Name: {patient.name}</h2>
                    <p>Email: {patient.email}</p>
                    <p>Phone: {patient.phone}</p>
                    {/* Add more patient details as needed */}
                </div>
            ) : (
                <p>No patient found.</p>
            )}
        </div>
    );
};

export default SinglePatient;
