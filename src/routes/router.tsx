import { Navigate, Route, Routes } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import LoginPage from "../pages/LoginPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/canews" />} />
      <Route path="/canews" element={<WelcomePage />} />
      <Route path="/canews/login" element={<LoginPage />} />
    </Routes>
  );
};

export default Router;
