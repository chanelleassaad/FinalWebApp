import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "./AuthContext";
import secureLocalStorage from "react-secure-storage";
import {
  restoreToken,
  signIn,
  signOut,
  updateAccessToken,
} from "./AuthReducer";
export interface IUserToken {
  email: string;
  accessToken: string;
  refreshToken: string;
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        const credentials = await secureLocalStorage.getItem("userToken");
        if (credentials) {
          userToken = credentials;
        }
      } catch (e) {
        throw e;
      }
      dispatch(restoreToken(userToken));
    };
    bootstrapAsync();
  }, [dispatch]);

  const authContext = useMemo(
    () => ({
      signIn: async (
        email: string,
        accessToken: string,
        refreshToken: string
      ) => {
        const token = { email, accessToken, refreshToken };
        await secureLocalStorage.setItem("userToken", token); // Store token as a string
        dispatch(signIn(token));
      },
      signOut: async () => {
        await secureLocalStorage.clear();
        dispatch(signOut());
      },
      updateAccessToken: async (accessToken: string) => {
        const { refreshToken } = userToken;
        const updatedToken = { accessToken, refreshToken };
        await secureLocalStorage.setItem("userToken", updatedToken); // Store updated token as a string

        dispatch(updateAccessToken(accessToken));
      },
    }),
    [dispatch, userToken]
  );

  return (
    <AuthContext.Provider value={{ ...authContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
