import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { deleteRequest, getRequest, postRequest, putRequest } from "../api/api";

const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeMeta, setEmployeeMeta] = useState();
  const [patientId, setPatientId] = useState();

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
      const response = await postRequest(`employee/register`, value);
      if (response.status === 200) {
        toast.success("Employee created successfully");
      }
    } catch (err) {
      toast.error("Count not create employee");
      console.log(err);
    } finally {
      getEmployees(1);
    }
  };

  const deleteEmployee = async () => {
    try {
      const { data } = await deleteRequest(`employee/${employeeId}`);
      if (data.status_code === 200) {
        toast.success("Employee deleted successfully");
      }
    } catch (err) {
      toast.error("Counld not delete employee record");
      console.log(err);
    } finally {
      getEmployees(1);
    }
  };

  const updateEmployee = async (value) => {
    try {
      const response = await putRequest(`employee/${employeeId}`, value);
      if (response.status === 200) {
        toast.success("Employee updated successfully");
      }
    } catch (err) {
      toast.error("Counld not update employee record");
      console.log(err);
    } finally {
      getEmployees(1);
    }
  };

  const filterByRole = async (value) => {
    try {
      if (value === "Doctor") {
        const { data } = await getRequest(`doctor`);
        setEmployees(data);
      } else if (value === "Nurse") {
        const { data } = await getRequest(`nurse`);
        setEmployees(data);
      } else if (value === "Accountant") {
        const { data } = await getRequest(`accountant`);
        setEmployees(data);
      } else if (value === "Receptionist") {
        const { data } = await getRequest(`receptionist`);
        setEmployees(data);
      } else if (value === "Pharmacist") {
        const { data } = await getRequest(`pharmacist`);
        setEmployees(data.data);
      } else {
        getEmployees(1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deletePatient = async () => {
    try {
      const { data } = await deleteRequest(`patient/${patientId}`);
      if (data.status_code === 200) {
        toast.success("Patient deleted successfully");
      }
    } catch (err) {
      toast.error("Counld not delete patient record");
      console.log(err);
    }
    // finally {
    //   getEmployees(1);
    // }
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
        patientId,
        setPatientId,
        deletePatient,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeContext, EmployeeProvider };
