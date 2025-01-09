import React, { useState } from "react";

const CreditForm = () => {
    return (
        <div className="border p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold mb-4">信用卡資訊</h2>
            <form>
                {/* 信用卡卡號 */}
                <div className="mb-4 flex items-center">
                    <label className="w-1/6 text-gray-700 text-base" htmlFor="name">
                        信用卡卡號
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="限使用台灣核發之信用卡"
                        className="flex-1 px-4 py-2 rounded-md focus:outline-none"
                    />
                </div>

                {/* 有效日期 */}
                <div className="mb-4 flex items-center">
                    <label className="w-1/6 text-gray-700 text-base" htmlFor="name">
                        有效期限
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="MM / YY"
                        className="flex-1 px-4 py-2 rounded-md focus:outline-none"
                    />
                </div>

                {/* 背面末三碼 */}
                <div className="mb-4 flex items-center">
                    <label className="w-1/6 text-gray-700 text-base" htmlFor="name">
                        背面末三碼
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="信用卡背面末三碼"
                        className="flex-1 px-4 py-2 rounded-md focus:outline-none"
                    />
                </div>

                {/* 安全信息 */}
                <div className="mb-4 flex items-center">
                    <label className=" text-gray-700 text-base" htmlFor="name">
                        ※ 提供VISA、MasterCard、JCB信用卡交易、全程使用安全加密、信用卡資料將不會儲存於網站、您可以安心使用信用卡付款。
                    </label>
                </div>

            </form>
        </div>
    );
};

export default CreditForm;
