import { Outlet } from "react-router-dom";
import MemberInfoNavbar from "../components/MemberInfoNavbar";

function MemberInfo() {
  return (
    <>
      <MemberInfoNavbar />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default MemberInfo;
