import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Layout = ({ nav }) => {
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
        <div className="flex justify-between">
          <h1 className="font-bold text-xl">Hello {user?.firstName}</h1 >
          <button onClick={logout}>Log out</button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
