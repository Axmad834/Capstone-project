import { HamburgerMenu } from "./Hamburger";
import { Logo } from "./Logo";
import { navigation } from "../../exports";
import { MenuProps } from "../../interface";
import { useAuth } from "../../firebase/useAuth";
import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export const Navbar = (props: MenuProps) => {
  const { loggedIn, loading } = useAuth();

  return (
      <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
      >
        <Logo />
        <HamburgerMenu onPress={props.onPress} />
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
              <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900 hover:scale-125 transition"
              >
                {item.name}
              </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-x-4">
          {!loading && loggedIn ? (
              <Link to="/profile">
                <UserCircleIcon className="h-8 w-8 text-gray-700 hover:text-indigo-600 transition" />
              </Link>
          ) : (
              <Link
                  to="/login"
                  className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition"
              >
                Login
              </Link>
          )}
        </div>
      </nav>
  );
};
