import {createContext, useState, useEffect} from "react";
// import {signInWithGoogle} from "../firebase.jsx";


export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [navbar, setNavbar] = useState(null);
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState(null);
    const [cart, setCart] = useState([]);

    function isTokenExpired(token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const now = Math.floor(Date.now() / 1000);
            return payload.exp && payload.exp < now;
        } catch (e) {
            return true;
        }
    }

    useEffect(() => {
        const handleStorageChange = () => {
            const storedToken = localStorage.getItem("token");
            const storedMemberId = localStorage.getItem("memberId");

            if (storedToken && storedMemberId) {
                setUser({ token: storedToken, memberId: storedMemberId });
            } else {
                setUser(null);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedMemberId = localStorage.getItem("memberId");

        if (storedToken && storedMemberId) {
            if (isTokenExpired(storedToken)) {
                logout();
            } else {
                setUser({ token: storedToken, memberId: storedMemberId });
            }
        }

    }, []);

    const login = (token, memberId) => {

        if (!token || !memberId) return;

        setUser({ token, memberId });

        localStorage.setItem("token", token);
        localStorage.setItem("memberId", memberId);
        setUser({ token, memberId });
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
            })
            .catch((error) => {
                console.error("Error fetching product info:", error);
            });
    }, []);

    const addToCart = (item) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id && cartItem.color === item.color);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id && cartItem.color === item.color
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };


    return (
        <AuthContext.Provider value={{user, login, logout, navbar, products,cart, addToCart }}>
            {children}
        </AuthContext.Provider>
    );
};