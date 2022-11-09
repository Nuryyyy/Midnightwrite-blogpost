import React from 'react'
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <main className='App'>
        {/* <Outlet /> all the children */}
        <Outlet />
    </main>
  )
}

export default Layout