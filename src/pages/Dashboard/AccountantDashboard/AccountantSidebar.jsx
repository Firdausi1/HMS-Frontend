import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AiOutlineDashboard,
  AiOutlineUserAdd,
  AiOutlineSchedule
} from 'react-icons/ai';
import { FaUserFriends, FaClipboardList } from 'react-icons/fa';


const AccountantSideBar = ({ }) => {

  return (
    <div className="gap-4 p-6 flex flex-col mt-6 bg-white shadow-md">
      {/* Sidebar Section */}

      <NavLink
        to="/accountant"
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
        to="/TakePayment"
        // onClick={(e) => { e.preventDefault(); handleViewPatients(); }}
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`
        }
      >
        <FaUserFriends className="mr-3 text-lg" />
        Take Payment
      </NavLink>

      <NavLink
        to="/NewInvoice"
        // onClick={(e) => { e.preventDefault(); handleOpenQueueModal(); }}
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`
        }
      >
        <FaClipboardList className="mr-3 text-lg" />
        New Invoice
      </NavLink>

      <NavLink
        to="/viewPayments"
        // onClick={(e) => { e.preventDefault(); handleViewAppointments(); }}
        className={({ isActive }) =>
          `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
            isActive
              ? 'bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`
        }
      >
        <AiOutlineSchedule className="mr-3 text-lg" />
        View Payments
      </NavLink>

      <NavLink
        to="/Profile"
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

export default AccountantSideBar;




