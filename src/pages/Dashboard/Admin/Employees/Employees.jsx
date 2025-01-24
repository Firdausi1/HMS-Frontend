import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { postRequest } from "../../../../api/api";
import Loader from "../../../../components/Loader/Loader";
import { DepartmentContext } from "../../../../context/DepartmentContext";
import { EmployeeContext } from "../../../../context/EmployeeContext";
import AddEmployee from "./AddEmployee";
import ViewEmployees from "./ViewEmployees";

const Employees = () => {
  const { getEmployees, setEmployeeId, employeeMeta, employees } =
    useContext(EmployeeContext);
  const { getDepartments } = useContext(DepartmentContext);
  const [toggleTab, setToggleTab] = useState("employee");

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/patients/${id}`
      );
      if (response.data) {
        setPatients((prevPatients) =>
          prevPatients.filter((patient) => patient._id !== id)
        );
        alert("Patient deleted successfully!");
      } else {
        alert("Failed to delete patient.");
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Failed to delete patient.");
    }
  };

  useEffect(() => {
    getEmployees(employeeMeta?.currentPage);
    getDepartments();
  }, []);
  if (!employees) {
    return <Loader text={"Loading Employees..."} />;
  }
  return (
    <div className="p-6">
      {/* Header Buttons */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            toggleTab === "employee"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-700"
          }`}
          onClick={() => {
            setToggleTab("employee");
            setEmployeeId(null);
          }}
        >
          Employees
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            toggleTab === "addEdit"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-700"
          }`}
          onClick={() => {
            setToggleTab("addEdit");
          }}
        >
          Add Employee
        </button>
      </div>

      {toggleTab === "employee" ? (
        <ViewEmployees setToggleTab={setToggleTab} />
      ) : (
        <AddEmployee setToggleTab={setToggleTab} />
      )}
    </div>
  );
};

export default Employees;
