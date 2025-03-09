import React, { useState } from 'react';
import axios from 'axios';

const PaymentHistory = () => {
  const [patientId, setPatientId] = useState('');
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/payments/history/${patientId}`);
      setHistory(response.data);
      setError('');
    } catch (err) {
      setError('No payment history found');
      setHistory([]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Payment History</h2>
      <input
        type='text'
        placeholder='Enter Patient ID'
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={fetchHistory}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
      >
        Get History
      </button>
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      {history.length > 0 && (
        <ul className="mt-6">
          {history.map((entry, index) => (
            <li key={index} className="border-b border-gray-300 py-2">
              <span className="font-semibold">Amount:</span> ${entry.amount} - 
              <span className="font-semibold"> Status:</span> {entry.status} - 
              <span className="font-semibold"> Date:</span> {new Date(entry.date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaymentHistory;