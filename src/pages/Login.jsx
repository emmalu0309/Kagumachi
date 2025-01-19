import {CiUser, CiLock} from "react-icons/ci";
import {FcGoogle} from "react-icons/fc";
import {FaFacebook} from "react-icons/fa";
import {MdOutlineMailOutline} from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useContext(AuthContext);
    const {signInWithGoogle} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const memberData = {
            email,
            password,
        };

        try {
            const response = await fetch(`http://localhost:8080/login/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(memberData),
            });

            if (!response.ok) {
                throw new Error("登入失敗!");
            }
            const data = await response.json();
            login({memberId: data.memberId, token: data.token});

            // alert("登入成功");
            navigate("/MemberInfo/MyOrders");
        } catch (err) {
            console.error("登入失敗", err);

        }
    }
    return (
        <div className="flex justify-center my-[10%]">
            <form onSubmit={handleLogin} className="flex w-[60%]">
                <div className="w-full flex">
                    <div className="w-[60%] border-r">
                        <div className="text-4xl text-[#aa8670] mx-auto w-max my-10"
                             style={{fontFamily: "'DynaPuff', cursive"}}>Kagu Machi
                        </div>
                        <div
                            className="w-[50%] mx-auto px-2 flex border items-center focus-within:border-2 focus-within:border-[#aa8670]"
                            tabIndex="0">
                            <CiUser/>
                            <input
                                type="text"
                                className=" ml-2 p-1 outline-none w-full"
                                placeholder="請輸入信箱"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div
                            className="w-[50%] mx-auto px-2 flex my-4 border items-center focus-within:border-2 focus-within:border-[#aa8670]">
                            <CiLock/>
                            <input
                                type="password"
                                className=" ml-2 p-1 outline-none w-full"
                                placeholder="請輸入密碼"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="w-[50%] mx-auto text-center my-2">
                            <button
                                className="bg-[#aa8670] w-full rounded-xl p-1 hover:bg-white border border-[#aa8670]"
                                type="submit"
                            >
                                登入
                            </button>
                        </div>
                        <div className="w-[50%] mx-auto text-xs m-3 text-gray-500">
                            <Link to="/forgetPassword" className="hover:text-gray-900">忘記密碼？</Link>

                        </div>
                    </div>
                    <div className="w-[40%] mt-12">
                        <div className="flex justify-center items-center">
                            <button
                                className="w-[65%] flex items-center justify-between px-4 py-2 border border-gray-400 rounded-lg hover:bg-[#f7f7f8]"
                                onClick={signInWithGoogle}
                            >
                                <FcGoogle size={25}/>
                                <span className="flex-1 text-center ">使用Google登入</span>
                            </button>
                        </div>
                        <div className="w-full flex justify-center items-center my-3">
                            <button
                                className="w-[65%] flex items-center justify-between px-4 py-2 border border-gray-400 rounded-lg hover:bg-[#f7f7f8]"
                                // onClick={handleFacebookLogin}
                            >
                                <FaFacebook className="text-[#1677f2]" size={25}/>
                                <span className="flex-1 text-center ">使用Facebook登入</span>
                            </button>
                        </div>
                        <div className="w-full flex justify-center items-center my-3">
                            <button
                                className="w-[65%] flex items-center justify-between px-4 py-2 border border-gray-400 rounded-lg hover:bg-[#f7f7f8]"
                                // onClick={handleFacebookLogin}
                            >
                                <MdOutlineMailOutline size={25}/>
                                <Link to="/register" className="flex-1 text-center ">註冊帳號</Link>
                            </button>
                        </div>
                    </div>

                </div>
            </form>
        </div>

    )
}

export default Login