import {createContext, useState, useEffect} from "react";
// import {signInWithGoogle} from "../firebase.jsx";


export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [navbar, setNavbar] = useState(null);
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState(null);
    const [error, setError] = useState(null);

    function isTokenExpired(token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const now = Math.floor(Date.now() / 1000);
            return payload.exp && payload.exp < now;
        } catch (e) {
            return true;
        }
    }

    // function getMemberIdFromToken(token) {
    //     try {
    //         if (!token || typeof token !== "string") return null;
    //         const payload = JSON.parse(atob(token.split('.')[1]));
    //
    //         return payload.memberId || payload.user_id || payload.sub;
    //
    //     } catch (error) {
    //         return null;
    //     }
    // }

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedMemberId = localStorage.getItem("memberId");

        if (storedToken && storedMemberId) {
            if (isTokenExpired(storedToken)) {
                logout(); // Token 過期則登出
            } else {
                setUser({ token: storedToken, memberId: storedMemberId });
            }
        }

    }, []);

    const login = (token, memberId) => {

        if (!token || !memberId) return;

        // 更新 State
        setUser({ token, memberId });

        // 儲存到 LocalStorage
        localStorage.setItem("token", token);
        localStorage.setItem("memberId", memberId);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };


    //網站資訊
    useEffect(() => {
        fetch("http://localhost:8080/navbar")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch website data");
                }
                return response.json();
            })
            .then((data) => {
                setNavbar(data);
                console.log("網站data",data)
            })
            .catch((error) => {
                console.error("Error fetching website info:", error);
            });
    }, []);

    //商品資訊
    useEffect(() => {
        fetch("http://localhost:8080/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch product data");
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
                console.log(data)
            })
            .catch((error) => {
                console.error("Error fetching product info:", error);
            });
    }, []);


    return (
        <AuthContext.Provider value={{user, login, logout, navbar, products}}>
            {children}
        </AuthContext.Provider>
    );
};