import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <Link
      to="/login"
      className="text-sm font-semibold leading-6 text-gray-900 group/edit motion-reduce:transition ease-out delay-100 duration-300 hover:scale-105 active:scale-95"
    >
      Log in{" "}
      <ArrowRightIcon
        aria-hidden="true"
        className="size-4 inline motion-reduce:transition ease-out delay-100 duration-300 group-hover/edit:translate-x-0.5 group-active/edit:translate-x-2"
      />
    </Link>
  );
};
