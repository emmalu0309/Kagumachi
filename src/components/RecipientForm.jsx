import React, { useState, useEffect } from "react";

const cityDistrictData = {
    台北市: ["中正區", "大同區", "中山區", "松山區", "大安區", "萬華區", "信義區", "士林區", "北投區", "內湖區", "南港區", "文山區"],
    新北市: ["板橋區", "新莊區", "中和區", "永和區", "三重區", "土城區", "蘆洲區", "汐止區", "淡水區", "樹林區", "三峽區", "瑞芳區", "五股區", "泰山區", "林口區", "鶯歌區", "平溪區", "雙溪區", "貢寮區", "金山區", "萬里區", "石門區", "三芝區"],
    桃園市: ["桃園區", "中壢區", "平鎮區", "八德區", "楊梅區", "蘆竹區", "大溪區", "龍潭區", "龜山區", "大園區", "觀音區", "新屋區", "復興區"],
    台中市: ["中區", "東區", "南區", "西區", "北區", "北屯區", "西屯區", "南屯區", "大里區", "太平區", "霧峰區", "烏日區", "豐原區", "后里區", "石岡區", "東勢區", "和平區", "新社區", "潭子區", "大雅區", "神岡區", "大肚區", "沙鹿區", "龍井區", "梧棲區", "清水區", "大甲區", "外埔區", "大安區"],
    台南市: ["中西區", "東區", "南區", "北區", "安平區", "安南區", "永康區", "歸仁區", "新化區", "左鎮區", "玉井區", "楠西區", "南化區", "仁德區", "關廟區", "龍崎區", "官田區", "麻豆區", "佳里區", "西港區", "七股區", "將軍區", "學甲區", "北門區", "新營區", "後壁區", "白河區", "東山區", "六甲區", "下營區", "柳營區", "鹽水區", "善化區", "大內區", "山上區", "新市區", "安定區"],
    高雄市: ["新興區", "前金區", "苓雅區", "鹽埕區", "鼓山區", "旗津區", "前鎮區", "三民區", "左營區", "楠梓區", "小港區", "仁武區", "大社區", "岡山區", "路竹區", "阿蓮區", "田寮區", "燕巢區", "橋頭區", "梓官區", "彌陀區", "永安區", "湖內區", "鳳山區", "大寮區", "林園區", "鳥松區", "大樹區", "旗山區", "美濃區", "六龜區", "內門區", "杉林區", "甲仙區", "桃源區", "那瑪夏區", "茂林區"],
    基隆市: ["仁愛區", "信義區", "中正區", "中山區", "安樂區", "暖暖區", "七堵區"],
    新竹市: ["東區", "北區", "香山區"],
    新竹縣: ["竹北市", "竹東鎮", "新埔鎮", "關西鎮", "湖口鄉", "新豐鄉", "芎林鄉", "橫山鄉", "北埔鄉", "寶山鄉", "峨眉鄉", "尖石鄉", "五峰鄉"],
    苗栗縣: ["苗栗市", "頭份市", "竹南鎮", "後龍鎮", "卓蘭鎮", "通霄鎮", "苑裡鎮", "造橋鄉", "三義鄉", "西湖鄉", "銅鑼鄉", "公館鄉", "大湖鄉", "泰安鄉", "南庄鄉", "三灣鄉"],
    彰化縣: ["彰化市", "和美鎮", "鹿港鎮", "員林市", "溪湖鎮", "二林鎮", "北斗鎮", "田中鎮", "花壇鄉", "芬園鄉", "大村鄉", "永靖鄉", "埔心鄉", "溪州鄉", "竹塘鄉", "埤頭鄉", "二水鄉", "線西鄉", "伸港鄉", "福興鄉", "秀水鄉", "田尾鄉", "社頭鄉"],
    南投縣: ["南投市", "埔里鎮", "草屯鎮", "竹山鎮", "集集鎮", "名間鄉", "鹿谷鄉", "水里鄉", "國姓鄉", "信義鄉", "魚池鄉", "仁愛鄉"],
    雲林縣: ["斗六市", "斗南鎮", "虎尾鎮", "西螺鎮", "土庫鎮", "北港鎮", "莿桐鄉", "林內鄉", "古坑鄉", "大埤鄉", "褒忠鄉", "東勢鄉", "台西鄉", "崙背鄉", "麥寮鄉", "二崙鄉", "元長鄉", "四湖鄉", "口湖鄉", "水林鄉"],
    嘉義市: ["東區", "西區"],
    嘉義縣: ["太保市", "朴子市", "大林鎮", "布袋鎮", "民雄鄉", "溪口鄉", "新港鄉", "六腳鄉", "東石鄉", "義竹鄉", "鹿草鄉", "水上鄉", "中埔鄉", "竹崎鄉", "番路鄉", "梅山鄉", "阿里山鄉"],
    屏東縣: ["屏東市", "潮州鎮", "東港鎮", "恆春鎮", "萬丹鄉", "長治鄉", "麟洛鄉", "九如鄉", "里港鄉", "鹽埔鄉", "高樹鄉", "萬巒鄉", "內埔鄉", "竹田鄉", "新埤鄉", "枋寮鄉", "新園鄉", "崁頂鄉", "林邊鄉", "南州鄉", "佳冬鄉", "琉球鄉", "車城鄉", "滿州鄉", "枋山鄉", "霧台鄉", "瑪家鄉", "泰武鄉", "來義鄉", "春日鄉", "獅子鄉", "牡丹鄉", "三地門鄉"],
    宜蘭縣: ["宜蘭市", "羅東鎮", "蘇澳鎮", "頭城鎮", "礁溪鄉", "壯圍鄉", "員山鄉", "冬山鄉", "五結鄉", "三星鄉", "大同鄉", "南澳鄉"],
    花蓮縣: ["花蓮市", "鳳林鎮", "玉里鎮", "新城鄉", "吉安鄉", "壽豐鄉", "光復鄉", "豐濱鄉", "瑞穗鄉", "萬榮鄉", "卓溪鄉"],
    台東縣: ["台東市", "成功鎮", "關山鎮", "卑南鄉", "鹿野鄉", "池上鄉", "東河鄉", "長濱鄉", "太麻里鄉", "大武鄉", "綠島鄉", "海端鄉", "延平鄉", "金峰鄉", "達仁鄉"],
    金門縣: ["金城鎮", "金湖鎮", "金沙鎮", "金寧鄉", "烈嶼鄉", "烏坵鄉"],
    連江縣: ["南竿鄉", "北竿鄉", "莒光鄉", "東引鄉"],
    澎湖縣: ["馬公市", "湖西鄉", "白沙鄉", "西嶼鄉", "望安鄉", "七美鄉"]
};

