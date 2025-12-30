import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
    const [username, setUsername] = useState(null)
    const [userRole, setUserRole] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userId, setUserId] = useState(null)
  return (
    <GlobalContext.Provider value={{ username, setUsername, userRole, setUserRole, isAuthenticated, setIsAuthenticated, userId, setUserId}}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;