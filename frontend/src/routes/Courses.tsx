import { useState, useEffect } from "react";
import { useAuth } from "../firebase/useAuth";
import { Body } from "../components/Body";
import { Navbar } from "../components/home/Navbar";
import { Sidebar } from "../components/home/Sidebar";
import { PlusIcon } from "@heroicons/react/24/outline";
import defaultCourseImage from "../assets/defaultAvatar.png";



interface Course {
    id: number;
    title: string;
    imageUrl: string;
    courseDescription: string;
}

export const Courses = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [courses, setCourses] = useState<Course[]>([]);
    const [expandedCourseId, setExpandedCourseId] = useState<number | null>(null);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const { loggedIn, loading: authLoading, isAdmin ,user } = useAuth();// или import auth from 'your-auth-context'
    //will be used in future
    const userId = user?.id;

    useEffect(() => {
        if (authLoading || !loggedIn) return;

        const fetchCourses = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/getCourse", {
                    credentials: "include",
                });
                if (!res.ok) throw new Error("Не удалось загрузить курсы");
                const data: Course[] = await res.json();
                setCourses(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoadingCourses(false);
            }
        };

        fetchCourses();
    }, [authLoading, loggedIn ]);

    const handleAddClick = async () => {
        const title = prompt("Enter course title");
        const description = prompt("Enter course description") || "";
        const imageUrl = prompt("Enter image URL", defaultCourseImage) || defaultCourseImage;

        if (title) {
            try {
                const res = await fetch("http://localhost:8080/api/addCourse", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title, description, imageUrl }),
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Ошибка при добавлении курса");
                const newCourse = await res.json();
                setCourses((prevCourses) => [...prevCourses, newCourse]);
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleEditClick = async (id: number) => {
        const courseToEdit = courses.find((c) => c.id === id);
        if (!courseToEdit) return;

        const title = prompt("Enter new course title", courseToEdit.title);
        const courseDescription = prompt("Enter new description", courseToEdit.courseDescription);
        const imageUrl = prompt("Enter new image URL", courseToEdit.imageUrl);

        if (title && courseDescription && imageUrl) {
            try {
                const res = await fetch(`http://localhost:8080/api/courses/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title, courseDescription, imageUrl }),
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Ошибка при редактировании курса");

                const updatedCourse = await res.json(); // Здесь должен прийти CoursesDto
                setCourses((prevCourses) =>
                    prevCourses.map((course) =>
                        course.id === id ? updatedCourse : course
                    )
                );
            } catch (e) {
                console.error(e);
            }
        }
    };


    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                const res = await fetch(`http://localhost:8080/api/deleteCourse/${id}`, {
                    method: "DELETE",
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Ошибка при удалении курса");
                setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
            } catch (e) {
                console.error(e);
            }
        }
    };


    const handleAddToDashboard = async (courseId: number) => {
        if (!userId) return;

        const course = courses.find((c) => c.id === courseId);
        if (!course) return;

        try {
            const response = await fetch(`http://localhost:8080/dashboard/addCourseToUser?id=${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(course),
                credentials: "include",
            });

            if (response.ok) {
                alert("Курс добавлен в ваш Dashboard");
            } else {
                alert("Не удалось добавить курс");
            }
        } catch (error) {
            console.error("Ошибка при добавлении курса:", error);
        }
    };


    const toggleExpand = (id: number) => {
        setExpandedCourseId(prev => (prev === id ? null : id));
    };

    if (authLoading || loadingCourses) {
        return <div className="p-8 text-center">Loading…</div>;
    }
    if (!loggedIn) {
        return <div className="p-8 text-center">Please log in to view courses.</div>;
    }



    return (
        <Body>
            <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
                <header className="absolute inset-x-0 top-0 z-50">
                    <Navbar onPress={() => setMobileMenuOpen(true)} />
                    <Sidebar menuValue={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
                </header>

                <main>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Courses</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                onClick={() => toggleExpand(course.id)}
                                className="cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow relative h-[360px] flex flex-col"
                            >
                                <img
                                    src={course.imageUrl || defaultCourseImage}
                                    alt={course.title}
                                    className="w-full h-[60%] object-cover rounded-t-xl"
                                />
                                <div className="p-4 flex-grow flex flex-col">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h3>

                                    {expandedCourseId === course.id && (
                                        <p className="text-sm text-gray-600 mt-2 overflow-y-auto">
                                            {course.courseDescription?.trim().length ? course.courseDescription : "No description"}
                                        </p>
                                    )}
                                </div>

                                {isAdmin ? (
                                    <div className="absolute top-2 right-2 flex gap-1">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditClick(course.id);
                                            }}
                                            className="text-indigo-600 text-sm px-2 bg-white bg-opacity-75 rounded hover:bg-opacity-100"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(course.id);
                                            }}
                                            className="text-red-600 text-sm px-2 bg-white bg-opacity-75 rounded hover:bg-opacity-100"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToDashboard(course.id);
                                        }}
                                        className="absolute bottom-2 right-2 text-blue-600 bg-white bg-opacity-75 rounded-full p-1 hover:bg-opacity-100"
                                        title="Add to Dashboard"
                                    >
                                        <PlusIcon className="w-6 h-6" />
                                    </button>
                                )}
                            </div>
                        ))}

                        {isAdmin && (
                            <button
                                onClick={handleAddClick}
                                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-indigo-500 transition-colors h-[360px]"
                            >
                                <PlusIcon className="w-10 h-10 text-gray-400 hover:text-indigo-500 transition-colors" />
                                <span className="mt-2 text-gray-600">Add Course</span>
                            </button>
                        )}
                    </div>
                </main>
            </div>
        </Body>
    );
};
