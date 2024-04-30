const authReducer = (
  prevState: { userToken: any },
  action: { type: any; token?: any; accessToken?: any }
) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
    case "UPDATE_ACCESS_TOKEN":
      return {
        ...prevState,
        userToken: {
          ...prevState.userToken,
          accessToken: action.accessToken,
        },
      };
    default:
      return prevState;
  }
};

export default authReducer;
