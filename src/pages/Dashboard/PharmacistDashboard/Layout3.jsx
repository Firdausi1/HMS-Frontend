import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar3 from './Sidebar3';

const Layout3 = () => {
  return (
    <div className="flex">
    <div
      className="bg-gray-200
   w-[20%] fixed h-[100vh]"
    >
      <Sidebar3 />
    </div>
    <div className="absolute right-0  w-[80%] h-[100vh]">
      <Outlet />
    </div>
  </div>
  )
}

export default Layout3