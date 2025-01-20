import {IoSearch} from "react-icons/io5";
import {LuUserRound} from "react-icons/lu";
import {MdAddShoppingCart} from "react-icons/md";
import {Link} from "react-router-dom";
import {useContext, useEffect} from "react";
import {AuthContext} from "../context/AuthContext";

// By 大瑋
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const NavBar = () => {
    const {user, logout} = useContext(AuthContext);
    const {navbar} = useContext(AuthContext);
    console.log("NavBar值",navbar);
    console.log(user)

    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (query.trim()) {
                navigate(`/SearchOne?query=${encodeURIComponent(query)}`);
            }
        }
    };

    if (!navbar) {
        return <p>載入中...</p>;
    }

    return (
        <div>
            <div className="w-[95%] flex mx-auto my-6 items-center">
                <div
                    className="text-3xl text-[#aa8670] mr-20"
                    style={{fontFamily: "'DynaPuff', cursive"}}
                >
                    <Link to="/homepage">
                        {navbar.websitename}
                    </Link>
                </div>
                <div className="flex items-center border rounded-xl hover:border-[#aa8670] mr-5 w-[30%]">
                    <IoSearch className="m-1 text-xl"/>
                    <input
                        type="text"
                        placeholder="搜尋"
                        className="p-2 focus:outline-none"

                        value={query}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}

                    />
                </div>
                {user ? (
                    <div className="ml-auto mr-6 flex items-center">
                        {/*<Link to="/MemberInfo/MyOrders">訂單查詢 /{user.memberId} </Link>*/}
                        <Link to="/MemberInfo/MyOrders">訂單查詢 / </Link>
                        <button onClick={() => {
                            logout();
                            navigate('/homepage');
                        }}> &nbsp;登出
                        </button>
                    </div>
                ) : (
                    <button className="ml-auto mr-6 flex items-center">
                        <LuUserRound className="m-1 text-xl"/>
                        <Link to="login">註冊 / 登入</Link>
                    </button>
                )}

                <Link to="CartStep1">
                    <button className="mx-3">
                        <MdAddShoppingCart className="text-xl"/>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default NavBar;
