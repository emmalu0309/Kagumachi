import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const { token } = useParams(); // 取得 URL 中的 token
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage("");

        if (password !== confirmPassword) {
            setMessage("密碼不匹配，請重新輸入！");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/login/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("密碼重設成功，將自動跳轉至登入頁...");
                setTimeout(() => navigate("/login"), 3000);
            } else {
                setMessage(data.message || "重設密碼失敗！");
            }
        } catch (error) {
            console.error("錯誤:", error);
            setMessage("無法連接伺服器，請稍後再試！");
        }
    };

    return (
        <div className="flex flex-col items-center mt-[10%] min-h-screen">
            <h2 className="text-2xl font-bold mb-4">重設密碼</h2>
            <form onSubmit={handleResetPassword} className="w-96 p-6 border rounded-lg shadow-lg">
                <input
                    type="password"
                    placeholder="輸入新密碼"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <input
                    type="password"
                    placeholder="確認新密碼"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-[#aa8670] p-2 rounded hover:bg-white border border-[#aa8670]"
                >
                    設定新密碼
                </button>
                {message && <p className="mt-4 text-center text-sm">{message}</p>}
            </form>
        </div>
    );
};

export default ResetPassword;