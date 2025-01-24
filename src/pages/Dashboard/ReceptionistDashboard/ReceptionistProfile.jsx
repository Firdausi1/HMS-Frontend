import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { putRequest } from "../../../api/api";

const ReceptionistProfile = () => {
  const [isEditable, setIsEditable] = useState(false); // Track if the form is in editable mode
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
  });

  // Password change fields
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch receptionist data
  // useEffect(() => {
  //   const fetchReceptionistData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3001/api/receptionist"
  //       );
  //       const data = response.data[0]; // Assuming it's an array and we want the first item
  //       setReceptionist(data);
  //       setFormData({
  //         first_name: data.first_name,
  //         last_name: data.last_name,
  //         email: data.email,
  //         phone: data.phone || "",
  //         address: data.address || "",
  //       });
  //     } catch (error) {
  //       console.error("Error fetching receptionist data:", error);
  //     }
  //   };

  //   fetchReceptionistData();
  // }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();

    // If form is editable, submit the data and show alert
    if (isEditable) {
      try {
        const response = await putRequest(`employee/${user.id}`, formData);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setUser(response.data.data); // Update state with new data
        alert("Receptionist updated!"); // Show success alert
      } catch (error) {
        console.error("Error updating receptionist data:", error);
      }
    }

    // Toggle editable mode after submit
    setIsEditable(!isEditable);
  };

  // const handlePasswordSubmit = async (event) => {
  //   event.preventDefault();  // Prevent page reload

  //   const { oldPassword, newPassword, confirmPassword } = passwordData;

  //   // Basic validation
  //   if (newPassword !== confirmPassword) {
  //     alert("New passwords do not match.");
  //     return;
  //   }

  //   const data = {
  //     oldPassword: oldPassword,
  //     newPassword: newPassword,
  //     confirmPassword: confirmPassword,
  //   };

  //   try {
  //     const response = await axios.put(
  //       `http://localhost:5000/receptionist/${receptionist._id}`,
  //       data
  //     );
  //     console.log("password updated:", response.data);
  //     alert("Password changed successfully");
  //     setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });  // Clear form data
  //   } catch (error) {
  //     console.error("Error changing password:", error);
  //     alert("An error occurred while updating the information.");
  //   }
  // };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Check if the new password and confirm password match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await axios.put(
        `employee/update_password/${user.id}`,
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        }
      );
      console.log("Password changed:", response.data);
      alert("Password changed!"); // Show success alert
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password!");
    }

    // Clear password fields
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // Return loader if data is not yet fetched
  if (!user) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <p className="text-lg text-gray-700">Loading receptionist data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-6">
      <div className="flex gap-[40px] items-center">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white w-60 h-60 rounded-full flex items-center justify-center shadow-md">
            <div className="text-center">
              <p className="font-bold text-lg text-gray-700">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Receptionist Profile Section */}
        <form
          onSubmit={handleSubmitProfile}
          className="bg-blue-200 rounded-lg shadow-md p-6 w-[500px] max-w-lg mb-8"
        >
          <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center">
            <span className="mr-2">⚙️</span> PROFILE
          </h2>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData?.firstName}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData?.lastName}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData?.email || ""}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData?.phone || "Not available"}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                className="w-full px-2 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData?.address || "Not available"}
                onChange={handleInputChange}
                readOnly={!isEditable}
              />
            </div>
          </div>
          <div>
            {isEditable ? (
              <button
                type="submit"
                className="mt-4 w-[20%] py-2 bg-blue-700 text-white rounded-md font-semibold hover:bg-blue-600 transition"
              >
                Save Changes
              </button>
            ) : (
              <button className="mt-4 w-[20%] py-2 bg-blue-700 text-white rounded-md font-semibold hover:bg-blue-600 transition">
                Update
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Password Change Section */}
      <div className="bg-blue-200 rounded-lg shadow-md p-6 w-full max-w-3xl">
        <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center">
          <span className="mr-2">🔑</span> CHANGE PASSWORD
        </h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-[20%] py-2 bg-blue-700 text-white rounded-md font-semibold hover:bg-blue-600 transition"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReceptionistProfile;
