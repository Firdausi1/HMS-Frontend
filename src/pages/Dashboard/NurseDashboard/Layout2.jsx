import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar2 from "./Sidebar2";

const Layout2 = () => {
  return (
    <div className="flex">
      <div
        className="bg-gray-200
     w-[20%] fixed h-[100vh]"
      >
        <Sidebar2 />
      </div>
      <div className="absolute right-0  w-[80%] h-[100vh]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout2;
