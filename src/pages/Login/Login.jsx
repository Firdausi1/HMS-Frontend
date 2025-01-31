import React, { useState } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
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
      console.log(response);
      if (response.status === 201) {
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
        toast.success("Login Successful");
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      toast.error("Invalid Email or Password");
      console.error("Error during login:", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://img.freepik.com/free-psd/entrance-emergency-room-hospital-generative-ai_587448-2057.jpg?t=st=1738234507~exp=1738238107~hmac=f8f2b0ddc5701b9146a80ba8aba3edb61ce0134aa05b0e46c3c5648d95fc21fc&w=1060")',
      }}
    >
      <div className="relative bg-white bg-opacity-20 backdrop-blur-md rounded-2xl shadow-xl px-8 w-96 pb-6 z-10 mt-[190px] border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-white mb-6 uppercase">
        Jeffkinson Hospital 
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
            className="bg-[#0c5e85] hover:bg-[#4085ae] text-white font-bold py-2 px-4 rounded-lg w-full transition duration-200 shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

