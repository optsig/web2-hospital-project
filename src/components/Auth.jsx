import React from 'react'
import { Outlet } from 'react-router-dom'

function Auth() {
  return (
    <div className="min-h-screen md:flex">
      <div className="hidden md:block md:w-1/2 h-screen">
        <img
          src="/assets/graham-ruttan-b3LF7JHQmms-unsplash.jpg"
          alt="hospital background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-slate-50">
        <div className="w-full max-w-md p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Auth