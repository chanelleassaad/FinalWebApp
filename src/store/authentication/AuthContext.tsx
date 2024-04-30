import React, { createContext, useContext } from "react";

const AuthContext = createContext<any>(undefined);

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
