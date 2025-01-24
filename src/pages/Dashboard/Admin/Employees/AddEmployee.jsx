import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { postRequest, putRequest } from "../../../../api/api";
import { DepartmentContext } from "../../../../context/DepartmentContext";
import { EmployeeContext } from "../../../../context/EmployeeContext";
import { formatDepartment } from "../../../../utils/formatDepartment";

function AddEmployee({ setToggleTab }) {
  const {
    getEmployees,
    employeeId,
    employees,
    createEmployee,
    updateEmployee,
  } = useContext(EmployeeContext);
  const { departments } = useContext(DepartmentContext);
  const roles = ["Doctor", "Nurse", "Accountant", "Receptionist", "Pharmacist"];
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    departmentId: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    departmentId: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      role: "",
      departmentId: "",
      password: "",
    });

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^\d{11}$/;

    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    else if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Enter a valid phone number (10 digits).";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.departmentId)
      newErrors.departmentId = "Department is required.";
    if (!formData.password && !employeeId)
      newErrors.password = "Password is required.";
    if (!formData.role) newErrors.role = "Role is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (employeeId) {
        updateEmployee(formData);
      } else {
        createEmployee(formData);
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        role: "",
        departmentId: "",
        password: "",
      });
    } catch (error) {
      console.error(
        "Error registering employee:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setToggleTab("employee");
      getEmployees(1);
    }
  };

  useEffect(() => {
    if (employeeId) {
      const newEmployee = employees.find((i) => i._id === employeeId);
      setFormData(newEmployee);
    }
  }, [employeeId]);
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="bg-blue-100 w-[600px] p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          {employeeId ? "EDIT" : "ADD"} EMPLOYEE
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-md font-medium text-blue-800"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter first name"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm">{errors.firstName}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-md font-medium text-blue-800"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter last name"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm">{errors.lastName}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-md font-medium text-blue-800"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="departmentId"
              className="block text-md font-medium text-blue-800"
            >
              Department
            </label>
            <select
              id="departmentId"
              name="departmentId"
              value={formData?.departmentId}
              onChange={handleInputChange}
              className="w-full mt-2 p-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              {departments?.map((item) => (
                <option value={item?.id} key={item.id}>
                  {item?.name}
                </option>
              ))}
            </select>
            {errors.departmentId && (
              <p className="text-red-600 text-sm">{errors.departmentId}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-md font-medium text-blue-800"
            >
              Employee Role
            </label>
            <select
              id="role"
              name="role"
              value={formData?.role}
              onChange={handleInputChange}
              className="w-full mt-2 p-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Employee position</option>
              {roles?.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="text-red-600 text-sm">{errors.role}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-md font-medium text-blue-800"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData?.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="text-red-600 text-sm">{errors.phone}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-md font-medium text-blue-800"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter address"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && (
              <p className="text-red-600 text-sm">{errors.address}</p>
            )}
          </div>
          {!employeeId && (
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-md font-medium text-blue-800"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-600 text-sm">{errors.password}</p>
              )}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-900 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
