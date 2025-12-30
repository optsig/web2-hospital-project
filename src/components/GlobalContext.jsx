import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

const name = ""

function GlobalContextProvider({ children }) {
    const [username, setUsername] = useState(name)
    const [userRole, setUserRole] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <GlobalContext.Provider value={{ username, setUsername, userRole, setUserRole, isAuthenticated, setIsAuthenticated }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;