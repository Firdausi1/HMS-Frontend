import React, { createContext, useState, useEffect } from "react";
import { deleteRequest, getRequest, postRequest, putRequest } from "../api/api";

const DepartmentContext = createContext();

const DepartmentProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState(null);
  const [departmentMeta, setDepartmentMeta] = useState();

  const getDepartments = async () => {
    try {
      const { data } = await getRequest("department");
      setDepartments(data);
    } catch (err) {
      console.log(err);
    }
  };

  const createDepartment = async (value) => {
    try {
      const { data } = await postRequest(`department`, value);
      console.log(data);
      getDepartments();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDepartment = async () => {
    try {
      const { data } = await deleteRequest(`department/${departmentId}`);
      console.log(data);
      getDepartments();
    } catch (err) {
      console.log(err);
    }
  };

  const updateDepartment = async (value) => {
    try {
      const { data } = await putRequest(`department/${departmentId}`, value);
      getDepartments();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DepartmentContext.Provider
      value={{
        getDepartments,
        departments,
        departmentId,
        updateDepartment,
        deleteDepartment,
        setDepartmentId,
        createDepartment,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
};

export { DepartmentContext, DepartmentProvider };
