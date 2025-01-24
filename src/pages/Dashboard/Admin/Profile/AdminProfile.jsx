import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { putRequest } from "../../../../api/api";
import Loader from "../../../../components/Loader/Loader";
import { AuthContext } from "../../../../context/AuthContext";

function AdminProfile() {
  const [isEditable, setIsEditable] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (isEditable) {
      try {
        const response = await putRequest(`admin/${user.id}`, formData);
        localStorage.setItem("user", JSON.stringify(response.data.admin));
        setUser(response.data.admin);
      } catch (error) {
        console.error("Error updating Admin data:", error);
      }
    }
    setIsEditable(!isEditable);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await putRequest(`admin/update_password/${user.id}`, {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      console.log("Password changed:", response.data);
    } catch (error) {
      console.error("Error changing password:", error);
    }

    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  if (!user) {
    return <Loader text={"Loading receptionist data..."} />;
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-6">
      <div className="flex gap-[40px] items-center">
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
        <form
          onSubmit={handleUpdateProfile}
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

      <div className="bg-blue-200 rounded-lg shadow-md p-6 w-full max-w-3xl">
        <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center">
          <span className="mr-2">🔑</span> CHANGE PASSWORD
        </h2>
        <form onSubmit={handleUpdatePassword} className="space-y-4">
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
}

export default AdminProfile;
