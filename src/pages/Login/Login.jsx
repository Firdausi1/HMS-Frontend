import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../api/api";
import { AuthContext } from "../../context/AuthContext"; // Import the context

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation
  const { setUser } = useContext(AuthContext); // Get the setDoctor function from context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await postRequest("employee/login", {
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setUser(response.data.data);
        if (response.data.data.role === "Doctor") {
          navigate("/doctor");
        } else if (response.data.data.role === "Receptionist") {
          navigate("/receptionist");
        } else if (response.data.data.role === "Nurse") {
          navigate("/nurse");
        } else if (response.data.data.role === "Pharmacist") {
          navigate("/pharmacist");
        } else if (response.data.data.role === "Accountant") {
          navigate("/accountant");
        }
      } else {
        // Handle login error
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-blue-300">
      <form
        className="bg-white p-10 rounded-lg shadow-lg w-96"
        onSubmit={handleLogin}
      >
        <h2 className="text-3xl mb-6 text-center text-gray-800 font-semibold">
          Login
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
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
      </form>
    </div>
  );
}

export default Login;
