import React from "react";
import { useState } from "react";
import { useContext } from "react";
import DeleteModal from "../../../../components/Modal/DeleteModal";
import { DepartmentContext } from "../../../../context/DepartmentContext";

function ViewDepartments({ setToggleTab }) {
  const { departments, setDepartmentId, deleteDepartment } =
    useContext(DepartmentContext);
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Department List
        </h2>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border bg-blue-600 text-white">S/N</th>
            <th className="px-4 py-2 border bg-blue-600 text-white">Name</th>
            <th className="px-4 py-2 border bg-blue-600 text-white">
              Description
            </th>
            <th className="px-4 py-2 border bg-blue-600 text-white">Options</th>
          </tr>
        </thead>
        <tbody>
          {departments?.map((item, index) => (
            <tr key={item.id} className="border">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{item?.name}</td>
              <td className="border px-4 py-2">{item?.description}</td>

              <td className="border px-2 py-4">
                <button
                  className="px-2 py-1 bg-blue-700 text-white rounded-md"
                  onClick={() => {
                    setDepartmentId(item.id);
                    setToggleTab("addEdit");
                  }}
                >
                  Edit
                </button>

                <button
                  className="px-2 py-1 bg-red-500 text-white rounded-md ml-2"
                  onClick={() => {
                    setDepartmentId(item.id);
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
      {/* <Pagination
        data={employeeMeta}
        next={() => getEmployees(employeeMeta?.currentPage + 1)}
        prev={() => getEmployees(employeeMeta?.currentPage - 1)}
      /> */}
      {showModal && (
        <DeleteModal
          close={() => setShowModal(false)}
          proceed={() => {
            deleteDepartment();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

export default ViewDepartments;
