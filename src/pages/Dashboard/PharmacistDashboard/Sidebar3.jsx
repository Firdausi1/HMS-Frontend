import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FaUserFriends, FaBed } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { MdInventory2 } from "react-icons/md";
import { LiaPrescriptionBottleSolid } from "react-icons/lia";

const Sidebar3 = () => {
  return (
    <div className="gap-4 p-6 flex flex-col mt-6 bg-white shadow-md">
      {/* Sidebar Section */}

      <NavLink
        to="/pharmacist"
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
        to="/pharmacist/patients"
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
        to="/pharmacist/medication"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? "bg-blue-700 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`
        }
      >
        <GiMedicines className="mr-3 text-lg" />
        Medication
      </NavLink>

      <NavLink
        to="/pharmacist/prescription"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? "bg-blue-700 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`
        }
      >
        <LiaPrescriptionBottleSolid className="mr-3 text-lg" />
        Prescription
      </NavLink>

      <NavLink
        to="/pharmacist/inventory"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? "bg-blue-700 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`
        }
      >
        <MdInventory2 className="mr-3 text-lg" />
        Inventory
      </NavLink>
      
      <NavLink
        to="/pharmacist/profile"
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

export default Sidebar3;
