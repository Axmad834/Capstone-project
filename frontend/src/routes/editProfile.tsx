import { useState, useEffect } from "react";

const EditProfile = () => {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        hobby: "",
        photoUrl: "",
    });


    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch("http://localhost:8080/profile", {
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            alert("Профиль обновлён!");
        } else {
            alert("Ошибка обновления профиля.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-10">
            <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                placeholder="Имя"
                className="border p-2 rounded"
            />
            <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                placeholder="Фамилия"
                className="border p-2 rounded"
            />
            <input
                type="number"
                name="age"
                value={userData.age}
                onChange={handleChange}
                placeholder="Возраст"
                className="border p-2 rounded"
            />
            <input
                type="text"
                name="hobby"
                value={userData.hobby}
                onChange={handleChange}
                placeholder="Хобби"
                className="border p-2 rounded"
            />
            <input
                type="text"
                name="photoUrl"
                value={userData.photoUrl}
                onChange={handleChange}
                placeholder="URL фото"
                className="border p-2 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Сохранить изменения
            </button>
        </form>
    );
};

export default EditProfile;
