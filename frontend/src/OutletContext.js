import React, { createContext, useContext, useState } from 'react';

const OutletContext = createContext();

export const OutletProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add isLoggedIn state

  return (
    <OutletContext.Provider value={{ selectedItem, setSelectedItem, isLoggedIn, setIsLoggedIn }}>
      {children}
    </OutletContext.Provider>
  );
};

export const useOutletContext = () => useContext(OutletContext);
