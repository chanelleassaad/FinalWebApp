import { Route, Routes, useNavigate } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import LoginPage from "../pages/LoginPage";
import NewsPage from "../pages/NewsPage";
import { useAuth } from "../store/authentication/AuthContext";
import { useEffect } from "react";

const Router = () => {
  const { userToken, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return; // Wait until token loading is complete

    if (userToken === null) {
      navigate("/canews/login", { replace: true }); // Redirect to login page if not authenticated
    } else if (window.location.pathname !== "/canews") {
      navigate("/canews/news", { replace: true }); // Redirect to news page if authenticated and not on /canews
    }
  }, [userToken, isLoading, navigate]);

  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<WelcomePage />} />

      {/* Public routes */}
      <Route path="/canews" element={<WelcomePage />} />
      <Route path="/canews/login" element={<LoginPage />} />

      {/* Private route */}
      <Route path="/canews/news" element={<NewsPage />} />
    </Routes>
  );
};

export default Router;
