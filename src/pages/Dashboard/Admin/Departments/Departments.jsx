import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import Loader from "../../../../components/Loader/Loader";
import { DepartmentContext } from "../../../../context/DepartmentContext";
import AddDepartment from "./AddDepartment";
import ViewDepartments from "./ViewDepartments";

function Departments() {
  const { getDepartments, setDepartmentId, departments } =
    useContext(DepartmentContext);
  const [toggleTab, setToggleTab] = useState("department");

  useEffect(() => {
    getDepartments();
  }, []);
  
  if (!departments) {
    return <Loader text={"Loading Departments..."} />;
  }
  return (
    <div className="p-6">
      {/* Header Buttons */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            toggleTab === "department"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-700"
          }`}
          onClick={() => {
            setToggleTab("department");
            setDepartmentId(null);
          }}
        >
          Departments
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
          Add Department
        </button>
      </div>

      {toggleTab === "department" ? (
        <ViewDepartments setToggleTab={setToggleTab} />
      ) : (
        <AddDepartment setToggleTab={setToggleTab} />
      )}
    </div>
  );
}

export default Departments;
