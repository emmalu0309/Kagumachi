import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import CategoryList from "./CategoryList";

const AppLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <CategoryList />
            <div className="flex-grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default AppLayout;