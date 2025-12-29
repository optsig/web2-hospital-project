import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

const name = ""

function GlobalContextProvider({ children }) {
    const [username, setUsername] = useState(name)
  return (
    <GlobalContext.Provider value={{ username, setUsername }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;