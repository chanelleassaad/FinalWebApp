import icon from "../../assets/icon.png";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../store/authentication/AuthContext";
import CustomLink from "../atoms/CustomLink";

function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname.includes("login");
  const isNewsPage = location.pathname.includes("/news");
  const { signOut } = useAuth();

  return (
    <header className="bg-white">
      <div
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <img className="h-8 w-auto" src={icon} alt="" />
        </div>
        <div className="lg:flex lg:gap-x-12">
          <p className="text-lg font-bold leading-6 custom-color">CA NEWS</p>
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          {!isLoginPage && !isNewsPage && (
            <CustomLink to="canews/login">Log in</CustomLink>
          )}
          {isNewsPage && (
            <CustomLink to="/canews" onClick={signOut}>
              Log out
            </CustomLink>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
