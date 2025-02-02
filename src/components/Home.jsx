import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext.jsx";
import { TiHomeOutline } from "react-icons/ti";

const Home = () => {

    // const [homeData, setHomeData] = useState({
    //     doorwidth: "",
    //     doorheight: "",
    //     elevatorwidth: "",
    //     elevatorheight: "",
    //     elevatordepth: "",
    //     stairheight: "",
    //     stairwidth: ""
    // });
    //
    // const { user } = useContext(AuthContext);
    // const memberId = user.memberId;
    //
    // useEffect(() => {
    //     fetch(`http://localhost:8080/home/${memberId}`)
    //         .then(response => response.json())
    //         .then(data => setHomeData(data))
    //         .catch(error => console.error("Error fetching home data:", error));
    // }, [memberId]);
    //
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setHomeData(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // };
    //
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     fetch(`http://localhost:8080/home/${memberId}`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ ...homeData, memberid: memberId }),
    //     })
    //         .then(response => response.text())
    //         .then(result => console.log("Success:", result))
    //         .catch(error => console.error("Error updating home data:", error));
    // };

    const { user,fetchHomeData, homeData, updateHomeData } = useContext(AuthContext);
    const [localHomeData, setLocalHomeData] = useState(homeData || {
        doorwidth: "",
        doorheight: "",
        elevatorwidth: "",
        elevatorheight: "",
        elevatordepth: "",
        stairheight: "",
        stairwidth: ""
    });

    useEffect(() => {
        if (user?.memberId) {
            fetchHomeData(user.memberId);
        }
    }, [user, fetchHomeData]);

    useEffect(() => {
        if (homeData) {
            setLocalHomeData(homeData);
        }
    }, [homeData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalHomeData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateHomeData(localHomeData);
    };


    const labelStyle = "block text-sm font-medium text-gray-600 inline-block w-[4%]";
    const inputStyle = "border border-gray-300 text-gray-500 w-[30%] h-8 pl-2 mt-1";
    return (
        <div className=" mt-6 w-full">
            <div className="mb-12 mx-auto border border-gray-200 rounded-xl">
                <form className="ml-10 my-5">
                    <TiHomeOutline className="w-8 h-8 inline-block" color="gray"/>
                    <h2 className="ml-3 text-xl text-gray-500 inline-block border-b border-gray-200 w-11/12">
                        家尺寸資料修改
                    </h2>
                    <div className="mt-6 ml-12">
                        <label className={labelStyle}>大門寬</label>
                        <input name="doorwidth" value={localHomeData.doorwidth} onChange={handleChange}
                               className={inputStyle}/>
                    </div>
                    <div className="mt-5 ml-12">
                        <label className={labelStyle}>大門高</label>
                        <input name="doorheight" value={localHomeData.doorheight} onChange={handleChange}
                               className={inputStyle}/>
                    </div>
                    <div className="mt-5 ml-12">
                        <label className={labelStyle}>電梯寬</label>
                        <input name="elevatorwidth" value={localHomeData.elevatorwidth} onChange={handleChange}
                               className={inputStyle}/>
                    </div>
                    <div className="mt-5 ml-12">
                        <label className={labelStyle}>電梯高</label>
                        <input name="elevatorheight" value={localHomeData.elevatorheight} onChange={handleChange}
                               className={inputStyle}/>
                    </div>
                    <div className="mt-5 ml-12">
                        <label className={labelStyle}>電梯深</label>
                        <input name="elevatordepth" value={localHomeData.elevatordepth} onChange={handleChange}
                               className={inputStyle}/>
                    </div>
                    <div className="mt-4 ml-12">
                        <label className={labelStyle}>樓梯高</label>
                        <input name="stairheight" value={localHomeData.stairheight} onChange={handleChange}
                               className={inputStyle}/>
                    </div>
                    <div className="mt-5 ml-12">
                        <label className={labelStyle}>樓梯寬</label>
                        <input name="stairwidth" value={localHomeData.stairwidth} onChange={handleChange}
                               className={inputStyle}/>
                    </div>


                </form>
            </div>
            <div className="flex justify-center mt-2">
                <button
                    onClick={handleSubmit}
                    className="w-[20%]  px-20 py-3 border border-gray-300 rounded-md bg-[#5E3B25] text-gray-100 hover:bg-[#C3A789] hover:text-gray-100 hover:cursor-pointer">
                    儲存尺寸
                </button>
            </div>
        </div>
    );
};

export default Home;