import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { DepartmentContext } from "../../../../context/DepartmentContext";

function AddDepartment({ setToggleTab }) {
  const {
    departments,
    departmentId,
    updateDepartment,
    createDepartment,
    getDepartments,
  } = useContext(DepartmentContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
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
      name: "",
      description: "",
    });

    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (departmentId) {
        updateDepartment(formData);
      } else {
        createDepartment(formData);
      }

      setFormData({
        name: "",
        description: "",
      });
    } catch (error) {
      console.error(
        "Error registering department:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setToggleTab("department");
      getDepartments();
    }
  };

  useEffect(() => {
    if (departmentId) {
      const department = departments.find((i) => i._id === departmentId);
      setFormData(department);
    }
  }, [departmentId]);
  return (
    <div className="flex justify-center">
      <div className="bg-blue-100 w-[600px] p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          {departmentId ? "EDIT" : "ADD"} DEPARTMENT
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-md font-medium text-blue-800"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData?.name}
              onChange={handleInputChange}
              placeholder="Enter name"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-md font-medium text-blue-800"
            >
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              value={formData?.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="text-red-600 text-sm">{errors.description}</p>
            )}
          </div>

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

export default AddDepartment;
