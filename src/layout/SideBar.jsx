import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = ({ nav }) => {
  return (
    <div className="gap-4 p-4 flex flex-col  h-[100vh] bg-white shadow-md">
      {nav.map((item) => (
        <NavLink
        key={item.name}
          to={item.link}
          className={({ isActive }) =>
            `flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
              isActive
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`
          }
        >
          {item.icon}
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default SideBar;
