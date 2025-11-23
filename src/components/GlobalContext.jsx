import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

const userData = [
    {
      id: 1,
      type: "admin",
      username: "admin",
      password: "123"
    },
    {
      id: 2,
      type: "doctor",
      username: "doctor",
      password: "123",
      availability: []
    },
    {
      id: 3,
      type: "patient",
      username: "patient",
      password: "123",
      appointments: []
    }
  ];

function GlobalContextProvider({ children }) {
    const [users, setUsers] = useState(userData)
  return (
    <GlobalContext.Provider value={{ users, setUsers }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;