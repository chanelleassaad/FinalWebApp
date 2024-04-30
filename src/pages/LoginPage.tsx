import { useState } from "react";
import Input from "../components/molecules/Input";
import { FormProvider, useForm } from "react-hook-form";
import { IUser, loginUser, signUpUser } from "../config/UserApi";
import Alert from "../components/atoms/Alert";
import { useAuth } from "../store/authentication/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const methods = useForm();
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = methods.handleSubmit(async (data) => {
    const userData: IUser = {
      email: data.email as string,
      password: data.password as string,
    };
    try {
      const res = isLogin
        ? await loginUser(userData)
        : await signUpUser(userData);
      const { accessToken, refreshToken } = res;
      await signIn(userData.email, accessToken, refreshToken);
      setErrorMessage("");
      navigate("/canews/news");
    } catch (error) {
      error instanceof Error
        ? setErrorMessage(error.message)
        : setErrorMessage("Error occurred");
    }
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex min-h-80 flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-blue-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {isLogin ? "Sign in to your account" : "Create an account"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <FormProvider {...methods}>
          <form className="space-y-6" onSubmit={onSubmit}>
            <Input
              label="Email address"
              type="email"
              id="email"
              placeholder="Type your email..."
            />
            <Input
              label="Password"
              type="password"
              id="password"
              placeholder="Type your password..."
            />
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {isLogin ? "Sign in" : "Sign up"}
            </button>
            {errorMessage && <Alert message={errorMessage} />}
          </form>
        </FormProvider>

        <p className="mt-10 text-center text-sm text-gray-500">
          {isLogin ? "Not a member? " : "Already a member? "}
          <button
            onClick={toggleForm}
            className="font-semibold leading-6 text-blue-600 hover:text-blue-500 focus:outline-none"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
