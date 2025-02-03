import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Deletemember = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        if (!user) {
            alert("請先登入");
            navigate("/login");
            return;
        }

        const confirmDelete = window.confirm("確定要刪除帳號嗎？此操作無法恢復。");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:8080/member/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ memberId: user.memberId }),
            });

            if (response.ok) {
                alert("帳號已成功刪除");
                logout();  // 清除登入狀態
                navigate("/");  // 導回首頁
            } else {
                throw new Error("帳號刪除失敗，請稍後再試。");
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <h1 className="text-2xl font-bold mb-4">刪除帳號資料</h1>
            <p className="text-gray-600 mb-6">
                若要刪除您的帳號及所有資料，請點擊下方的「刪除帳號」按鈕。此操作無法恢復。
            </p>
            <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            >
                刪除帳號
            </button>
        </div>
    );
};

export default Deletemember;