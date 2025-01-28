import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/AuthContext'; // Import the context

function AccountantLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook for navigation
    const { setAccountant } = useUser(); // Get the setAccountant function from context

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/employee/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('API Response:', result); // Log the entire response
                console.log('Accountant first name set to:', result.data.firstName); // Access firstName from data
                setDoctor(result.data.firstName); // Set the first name in context
                
                // Store accountant's information in local storage
                localStorage.setItem('accountant', JSON.stringify(result.data));

                navigate('/AccountantDashboard');
            } else {
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-blue-300">
            <form className="bg-white p-10 rounded-lg shadow-lg w-96" onSubmit={handleLogin}>
                <h2 className="text-3xl mb-6 text-center text-gray-800 font-semibold">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="shadow-md appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className="shadow-md appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-200"
                >
                    Login
                </button>
                <p className="mt-4 text-center text-gray-600">
                    Don't have an account? <Link to="/AccountantRegister" className="text-blue-500 hover:underline">Sign up</Link>
                </p>
            </form>
        </div>
    );
}

export default AccountantLogin;