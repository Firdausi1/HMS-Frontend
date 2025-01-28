import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DashboardLayout = ({ nav }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="flex">
      <div
        className="
         w-[20%] fixed h-[100vh] pt-10"
      >
        <SideBar nav={nav} />
      </div>
      <div className="absolute right-0  w-[80%] h-[100vh]  p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-blue-700 flex items-center gap-2 uppercase">Hello {user?.firstName}</h1>
          <div
            onClick={logout}
            className="text-sm text-700  cursor-pointer px-4 py-2 bg-blue-300 rounded-md"
          >
            Logout
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
