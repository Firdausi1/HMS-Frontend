import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { DepartmentContext } from "../../../context/DepartmentContext";
import { EmployeeContext } from "../../../context/EmployeeContext";

const AdminDashboard = () => {
  const { employeeMeta, getEmployees } = useContext(EmployeeContext);
  const { departments, getDepartments } = useContext(DepartmentContext);

  useEffect(() => {
    getEmployees(1);
    getDepartments();
  }, []);
  return (
    <div className="flex min-h-screen bg-gray-100 px-8">
      <div className="flex-1 p-6">
        <section className="grid grid-cols-4 gap-6 mb-8">
          <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src="https://img.freepik.com/free-photo/african-american-therapist-doctor-explaining-radiography-expertise-sick-woman-discussing-healthcare-treatment-medical-appointment-hospital-ward-patient-with-neck-cervical-collar_482257-33623.jpg?ga=GA1.1.1223372785.1726203975&semt=ais_hybrid"
              alt="Patients"
              className="w-full h-56 object-cover brightness-110"
            />
            <div className="absolute top-3 left-3">
              <h3 className="text-xl font-bold text-black shadow-md">
                Employees
              </h3>
              <span className="text-4xl font-bold text-purple-500 shadow-md">
                {employeeMeta?.total}
              </span>
            </div>
          </div>

          <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src="https://img.freepik.com/free-photo/portrait-young-mother-with-little-girl-sitting-hospital-reception-lobby-attend-medical-consultation-with-appointment-waiting-room-area-healthcare-clinic-checkup-examination_482257-47694.jpg?ga=GA1.1.1223372785.1726203975&semt=ais_hybrid"
              alt="Queue"
              className="w-full h-56 object-cover brightness-110"
            />
            <div className="absolute top-3 right-3">
              <h3 className="text-xl font-bold text-black shadow-md">
                Departments
              </h3>
              <span className="text-4xl font-bold text-purple-500 shadow-md ml-6">
                {departments?.length}
              </span>
            </div>
          </div>
        </section>

        {/* Calendar Section */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Calendar</h3>
          <div className="flex justify-center items-center">
            <iframe
              src="https://calendar.google.com/calendar/embed?showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=1"
              title="Calendar"
              className="w-full h-96 border-none"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
