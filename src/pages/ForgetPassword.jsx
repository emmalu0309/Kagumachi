import { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("http://localhost:8080/login/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("重設密碼的連結已發送到您的信箱！");
            } else {
                setMessage(data.message || "請確認輸入的信箱是否正確！");
            }
        } catch (error) {
            console.error("錯誤:", error);
            setMessage("發送失敗，請稍後再試！");
        }
    };

    return (
        <div className="flex flex-col items-center mt-[10%] min-h-screen">
            <h2 className="text-2xl font-bold mb-4">忘記密碼</h2>
            <form onSubmit={handleForgotPassword} className="w-96 p-6 border rounded-lg shadow-lg">
                <input
                    type="email"
                    placeholder="輸入您的信箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-[#aa8670]  p-2 rounded hover:bg-white border border-[#aa8670]"
                >
                    發送重設密碼郵件
                </button>
                {message && <p className="mt-4 text-center text-sm">{message}</p>}
            </form>
        </div>
    );
};

export default ForgotPassword;