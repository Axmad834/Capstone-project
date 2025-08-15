import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase/useAuth"; // Импорт хука для авторизации

export const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth(); // Получаем функцию logout из хука

    const handleLogout = async () => {
        try {
            await logout(); // Выполняем logout через хук
            navigate("/"); // Перенаправляем на страницу "home" после выхода
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="text-sm font-semibold leading-6 text-gray-900 group/edit motion-reduce:transition ease-out delay-100 duration-300 hover:scale-105 active:scale-95"
        >
            Log out{" "}
            <ArrowRightStartOnRectangleIcon
                aria-hidden="true"
                className="size-4 inline motion-reduce:transition ease-out delay-100 duration-300 group-hover/edit:translate-x-0.5 group-active/edit:translate-x-2"
            />
        </button>
    );
};
