import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Body } from "../Body";
import { auth } from "../../firebase/firebase";

export const Main = () => {
  return (
    <Body>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Check out our new dashboard.{" "}
            <Link
              to={auth.currentUser ? "/dashboard" : "/login"}
              className="font-semibold text-indigo-600 group/edit"
            >
              <span className="absolute inset-0" aria-hidden="true" />
              Explore{" "}
              <ArrowRightIcon
                aria-hidden="true"
                className="size-4 inline transition ease-out delay-100 duration-300 group-hover/edit:translate-x-0.5 group-active/edit:translate-x-1"
              />
            </Link>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Empowering Minds, Enriching Lives
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover the art of mastery, embark on a journey of self-discovery,
            and unlock boundless opportunities for growth and achievement.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={auth.currentUser ? "/dashboard" : "/login"}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm motion-reduce:transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 active:scale-100"
            >
              Get started
            </Link>
            <Link
              to="/courses"
              className="text-sm font-semibold leading-6 text-gray-900 group/item transition ease-out delay-100 duration-300 hover:scale-105"
            >
              Learn more{" "}
              <ArrowRightIcon
                aria-hidden="true"
                className="size-4 inline transition ease-out delay-100 duration-300 group-hover/item:translate-x-0.5 group-active/item:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </Body>
  );
};
