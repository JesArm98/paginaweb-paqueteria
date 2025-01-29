"use client";

import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orderDataFinal, setOrderDataFinal] = useState();
  const [formaPago, setFormaPago] = useState("SPEI");

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        isLoggedIn,
        setIsLoggedIn,
        orderDataFinal,
        setOrderDataFinal,
        formaPago,
        setFormaPago,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
