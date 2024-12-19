import { Outlet } from "react-router-dom";
import LoginNavbar from "../components/LoginNavbar";

function AppLayout() {
  return (
    <>
      <LoginNavbar />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default AppLayout;
