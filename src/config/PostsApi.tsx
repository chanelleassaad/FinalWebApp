import { Dispatch } from "react";
import { api, refreshAccessToken } from "./UserApi";
import { AxiosResponse } from "axios";
import {
  getPostsStart,
  getPostsSuccess,
  getPostsFailure,
} from "../store/PostsReducer";
import { IUserToken } from "../store/authentication/AuthProvider";

export const getPosts =
  (
    userToken: IUserToken,
    page: number,
    updateAccessToken: (accessToken: string) => void
  ): ((dispatch: Dispatch<any>) => Promise<void>) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(getPostsStart());

      const response: AxiosResponse<any> = await api.get(
        `/posts?page=${page}&pageSize=${6}`,
        {
          headers: {
            Authorization: `Bearer ${userToken.accessToken}`,
          },
        }
      );
      dispatch(getPostsSuccess(response.data));
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        try {
          const refreshedTokenData = await refreshAccessToken({
            refreshToken: userToken.refreshToken,
          });
          const refreshedToken: string = refreshedTokenData.accessToken;
          updateAccessToken(refreshedToken);
          // Retry the original request with the new token
          const response: AxiosResponse<any> = await api.get(
            `/posts?page=${1}&pageSize=${6}`,
            {
              headers: {
                Authorization: `Bearer ${refreshedToken}`,
              },
            }
          );
          dispatch(getPostsSuccess(response.data));
        } catch (refreshError: any) {
          dispatch(getPostsFailure(refreshError.response.data.message));
        }
      } else {
        dispatch(getPostsFailure(error.response.data.message));
      }
    }
  };
