import { ReactNode, MouseEvent } from "react";
import { Link } from "react-router-dom";

interface ICustomLinkProps {
  to: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

const CustomLink = ({ to, children, onClick }: ICustomLinkProps) => {
  return (
    <Link
      to={to}
      className="text-sm font-semibold leading-6 text-gray-900"
      onClick={onClick}
    >
      {children} <span aria-hidden="true">&rarr;</span>
    </Link>
  );
};

export default CustomLink;
