import {createContext, useState, useEffect} from "react";
// import {signInWithGoogle} from "../firebase.jsx";


export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [navbar, setNavbar] = useState(null);
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState(null);
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);

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

        fetchCartCount(memberId);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);

        setCartCount(0);
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

    // 取得購物車數量
    const fetchCartCount = async (memberid) => {
        if (!memberid) return;
        try {
            const response = await fetch(`http://localhost:8080/productcart/count?memberid=${memberid}`);
            const data = await response.json();
            setCartCount(data.count);

            console.log(data.count);
        } catch (error) {
            console.error("獲取購物車數量失敗:", error);
        }
    };

    useEffect(() => {
        if (user?.memberId) {
            fetchCartCount(user.memberId); // ✅ 登入時同步購物車數量
        }
    }, [user]);


    const addToCart = async (payload) => {
        const {memberid, productid, color, quantity} = payload;

        try {
            const response = await fetch("http://localhost:8080/productcart/addToCart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ memberid, productid, color, quantity }),
            });

            if (response.ok) {
                fetchCartCount(memberid);
            }
        } catch (error) {
            console.error("加入購物車失敗:", error);
        }
    };


    return (
        <AuthContext.Provider value={{user, login, logout, navbar, products,cart, cartCount, addToCart }}>
            {children}
        </AuthContext.Provider>
    );
};