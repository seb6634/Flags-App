import React from "react";

export const Auth = React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
});
