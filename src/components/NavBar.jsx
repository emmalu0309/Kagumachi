import {IoSearch} from "react-icons/io5";
import {LuUserRound} from "react-icons/lu";
import {MdAddShoppingCart} from "react-icons/md";
import {FaRegBell} from "react-icons/fa6";
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <div className="w-[95%] flex mx-auto my-6 items-center">
                <div
                    className="text-3xl text-[#aa8670] mr-20"
                    style={{fontFamily: "'DynaPuff', cursive"}}
                >
                    <Link to="/homepage">
                        Kagu Machi
                    </Link>
                </div>
                <div className="flex items-center border rounded-xl hover:border-[#aa8670] mr-5 w-[30%]">
                    <IoSearch className="m-1 text-xl"/>
                    <input
                        type="text"
                        placeholder="搜尋"
                        className="p-2 focus:outline-none"
                    />
                </div>
                <button className="ml-auto mr-6 flex items-center">
                    <LuUserRound className="m-1 text-xl"/>
                    <Link to="login">註冊 / 登入</Link>
                </button>
                <Link to="shoppingCart" className="mx-3">
                    <MdAddShoppingCart className="text-xl"/>
                </Link>
                <Link to="customersupport" className="mx-3">
                    <FaRegBell className="text-xl"/>
                </Link>
            </div>
        </div>
    );
};

export default NavBar;
