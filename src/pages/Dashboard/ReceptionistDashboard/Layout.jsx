import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex'>
        <div className='bg-gray-200
         w-[20%] fixed h-[100vh]'>
            <SideBar />
        </div>
        <div className='absolute right-0  w-[80%] h-[100vh]'>
            <Outlet />
        </div>
    </div>
  )
}

export default Layout