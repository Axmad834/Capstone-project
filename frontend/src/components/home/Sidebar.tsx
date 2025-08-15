import { Dialog } from "@headlessui/react";
import { Logo } from "./Logo";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { navigation } from "../../exports";
import { DialogProps } from "../../interface";
import { useAuth } from "../../firebase/useAuth";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate

export const Sidebar = (props: DialogProps) => {
  const { loggedIn, setLoggedIn, logout } = useAuth(); // Используем loggedIn и setLoggedIn
  const navigate = useNavigate(); // Создаем экземпляр useNavigate

  // Функция для выхода из системы и перехода на главную страницу
  const handleLogout = async () => {
    window.location.reload();
    try {
      await logout(); // Здесь вызываешь функцию logout из useAuth
      setLoggedIn(false); // Обновляешь состояние на false
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Функция для перехода на страницу входа
  const handleLogin = () => {
    navigate("/login"); // Перенаправляем на страницу логина
  };

  return (
      <Dialog
          as="div"
          className="lg:hidden"
          open={props.menuValue}
          onClose={() => {
            props.onClose(false);
          }}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Logo />
            <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => props.onClose(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                ))}
              </div>
              <div className="py-6">
                {loggedIn ? (
                    <button
                        onClick={handleLogout} // Вызываем функцию логаута
                        className="text-sm font-semibold leading-6 text-gray-900 group/edit motion-reduce:transition ease-out delay-100 duration-300 hover:scale-105 active:scale-95"
                    >
                      Log out
                    </button>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="text-sm font-semibold leading-6 text-gray-900 group/edit motion-reduce:transition ease-out delay-100 duration-300 hover:scale-105 active:scale-95"
                    >
                      Log in
                    </button>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
  );
};
