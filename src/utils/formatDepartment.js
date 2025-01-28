import { useContext } from "react";
import { DepartmentContext } from "../context/DepartmentContext";

const formatDepartment = (id) => {
  const { departments } = useContext(DepartmentContext);
  const department = departments.find((item) => item?.id === id).name;
  return department;
};

export { formatDepartment };
