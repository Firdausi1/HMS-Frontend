import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FaUserFriends, FaClipboardList, FaBed } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";

const Sidebar2 = () => {
  return (
    <div className="gap-4 p-6 flex flex-col mt-6 bg-white shadow-md">
      {/* Sidebar Section */}

      <NavLink
        to="/nurse"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? "bg-blue-700 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`
        }
      >
        <AiOutlineDashboard className="mr-3 text-lg" />
        Dashboard
      </NavLink>

      <NavLink
        to="/nurse/patients"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? "bg-blue-700 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`
        }
      >
        <FaUserFriends className="mr-3 text-lg" />
        Patients
      </NavLink>

      <NavLink
        to="/nurse/vitals"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? "bg-blue-700 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`
        }
      >
        <FaClipboardList className="mr-3 text-lg" />
        Vitals
      </NavLink>

      <NavLink
        to="/nurse/bed-allotment"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? "bg-blue-700 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`
        }
      >
        <FaBed className="mr-3 text-lg" />
        Bed Allotment
      </NavLink>

      <NavLink
        to="/nurse/add-bed"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? "bg-blue-700 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`
        }
      >
        <IoBedOutline className="mr-3 text-lg" />
        Add Bed
      </NavLink>
      
      <NavLink
        to="/nurse/profile"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? "bg-blue-700 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`
        }
      >
        <AiOutlineUserAdd className="mr-3 text-lg" />
        Profile
      </NavLink>
    </div>
  );
};

export default Sidebar2;
