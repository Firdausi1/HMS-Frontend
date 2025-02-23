import React from "react";
import { useState } from "react";
import { useContext } from "react";
import DeleteModal from "../../../../components/Modal/DeleteModal";
import Pagination from "../../../../components/Pagination/Pagination";
import { EmployeeContext } from "../../../../context/EmployeeContext";
import { formatDepartment } from "../../../../utils/formatDepartment";

function ViewEmployees({ setToggleTab }) {
  const {
    employees,
    setEmployeeId,
    employeeMeta,
    getEmployees,
    deleteEmployee,
    filterByRole,
  } = useContext(EmployeeContext);
  const [showModal, setShowModal] = useState(false);
  const roles = ["Doctor", "Nurse", "Accountant", "Receptionist", "Pharmacist"];

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Employee List</h2>
        <div className="flex items-center">
          <p className="w-full">Filter by:</p>
          <select
            id="departmentId"
            name="departmentId"
            onChange={(e) => filterByRole(e.target.value)}
            className="w-full  p-1 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            {roles?.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 border bg-blue-600 text-white">S/N</th>
            <th className="px-4 py-2 border bg-blue-600 text-white">
              First Name
            </th>
            <th className="px-4 py-2 border bg-blue-600 text-white">
              Last Name
            </th>
            <th className="px-4 py-2 border bg-blue-600 text-white">Email</th>
            <th className="px-4 py-2 border bg-blue-600 text-white">Phone</th>
            <th className="px-4 py-2 border bg-blue-600 text-white">Address</th>
            <th className="px-4 py-2 border bg-blue-600 text-white">Role</th>
            <th className="px-4 py-2 border bg-blue-600 text-white">
              Department
            </th>
            <th className="px-4 py-2 border bg-blue-600 text-white">Options</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((item, index) => (
            <tr key={item.id} className="border text-xs">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{item?.firstName}</td>
              <td className="border px-4 py-2">{item?.lastName}</td>
              <td className="border px-4 py-2">{item?.email}</td>
              <td className="border px-4 py-2">{item?.phone}</td>
              <td className="border px-2 py-2">{item?.address}</td>
              <td className="border px-2 py-2">{item?.role}</td>
              <td className="border px-2 py-2">
                {formatDepartment(item?.departmentId)}
              </td>

              <td className="border px-2 py-4">
                <button
                  className="px-2 py-1 bg-blue-700 text-white rounded-md"
                  onClick={() => {
                    setEmployeeId(item._id);
                    setToggleTab("addEdit");
                  }}
                >
                  Edit
                </button>

                <button
                  className="px-2 py-1 bg-red-500 text-white rounded-md mt-2"
                  onClick={() => {
                    setEmployeeId(item._id);
                    setShowModal(true);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {employeeMeta && (
        <Pagination
          data={employeeMeta}
          next={() => getEmployees(employeeMeta?.currentPage + 1)}
          prev={() => getEmployees(employeeMeta?.currentPage - 1)}
        />
      )}
      {showModal && (
        <DeleteModal
          close={() => setShowModal(false)}
          proceed={() => {
            deleteEmployee();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

export default ViewEmployees;
