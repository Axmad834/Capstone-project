import { useState, useEffect } from "react";
import { useAuth } from "../firebase/useAuth";
import { Body } from "../components/Body";
import { Navbar } from "../components/home/Navbar";
import { Sidebar } from "../components/home/Sidebar";
import defaultCourseImage from "../assets/defaultAvatar.png";



interface Course {
    id: number;
    title: string;
    imageUrl: string;
    courseDescription: string;
}

export const Dashboard = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userCourses, setUserCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const { loggedIn,user , loading: authLoading  } = useAuth();

    useEffect(() => {
        //security
        if (authLoading || !loggedIn || !user) return;

        const userId = user.id;

        const fetchUserCourses = async () => {
            try {
                //security part
                const res = await fetch(`http://localhost:8080/dashboard/getUserCourses?userId=${userId}`, {
                    credentials: "include",
                });
                if (!res.ok) throw new Error("Ошибка при получении курсов пользователя");
                const data: Course[] = await res.json();
                setUserCourses(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };


        fetchUserCourses();
    }, [authLoading, loggedIn]);

    const handleRemove = async (courseId: number) => {
        if (!window.confirm("Удалить курс из личного кабинета?")) return;

        const userId = user.id;

        //translate in eng
        try {
            const res = await fetch(`http://localhost:8080/dashboard/delete/${userId}/${courseId}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!res.ok) throw new Error("Ошибка при удалении курса");
            setUserCourses(prev => prev.filter(course => course.id !== courseId));
        } catch (e) {
            console.error(e);
        }
    };

    if (authLoading || loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    if (!loggedIn) {
        return <div className="p-8 text-center">Please log in to view your dashboard.</div>;
    }

    return (
        <Body>
            <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
                <header className="absolute inset-x-0 top-0 z-50">
                    <Navbar onPress={() => setMobileMenuOpen(true)} />
                    <Sidebar
                        menuValue={mobileMenuOpen}
                        onClose={() => setMobileMenuOpen(false)}
                    />
                </header>

                <main>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h2>
                    {userCourses.length === 0 ? (
                        <p className="text-gray-600">У вас пока нет добавленных курсов.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {userCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow relative h-[360px] flex flex-col"
                                >
                                    <img
                                        src={course.imageUrl || defaultCourseImage}
                                        alt={course.title}
                                        className="w-full h-[60%] object-cover rounded-t-xl"
                                    />
                                    <div className="p-4 flex-grow flex flex-col">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-2 overflow-y-auto">
                                            {course.courseDescription?.trim().length
                                                ? course.courseDescription
                                                : "No description"}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handleRemove(course.id)}
                                        className="absolute bottom-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition text-sm"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </Body>
    );
};
