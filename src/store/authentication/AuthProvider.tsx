import React, { useMemo, useReducer, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import authReducer from "./AuthReducer";
import secureLocalStorage from "react-secure-storage";

export interface IUserToken {
  email: string;
  accessToken: string;
  refreshToken: string;
}

interface State {
  isLoading: boolean;
  isSignout: boolean;
  userToken: IUserToken | null;
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  } as State);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        // Retrieve the user token from secure local storage
        const storedTokenString = await secureLocalStorage.getItem("userToken");
        if (storedTokenString) {
          const storedToken = storedTokenString;
          dispatch({ type: "RESTORE_TOKEN", token: storedToken });
        }
      } catch (e) {
        console.error("Error while fetching user token:", e);
      } finally {
        setIsLoading(false);
      }
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (
        email: string,
        accessToken: string,
        refreshToken: string
      ) => {
        const token = { email, accessToken, refreshToken };
        await secureLocalStorage.setItem("userToken", token); // Store token as a string
        dispatch({ type: "SIGN_IN", token });
      },
      signOut: async () => {
        await secureLocalStorage.clear();
        dispatch({ type: "SIGN_OUT" });
      },
      updateAccessToken: async (accessToken: string) => {
        const { email, refreshToken } = state.userToken as IUserToken;
        const updatedToken = { email, accessToken, refreshToken };
        await secureLocalStorage.setItem("userToken", updatedToken); // Store updated token as a string
        dispatch({
          type: "UPDATE_ACCESS_TOKEN",
          accessToken,
        });
      },
    }),
    [state.userToken]
  );

  // Provide loading state along with the context
  return (
    <AuthContext.Provider value={{ ...state, ...authContext, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
