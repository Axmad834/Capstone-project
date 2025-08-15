
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface UserProfile {
    id: number;
    email: string;
    role: string;
    // ...можно добавить остальные поля, которые приходят из /profile
}

export const useAuth = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserProfile | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch("http://localhost:8080/profile", {
                    credentials: "include",
                });
                if (res.ok) {
                    const profile: UserProfile = await res.json();
                    setUser(profile);
                    setLoggedIn(true);
                } else {
                    setUser(null);
                    setLoggedIn(false);
                }
            } catch (e) {
                setUser(null);
                setLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };
        checkSession();
    }, []);

    const logout = async () => {
        navigate("/home");
        try {
            const res = await fetch("http://localhost:8080/logout", {
                method: "POST",
                credentials: "include",
            });
            if (res.ok) {
                setUser(null);
                setLoggedIn(false);
            } else {
                console.error("Logout failed");
            }
        } catch (e) {
            console.error("Logout error:", e);
        }
    };




    return {
        loggedIn,
        loading,
        user,
        isAdmin: user?.role === "ADMIN",
        logout,
    };
};
