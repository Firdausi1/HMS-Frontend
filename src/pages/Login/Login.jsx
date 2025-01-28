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
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://img.freepik.com/free-photo/portrait-happy-african-american-woman-surgeon-standing-operating-room-ready-work-patient-female-medical-worker-surgical-uniform-operation-theater_657921-38.jpg?ga=GA1.1.1223372785.1726203975")',
      }}
    >
      <div className="relative bg-white bg-opacity-20 backdrop-blur-md rounded-2xl shadow-xl px-8 w-96 pb-6 z-10 mt-[190px] border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          HOSPITAL MANAGEMENT SYSTEM
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="bg-white bg-opacity-30 border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-opacity-50"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="bg-white bg-opacity-30 border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-opacity-50"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full transition duration-200 shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

