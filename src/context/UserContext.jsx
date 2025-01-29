"use client";

import { createContext, useState } from "react";

const UserContext = createContext({
  userData: null,
  setUserData: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  orderDataFinal: null,
  setOrderDataFinal: () => {},
  formaPago: "SPEI",
  setFormaPago: () => {},
});

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
