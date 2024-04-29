import icon from "../../assets/icon.png";

function Header() {
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
          <p className="text-lg font-bold leading-6 text-blue-900">CA NEWS</p>
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <a
            href="canews/login"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
