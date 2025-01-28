import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { deleteRequest, getRequest, postRequest, putRequest } from "../api/api";

const DepartmentContext = createContext();

const DepartmentProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState(null);
  const [departmentMeta, setDepartmentMeta] = useState();

  const getDepartments = async () => {
    try {
      const response = await getRequest("department");
      setDepartments(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createDepartment = async (value) => {
    try {
      const response= await postRequest(`department`, value);
      if (response.status === 200) {
        toast.success("Department created successfully");
      }
    } catch (err) {
      toast.error("Counld not create department");
      console.log(err);
    } finally {
      getDepartments();
    }
  };

  const deleteDepartment = async () => {
    try {
      const { data } = await deleteRequest(`department/${departmentId}`);
      if (data.status_code === 200) {
        toast.success("Department deleted successfully");
      }
    } catch (err) {
      toast.error("Counld not delete department");
      console.log(err);
    } finally {
      getDepartments();
    }
  };

  const updateDepartment = async (value) => {
    try {
      const response = await putRequest(`department/${departmentId}`, value);
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error("Counld not update department");
      console.log(err);
    } finally {
      getDepartments();
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
