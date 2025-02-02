import {FaInstagram} from "react-icons/fa";
import {FaFacebook} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";

const Footer = () => {

    const {navbar} = useContext(AuthContext);
    if (!navbar) {
        return <p>載入中...</p>;
    }
    return (
        <div>
            <div className="flex items-center justify-between w-[95%] mx-auto my-6 mt-10">
                <div className="flex text-xl">
                    <Link to={navbar.footerinstagramlink}><FaInstagram className="mr-2"/></Link>
                    <Link to={navbar.footerfacebooklink}><FaFacebook className="mx-2"/></Link>
                </div>

                <div>
                    <Link to="/aboutus">關於我們</Link>
                </div>

                <div>
                    <Link to="/qa">Q&A</Link>
                </div>
            </div>
            <hr/>

            <div className="text-center my-4">
                <Link to="/home">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家具町股份有限公司
                </Link>
                </div>
        </div>
    )
}

export default Footer