import { Body } from "../components/Body";
import { LoginLogo } from "../components/login/LoginLogo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Signup() {
  const history = useNavigate();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const signUp = async (e) => {
    e.preventDefault();

    const email = e?.target?.email?.value;
    const password = e?.target?.password?.value;
    const confirmPassword = e?.target?.confirmPassword?.value;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.text();
        setSuccessMessage("Registration successful!");
        setErrorMessage(null);
        setTimeout(() => history("/"), 2000);
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText || "Registration failed");
        setSuccessMessage(null);
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
      setSuccessMessage(null);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
      <Body>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-14 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <LoginLogo />
            <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign up for a new account
            </h2>
          </div>

          {successMessage && (
              <div className="mt-4 text-green-600 text-center">{successMessage}</div>
          )}
          {errorMessage && (
              <div className="mt-4 text-red-600 text-center">{errorMessage}</div>
          )}

          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={signUp} method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
                  Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
              </div>
              <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-indigo-400 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{" "}
              <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Login
              </a>
            </p>
          </div>
        </div>
      </Body>
  );
}
