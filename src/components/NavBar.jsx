import { IoSearch } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
// By 大瑋
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

  const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
          event.preventDefault();
          if (query.trim()) {
              navigate(`/SearchTwo?query=${encodeURIComponent(query)}`);
          }
      }
  };

  return (
    <div>
      <div className="w-[95%] flex mx-auto my-6 items-center">
        <div
          className="text-3xl text-[#aa8670] mr-20"
          style={{ fontFamily: "'DynaPuff', cursive" }}
        >
          <Link to="/homepage">
          Kagu Machi
            </Link>
        </div>
        <div className="flex items-center border rounded-xl hover:border-[#aa8670] mr-5 w-[30%]">
          <IoSearch className="m-1 text-xl" />
          <input
            type="text"
            placeholder="搜尋"
            className="p-2 focus:outline-none"

            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}

          />
        </div>
        <button className="ml-auto mr-6 flex items-center">
          <LuUserRound className="m-1 text-xl" />
          <Link to="login">註冊 / 登入</Link>
        </button>
        <Link to="CartStep1">
          <button className="mx-3">
            <MdAddShoppingCart className="text-xl" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
