import {createContext, useState, useEffect} from "react";
import {signInWithGoogle} from "../firebase.jsx";


export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    function isTokenExpired(token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const now = Math.floor(Date.now() / 1000);
            return payload.exp && payload.exp < now;
        } catch (e) {
            return true;
        }
    }

    function getMemberIdFromToken(token) {
        try {
            if (!token || typeof token !== "string") return null;
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.memberId || payload.user_id || payload.sub;
        } catch (error) {
            return null;
        }
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            if (isTokenExpired(storedToken)) {
                localStorage.removeItem("token");
                setUser(null);
            } else {
                const memberId = getMemberIdFromToken(storedToken);
                if (memberId) {
                    setUser({ token: storedToken, memberId });
                }
            }
        } else {
            setUser(null);
        }
    }, []);

    const login = (response) => {
        if (!response || typeof response !== "object" || !response.token) return;

        const token = response.token;
        const memberId = getMemberIdFromToken(token);

        if (memberId) {
            setUser({ token, memberId });
            localStorage.setItem("token", token);
            localStorage.setItem("memberId", memberId);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login, logout, signInWithGoogle}}>
            {children}
        </AuthContext.Provider>
    );
};