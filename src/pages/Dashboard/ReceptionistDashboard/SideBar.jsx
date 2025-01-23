import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AiOutlineDashboard,
  AiOutlineUserAdd,
  AiOutlineSchedule
} from 'react-icons/ai';
import { FaUserFriends, FaClipboardList } from 'react-icons/fa';

const SideBar = () => {
  return (
    <div className="gap-4 p-6 flex flex-col mt-6 bg-white shadow-md">
      {/* Sidebar Section */}

      <NavLink
        to="/receptionist"
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
        to="/receptionist/patients"
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
        to="/receptionist/queue-list"
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
        to="/receptionist/appointment-list"
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
        to="/receptionist/receptionist-profile"
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

export default SideBar;




