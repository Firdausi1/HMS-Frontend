import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AiOutlineDashboard,
  AiOutlineUserAdd,
  AiOutlineSchedule
} from 'react-icons/ai';
import { FaUserFriends, FaClipboardList } from 'react-icons/fa';

const handleViewPatients = () => {
  // Your logic for viewing patients
};

const handleOpenQueueModal = () => {
    // Your logic for fetching queue patients
    };

const DoctorSideBar = ({ handleViewPatients, handleOpenQueueModal, handleViewAppointments }) => {

  return (
    <div className="gap-4 p-6 flex flex-col mt-6 bg-white shadow-md">
      {/* Sidebar Section */}

      <NavLink
        to="/doctor"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`
        }
      >
        <AiOutlineDashboard className="mr-3 text-lg" />
        Dashboard
      </NavLink>

      <NavLink
        to="/patients"
        onClick={(e) => { e.preventDefault(); handleViewPatients(); }}
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`
        }
      >
        <FaUserFriends className="mr-3 text-lg" />
        Patients
      </NavLink>

      <NavLink
        to="/queue"
        onClick={(e) => { e.preventDefault(); handleOpenQueueModal(); }}
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`
        }
      >
        <FaClipboardList className="mr-3 text-lg" />
        Queue
      </NavLink>

      <NavLink
        to="/appointments"
        onClick={(e) => { e.preventDefault(); handleViewAppointments(); }}
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`
        }
      >
        <AiOutlineSchedule className="mr-3 text-lg" />
        Appointments
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`
        }
      >
        <AiOutlineUserAdd className="mr-3 text-lg" />
        Vital Signs
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`
        }
      >
        <AiOutlineUserAdd className="mr-3 text-lg" />
        Bed Allotment
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`
        }
      >
        <AiOutlineUserAdd className="mr-3 text-lg" />
        Blood Donors
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`
        }
      >
        <AiOutlineUserAdd className="mr-3 text-lg" />
        Profile
      </NavLink>
    </div>
  );
};

export default DoctorSideBar;




