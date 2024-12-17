import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <div className="flex items-center justify-between w-[95%] mx-auto my-4">
                <div className="flex text-xl" >
                    <FaInstagram className="mr-2"/>
                    <FaFacebook className="mx-2"/>
                </div>

                <div>
                    <Link to="/loginAppLayout">登入後頁面&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                    <Link to="/aboutus">關於我們</Link>
                </div>

                <div>
                    <Link to="/qa">Q&A</Link>
                </div>
            </div>
            <hr />
            <div className="text-center my-4">家具町股份有限公司</div>
        </div>
    )
}

export default Footer