const RecipientForm = ({ register, errors, shipRateData, setSelectedShipRate, phoneValue, handlePhoneChange, setValue }) => {
    const [selectedCity, setSelectedCity] = useState("");
    const [districts, setDistricts] = useState([]);
    const [minDate, setMinDate] = useState("");

    const handleCityChange = (event) => {
        const city = event.target.value;

        setSelectedCity(city);
        setDistricts(cityDistrictData[city] || []);
        setValue("city", city); // 同步到 React Hook Form

        const city2 = city.slice(0, 2);
        for (let i = 0; i < shipRateData.length; i++) {
            if (city2 === shipRateData[i].region) {
                setSelectedShipRate(shipRateData[i].rate);
            }
        }
    };

    useEffect(() => {
        // 設定最小日期為當下日期 + 3 天
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 3);
        const formattedDate = futureDate.toISOString().split("T")[0];
        setMinDate(formattedDate);
    }, []);

    return (
        <div className="border p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold mb-4">收件人資訊</h2>

            {/* 姓名 */}
            <div className="mb-4 flex items-center">
                <label className="w-1/6 text-gray-700 text-base" htmlFor="chinese_name">
                    姓名
                </label>
                <input
                    id="chineseName"
                    type="text"
                    placeholder="請輸入姓名"
                    className="flex-1 px-4 py-2 rounded-md focus:outline-none "
                    {...register("chineseName")}
                />
                {errors.chinese_name && (
                    <p className="inline ml-4 text-red-500">
                        {errors.chinese_name.message}
                    </p>
                )}
            </div>

            {/* 手機號碼 */}
            <div className="mb-4 flex items-center">
                <label className="w-1/6 text-gray-700 text-base" htmlFor="phone">
                    手機號碼
                </label>
                <input
                    id="phone"
                    type="text"
                    placeholder="請輸入手機號碼"
                    className="flex-1 px-4 py-2 rounded-md focus:outline-none"
                    {...register("phone")}
                    value={phoneValue}
                    onChange={handlePhoneChange} // 自動格式化
                />
                {errors.phone && (
                    <p className="inline ml-4 text-red-500">
                        {errors.phone.message}
                    </p>
                )}
            </div>

            {/* 選單 */}
            <div className="mb-4 flex items-center">
                <div className="flex flex-1 gap-4 items-center">
                    {/* 縣市選單 */}
                    <label className="w-1/4 text-gray-700 text-base" htmlFor="city">
                        請選擇縣市
                    </label>
                    <select
                        id="city"
                        value={selectedCity}
                        className="w-1/2 px-4 py-2 rounded-md focus:outline-none"
                        onChange={(event) => {
                            handleCityChange(event); // 更新 selectedCity 狀態
                        }}>

                        <option value="" disabled >
                            請選擇縣市
                        </option>
                        {Object.keys(cityDistrictData).map((city) => {
                            return (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            )
                        })}
                    </select>

                    {/* 地區選單 */}
                    <label className="w-1/4 text-gray-700 text-base" htmlFor="district">
                        請選擇地區
                    </label>
                    <select
                        id="district"
                        disabled={!selectedCity}
                        className="w-1/2 px-4 py-2 rounded-md focus:outline-none"
                        {...register("district")}
                    >
                        <option value="" disabled>
                            {selectedCity ? "請選擇地區" : "請先選擇縣市"}
                        </option>
                        {districts.map((district) => {
                            return (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>

            {/* 地址 */}
            <div className="mb-4 flex items-center">
                <label className="w-1/6 text-gray-700 text-base" htmlFor="address">
                    請輸入地址
                </label>
                <input
                    id="address"
                    type="text"
                    placeholder="請輸入地址"
                    className="flex-1 px-4 py-2 rounded-md focus:outline-none"
                    {...register("address")}
                />
                {errors.address && (
                    <p className="inline ml-4 text-red-500">
                        {errors.address.message}
                    </p>
                )}
            </div>

            {/* 預計送達日 */}
            <div className="mb-4 flex items-center">
                <label className="w-1/6 text-gray-700 text-base" htmlFor="deliveryDate">
                    希望送達日期
                </label>
                <input
                    id="deliveryDate"
                    type="date"
                    placeholder="請輸入日期"
                    min={minDate}
                    className="flex-1 px-4 py-2 rounded-md focus:outline-none"
                    {...register("deliveryDate")}
                />
                {errors.deliveryDate && (
                    <p className="inline ml-4 text-red-500">
                        {errors.deliveryDate.message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default RecipientForm;
