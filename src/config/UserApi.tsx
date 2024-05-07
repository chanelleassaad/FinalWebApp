import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export interface IUser {
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: IUser) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    const errorResponse = error as {
      response?: { data?: { message?: string } };
    };
    throw new Error(
      errorResponse?.response?.data?.message || "Failed to login"
    );
  }
};

export const signUpUser = async ({ email, password }: IUser) => {
  try {
    const response = await api.post("/signup", { email, password });
    return response.data;
  } catch (error) {
    const errorResponse = error as {
      response?: { data?: { message?: string } };
    };
    throw new Error(
      errorResponse?.response?.data?.message || "Failed to signup"
    );
  }
};

export const refreshAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  try {
    const response = await api.post("/refresh-token", { refreshToken });
    return response.data;
  } catch (error) {
    const errorResponse = error as {
      response?: { data?: { message?: string } };
    };
    throw new Error(
      errorResponse?.response?.data?.message || "Failed to refresh token"
    );
  }
};
