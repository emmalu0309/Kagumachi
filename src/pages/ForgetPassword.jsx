const ForgetPassword = () => {
    return(
        <div className="w-[40%] mx-auto border mt-20 text-center">
            <div className="text-2xl my-12">忘記密碼</div>
            <input type="text" className="p-2 w-[50%] border border-[#aa8670] rounded-xl focus:outline-none" placeholder="請輸入您的信箱" />
            <div className="bg-[#aa8670] w-[50%] rounded-xl p-2 hover:bg-white border border-[#aa8670] my-12 mx-auto">寄送驗證碼</div>
        </div>
    )

}
export default ForgetPassword