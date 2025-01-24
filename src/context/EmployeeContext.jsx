import React, { createContext, useState, useEffect } from "react";
import { deleteRequest, getRequest, postRequest, putRequest } from "../api/api";

const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeMeta, setEmployeeMeta] = useState();

  const getEmployees = async (page) => {
    try {
      const { data } = await getRequest(`employee?page=${page}`);
      setEmployees(data.data);
      setEmployeeMeta(data.pagination);
    } catch (err) {
      console.log(err);
    }
  };

  const createEmployee = async (value) => {
    try {
      const { data } = await postRequest(`employee/register`, value);
      getEmployees(1);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEmployee = async () => {
    try {
      const { data } = await deleteRequest(`employee/${employeeId}`);
      console.log(data);
      getEmployees(1);
    } catch (err) {
      console.log(err);
    }
  };

  const updateEmployee = async (value) => {
    try {
      const { data } = await putRequest(`employee/${employeeId}`, value);
      getEmployees(1);
    } catch (err) {
      console.log(err);
    }
  };

  const filterByRole = async (value) => {
    try {
      if (value === "Doctor") {
        const { data } = await getRequest(`doctor`);
        setEmployees(data);
        // setEmployeeMeta(data.pagination);
      } else if (value === "Nurse") {
        const { data } = await getRequest(`nurse`);
        setEmployees(data);
        // setEmployees(data.data);
        // setEmployeeMeta(data.pagination);
      } else if (value === "Accountant") {
        const { data } = await getRequest(`accountant`);
        setEmployees(data);
        // setEmployees(data.data);
        // setEmployeeMeta(data.pagination);
      } else if (value === "Receptionist") {
        const { data } = await getRequest(`receptionist`);
        setEmployees(data);
        // setEmployees(data.data);
        // setEmployeeMeta(data.pagination);
      } else if (value === "Pharmacist") {
        const { data } = await getRequest(`pharmacist`);
        setEmployees(data.data);
        // setEmployees(data.data);
        // setEmployeeMeta(data.pagination);
      } else {
        getEmployees(1)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        getEmployees,
        employeeId,
        setEmployeeId,
        updateEmployee,
        employeeMeta,
        deleteEmployee,
        createEmployee,
        filterByRole,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeContext, EmployeeProvider };
