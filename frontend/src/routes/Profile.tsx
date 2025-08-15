import { useState, useEffect } from "react";
import { useAuth } from "../firebase/useAuth";
import defaultAvatar from "../assets/defaultAvatar.png";
import {Body} from "../components/Body.tsx";



// Интерфейс для пользователя
interface User {
    id: number;
    firstName: string | null;
    lastName: string | null;
    age: string | null;
    hobby: string | null;
    photoUrl: string | null;
    email: string;
    role: string | null;
}

const Profile = () => {
    const {loggedIn, loading , logout} = useAuth();
    const [userData, setUserData] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);  // Состояние для редактирования
    const [updatedData, setUpdatedData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        hobby: "",
        photoUrl: "",
    });

    useEffect(() => {
        if (!loggedIn) return;

        const fetchProfile = async () => {
            try {
                const response = await fetch("http://localhost:8080/profile", {
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                    setUpdatedData({
                        firstName: data.firstName || "",
                        lastName: data.lastName || "",
                        age: data.age || "",
                        hobby: data.hobby || "",
                        photoUrl: data.photoUrl || "",
                    });
                } else {
                    console.error("Failed to fetch profile data");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, [loggedIn]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUpdatedData({...updatedData, [name]: value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
                setIsEditing(false);  // Закрываем форму редактирования
            } else {
                console.error("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!loggedIn) return <p>Please log in to view your profile.</p>;


    return (
        <Body>
            <div className="relative flex items-center justify-center min-h-screen pt-32 px-4 sm:px-6 lg:px-8">
                {userData ? (
                    <div
                        className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-left transition duration-300 z-10">
                        <button
                            onClick={() => {
                                const confirmLogout = window.confirm("Вы уверены, что хотите выйти?");
                                if (confirmLogout) {
                                    logout();
                                }
                            }}
                            className=" top-4 left-0 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow-md transition"
                        >
                            🔓 Logout
                        </button>
                        <img
                            src={userData.photoUrl || defaultAvatar}
                            alt="User"
                            className="w-32 h-32 mx-auto rounded-full object-cover mb-6 shadow-md"
                        />
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {userData.firstName || "Not specified"}{" "}
                            {userData.lastName || "- Not specified"}
                        </h1>
                        <p className="text-gray-500 mb-1">📧 {userData.email}</p>
                        <p className="text-gray-500 mb-1">🎂 Age: {userData.age || "N/A"}</p>
                        <p className="text-gray-500 mb-4">🎯 Hobby: {userData.hobby || "Not specified"}</p>

                        {!isEditing ? (
                            <button
                                onClick={handleEditClick}
                                className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-xl shadow hover:opacity-90 transition"
                            >
                                ✏️ Edit Profile
                            </button>
                        ) : (
                            <form onSubmit={handleSubmit} className="mt-6 space-y-3 text-left">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={updatedData.firstName}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={updatedData.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    name="age"
                                    value={updatedData.age}
                                    onChange={handleChange}
                                    placeholder="Age"
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    name="hobby"
                                    value={updatedData.hobby}
                                    onChange={handleChange}
                                    placeholder="Hobby"
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    name="photoUrl"
                                    value={updatedData.photoUrl}
                                    onChange={handleChange}
                                    placeholder="Photo URL"
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                />
                                <div className="flex justify-center gap-4 pt-2">
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white px-5 py-2 rounded-xl shadow hover:bg-green-600 transition"
                                    >
                                        ✅ Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancelClick}
                                        className="bg-gray-400 text-white px-5 py-2 rounded-xl shadow hover:bg-gray-500 transition"
                                    >
                                        ❌ Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 mt-10">No profile data available.</p>
                )}
            </div>
        </Body>
    );
}


export default Profile;



