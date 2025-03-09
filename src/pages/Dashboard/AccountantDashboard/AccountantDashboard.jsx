import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import AccountantSideBar from './AccountantSidebar'; // Import the SideBar component

function AccountantDashboard() {
    const { user, logout } = useContext(AuthContext); // Access the doctor's first name and logout function from context
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        if (!user) {
            // navigate('/'); // Redirect to login if not logged in
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout(); // Call the logout function from context
        navigate('/'); // Navigate back to the login page
    };


    return (
        <div className="min-h-screen bg-gray-100 p-6 flex gap-3">
            <AccountantSideBar 
            />

            <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Welcome, {user ? user.firstName : 'Name'}</h1>
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Card for View Invoice */}
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Payment</h3>
                        <p>View and manage Patient Prescription.</p>
                        <button 
                            onClick={() => {}} 
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            View Prescription
                        </button>
                    </div>

                    {/* Card for New Invoice */}
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">New Invoice</h3>
                        <p>Manage New Invoice.</p>
                        <button 
                            onClick={() => {}} // Open queue modal
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            New Invoice
                        </button>
                    </div>

                    {/* Card for View Payments */}
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Payments</h3>
                        <p>View and manage payments.</p>
                        <button 
                            onClick={() => {}} 
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                           View Payments
                        </button>
                    </div>

                    {/* Card for Profile */}
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Profile</h3>
                        <p>Manage your profile.</p>
                        <button 
                            onClick={() => navigate('/accountant-profile')} // Navigate to AccountantProfile
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Profile
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AccountantDashboard;
