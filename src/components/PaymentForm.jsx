import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

const PaymentForm = () => {
  const [patientId, setPatientId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const response = await axios.post('http://localhost:5000/api/payments/pay', {
        patientId,
        amount,
        token: 'test-token' // Replace with actual token from Stripe Checkout
      });
      
      setMessage('Payment successful!');
    } catch (error) {
      setMessage('Payment failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Process Payment</h2>
      <input
        type="text"
        placeholder="Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handlePayment}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
      >
        Pay Now
      </button>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default PaymentForm;