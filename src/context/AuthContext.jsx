import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // 初始化時檢查 localStorage 是否有登入資訊
    useEffect(() => {
        const token = localStorage.getItem("token");
        const memberId = localStorage.getItem("memberId");
        if (token && memberId) {
            setUser({ token, memberId });
        }
    }, []);

    // 登入函式
    // ================
    // Emma:
    // const login = (token, memberId) => {
    // HongJun:
    const login = ({token, memberId}) => {
    // ================
        localStorage.setItem("token", token);
        localStorage.setItem("memberId", memberId);
        setUser({ token, memberId });
    };

    // 登出函式
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("memberId");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
