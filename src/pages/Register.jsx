import {CiUser, CiLock} from "react-icons/ci";
import {FcGoogle} from "react-icons/fc";
import {FaFacebook} from "react-icons/fa";
import {MdOutlineMailOutline} from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
// import {registerWithEmail, signInWithGoogle} from "../firebase";
// import {registerWithEmail} from "../firebase";


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError("請輸入有效的信箱格式！");
        } else {
            setEmailError("");
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        const passwordRegex = /[a-zA-Z]/;
        if (!passwordRegex.test(value)) {
            setPasswordError("密碼至少需要包含一個英文字！");
        } else {
            setPasswordError("");
        }
    };

    // const handleRegister = async (e) => {
    //     e.preventDefault();
    //     if (emailError || passwordError || !email.trim() || !password.trim()) {
    //         alert("請修正錯誤後再提交！");
    //         return;
    //     }
    //
    //     try {
    //         const response = await fetch(`http://localhost:8080/login/register`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ email, password }),
    //         });
    //
    //         if (!response.ok) {
    //             throw new Error("註冊失敗");
    //         }
    //
    //         const data = await response.json();
    //         // console.log("後端註冊成功:", data);
    //
    //         localStorage.setItem("token", data.token);
    //         localStorage.setItem("memberId", data.memberId);
    //         console.log(data.memberId)
    //         login(data.token, data.memberId);
    //
    //         alert("註冊成功");
    //         navigate("/MemberInfo/Profile");
    //     } catch (err) {
    //         console.error("註冊失敗:", err);
    //     }
    // };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (emailError || passwordError || !email.trim() || !password.trim()) {
            alert("請修正錯誤後再提交！");
            return;
        }
        const today = new Date().toISOString().split("T")[0];

        try {
            const response = await fetch(`http://localhost:8080/login/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password ,registrationdate: today}),
            });

            if (response.status === 409) {
                alert("該信箱已被註冊！");
                return;
            }

            if (!response.ok) {
                throw new Error("註冊失敗");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("memberId", data.memberId);
            login(data.token, data.memberId);

            alert("註冊成功");
            navigate("/MemberInfo/Profile");

        } catch (err) {
            console.error("註冊失敗:", err);
            alert("系統錯誤，請稍後再試");
        }
    };

    // Google 註冊
    // const handleGoogleRegister = async () => {
    //     try {
    //         const userCredential = await signInWithGoogle();
    //         const token = await userCredential.user.getIdToken();
    //         console.log("Google 註冊成功:", userCredential.user);
    //
    //         const response = await fetch(`http://localhost:8080/login/register`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             },
    //             body: JSON.stringify({email: userCredential.user.email}), // Google 註冊的 email
    //         });
    //
    //         if (!response.ok) throw new Error("Google 註冊失敗");
    //
    //         const data = await response.json();
    //         console.log("後端 Google 註冊成功:", data);
    //
    //         // 存入 localStorage 並更新登入狀態
    //         localStorage.setItem("token", token);
    //         localStorage.setItem("memberId", data.memberId);
    //         login(token, data.memberId);
    //
    //         alert("Google 註冊成功");
    //         navigate("/MemberInfo/Profile");
    //     } catch (err) {
    //         console.error("Google 註冊失敗:", err);
    //     }
    // };
    const registerDivStyle = "w-full mx-auto px-2 flex border items-center focus-within:border-2 focus-within:border-[#aa8670]";
    const registerInput = " ml-2 p-1 outline-none w-full";
    const GoogleButton = "w-[65%] flex items-center justify-center px-4 py-2 border border-gray-400 rounded-lg hover:bg-[#f7f7f8]";
    const GoogleSpan = "flex-1 text-center";


    return (
        <div className="flex justify-center my-[10%]">
            <form onSubmit={handleRegister} className="flex w-[60%]">
                <div className="w-full flex">
                    <div className="w-[50%] border-r">
                        <div className="text-4xl text-[#aa8670] mx-auto w-max my-10"
                             style={{fontFamily: "'DynaPuff', cursive"}}>Kagu Machi
                        </div>
                        <div className="w-[50%] mx-auto">
                            <div
                                className={registerDivStyle}
                                tabIndex="0">
                                <CiUser/>
                                <input
                                    type="text"
                                    className={registerInput}
                                    placeholder="請輸入信箱"
                                    value={email}
                                    onChange={handleEmailChange}
                                />

                            </div>
                            {emailError && (
                                <p className="text-red-500 text-sm mt-1">{emailError}</p>
                            )}
                        </div>

                        <div className="w-[50%] mx-auto">
                            <div
                                className={`${registerDivStyle} my-4`}>
                                <CiLock/>
                                <input
                                    type="password"
                                    className={registerInput}
                                    placeholder="請輸入密碼"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            {passwordError && (
                                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                            )}
                        </div>
                        <div className="w-[50%] mx-auto text-center my-2">
                            <button
                                className="bg-[#aa8670] w-full rounded-xl p-1 hover:bg-white border border-[#aa8670]"
                                type="submit"
                            >
                                註冊
                            </button>
                        </div>
                        <div className="w-[50%] mx-auto text-xs m-3 text-gray-500">
                            <div className="hover:text-gray-900">忘記密碼？</div>
                        </div>
                    </div>
                    <div className="w-[40%] mt-12">
                        <div className="flex justify-center items-center">
                            <button
                                className={GoogleButton}
                                // onClick={handleGoogleRegister}
                            >
                                <FcGoogle size={25} className="mr-1"/>
                                {/* <span className="absolute left-1/2 -translate-x-1/2">使用Google登入</span> */}
                                <span className={GoogleSpan}>使用Google註冊</span>
                            </button>
                        </div>
                        <div className="w-full flex justify-center items-center my-3">
                            <button
                                className={GoogleButton}
                                // onClick={handleFacebookLogin}
                            >
                                <FaFacebook className="text-[#1677f2]  mr-1" size={25}/>
                                <span className={GoogleSpan}>使用Facebook註冊</span>
                            </button>
                        </div>
                        <div className="w-full flex justify-center items-center my-3">
                            <button
                                className={GoogleButton}
                                // onClick={handleFacebookLogin}
                            >
                                <MdOutlineMailOutline size={25}/>
                                <Link to="/login" className={GoogleSpan}>用信箱登入</Link>
                            </button>
                        </div>
                    </div>

                </div>
            </form>
        </div>

    )
}

export default Register