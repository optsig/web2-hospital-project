import React from 'react'
import { Outlet } from 'react-router-dom' 

function Auth() {
  
  return (
    <div className="min-h-screen md:flex bg-slate-50">
      <div className="md:flex md:w-1/2 h-screen flex items-center justify-center">
        <img
          src="/assets/jc-gellidon-uhXlRnt9dTw-unsplash.jpg"
          alt="hospital background"
          className="w-full max-w-sm h-auto object-contain rounded-lg shadow-xl"
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center ">
        <div className="w-full max-w-md p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Auth