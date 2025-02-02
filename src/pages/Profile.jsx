import { FiFileText, FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Home from "../components/Home.jsx";

const schema = z
  .object({
    chinese_name: z
      .string()
      .nonempty("請輸入名字")
      .regex(/^[\u4e00-\u9fa5]+$/, "必須皆為中文字"),
    gender: z.string().refine((value) => value === "1" || value === "0", {
      message: "請選擇性別",
    }),
    birthday: z.string().nonempty("請選擇生日"),
    phone: z
      .string()
      .regex(
        /^[0-9]{4}-[0-9]{3}-[0-9]{3}$/,
        "請輸入有效的手機號碼，格式範例：0912-345-678。"
      ),
    email: z.string().email("請輸入有效的電子郵件"),
    password: z
      .string()
      .min(6, "密碼至少需要6個字")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s)[A-Za-z\d]{6,}$/,
        "密碼必須為大寫字母、小寫字母及數字的組合，且不可包含空白字元"
      )
      .optional()
      .or(z.string().length(0)),
    check_password: z.string().optional().or(z.string().length(0)),
    zip_code: z.string().nonempty("請選擇郵遞區號"),
    address: z.string().nonempty("請輸入聯絡地址"),
  })
  .refine((data) => {
    if (data.password && data.password.length > 0) {
      return data.password === data.check_password;
    }
    return true;
  }, {
    message: "確認密碼必須和修改密碼相同",
    path: ["check_password"],
  });

function Profile() {
  const { user } = useContext(AuthContext);
  const memberId = user.memberId;

  const [data, setData] = useState({
    chinese_name: "",
    gender: "",
    birthday: "",
    phone: "",
    email: "",
    zip_code: "",
    address: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: data,
  });

  useEffect(() => {
    fetch(`http://localhost:8080/profile?memberid=${memberId}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        reset(data);
      })
      .catch((error) => console.error("Error fetching profile data:", error));
  }, [reset, memberId]);

  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const onSubmit = (data) => {
    const selectedOption = document.querySelector(`#zip_code option[value="${data.zip_code}"]`);
    const county = selectedOption.textContent.split(" ")[1];
    const city = selectedOption.textContent.split(" ")[2];
    data.county = county;
    data.address = `${city}${data.address}`;
    data.memberid = memberId;
    setShowAnimation(true);
    console.log("送出的資料:", data);
    fetch("http://localhost:8080/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((result) => {
        console.log("Success:", result);
        setTimeout(() => {
          setShowAnimation(false);
        }, 1000);

      })
      .catch((error) => {
        console.error("Error:", error);
        setTimeout(() => {
          setShowAnimation(false);
        }, 1000);
      });
  };

  const titleLabel = "font-medium text-sm inline text-gray-600";
  const allLiExceptFirst = "mt-6 ml-12";

  return (
      <div className="flex flex-col items-center  mb-20 mt-10">
        <div className="mb-12 mx-auto border border-gray-200 w-8/12 rounded-xl">
          <form className="ml-10 my-5" onSubmit={handleSubmit(onSubmit)}>
            <FiFileText className="w-8 h-8 inline-block" color="gray"/>
            <h2 className="ml-3 text-xl text-gray-500 inline-block border-b border-gray-200 w-11/12">
              會員資料修改
            </h2>
            <ul>
              <li className="text-xs list-none ml-12 mt-5 mb-5">
              <span className="text-red-500">
                ※ 部分資料以 * 處理，保護您的個人隱私。
              </span>
              </li>

              <li className="inline ml-12">
                <label htmlFor="chinese_name" className={titleLabel}>
                  中文全名
                </label>
                <input
                    className="inline border border-gray-300 text-gray-500 ml-4 text-center w-[28.2%] h-8"
                    maxLength="20"
                    id="chinese_name"
                    {...register("chinese_name")}
                />

                <input
                    className="w-4 h-4 ml-5"
                    id="male"
                    type="radio"
                    value="1"
                    {...register("gender")}
                />
                <label
                    htmlFor="male"
                    className="text-xs ml-3 text-gray-600 align-text-top"
                >
                  先生
                </label>
                <input
                    className="w-4 h-4 ml-4"
                    id="female"
                    type="radio"
                    value="0"
                    {...register("gender")}
                />
                <label
                    htmlFor="female"
                    className="text-xs ml-3 text-gray-600 align-text-top"
                >
                  小姐
                </label>
                {errors.chinese_name && (
                    <p className="inline ml-4 text-red-500">
                      {errors.chinese_name.message}
                    </p>
                )}
                {errors.gender && (
                    <p className="inline ml-4 text-red-500">
                      {errors.gender.message}
                    </p>
                )}
              </li>

              <li className={allLiExceptFirst}>
                <div className="flex items-center pt-4">
                  <label htmlFor="birthday" className={titleLabel}>
                    生日
                  </label>
                  <input
                      className="inline border border-gray-300 text-gray-500 ml-11 text-center w-[30%] h-8"
                      id="birthday"
                      type="date"
                      {...register("birthday")}
                  />
                  {errors.birthday && (
                      <p className="inline ml-4 text-red-500">
                        {errors.birthday.message}
                      </p>
                  )}
                </div>
              </li>

              <li className={allLiExceptFirst}>
                <label htmlFor="phone" className={titleLabel}>
                  手機號碼
                </label>
                <input
                    className="inline border border-gray-300 text-gray-500 ml-4 text-center w-[30%] h-8"
                    id="phone"
                    type="tel"
                    {...register("phone")}
                />
                {errors.phone && (
                    <p className="inline ml-4 text-red-500">
                      {errors.phone.message}
                    </p>
                )}
              </li>

              <li className={allLiExceptFirst}>
                <label htmlFor="email" className={titleLabel}>
                  電子郵件
                </label>
                <input
                    className="inline border border-gray-300 text-gray-500 ml-4 text-center w-[30%] h-8"
                    id="email"
                    type="email"
                    {...register("email")}
                />
                {errors.email && (
                    <p className="inline ml-4 text-red-500">
                      {errors.email.message}
                    </p>
                )}
              </li>

              <li className={allLiExceptFirst}>
                <label htmlFor="password" className={titleLabel}>
                  修改密碼
                </label>
                <div className="relative inline">
                  <input
                      className="inline border border-gray-300 text-gray-500 ml-4 text-center w-[30%] h-8"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                  />
                  <button
                      type="button"
                      className="absolute right-6 top-2.5 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff/> : <FiEye/>}
                  </button>
                </div>
                {errors.password && (
                    <p className="inline ml-4 text-red-500">
                      {errors.password.message}
                    </p>
                )}
              </li>

              <li className={allLiExceptFirst}>
                <label htmlFor="check_password" className={titleLabel}>
                  確認密碼
                </label>
                <div className="relative inline">
                  <input
                      className="inline border border-gray-300 text-gray-500 ml-4 text-center w-[30%] h-8"
                      id="check_password"
                      type={showCheckPassword ? "text" : "password"}
                      {...register("check_password")}
                  />
                  <button
                      type="button"
                      className="absolute right-6 top-2.5 transform -translate-y-1/2"
                      onClick={() => setShowCheckPassword(!showCheckPassword)}
                  >
                    {showCheckPassword ? <FiEyeOff/> : <FiEye/>}
                  </button>
                </div>
                {errors.check_password && (
                    <p className="inline ml-4 text-red-500">
                      {errors.check_password.message}
                    </p>
                )}
              </li>

              <li className={allLiExceptFirst}>
                <label htmlFor="zip_code" className={titleLabel}>
                  聯絡地址
                </label>
                <select
                    className="text-gray-500 inline border border-gray-300 ml-4 text-center w-[20%] h-8"
                    id="zip_code"
                    {...register("zip_code")}
                >
                  <option value="" disabled>
                    請選擇郵遞區號
                  </option>
                  <option value="100">100 台北市 中正區</option>
                  <option value="103">103 台北市 大同區</option>
                  <option value="104">104 台北市 中山區</option>
                  <option value="105">105 台北市 松山區</option>
                  <option value="106">106 台北市 大安區</option>
                  <option value="108">108 台北市 萬華區</option>
                  <option value="110">110 台北市 信義區</option>
                  <option value="111">111 台北市 士林區</option>
                  <option value="112">112 台北市 北投區</option>
                  <option value="114">114 台北市 內湖區</option>
                  <option value="115">115 台北市 南港區</option>
                  <option value="116">116 台北市 文山區</option>
                  <option value="200">200 基隆市 仁愛區</option>
                  <option value="201">201 基隆市 信義區</option>
                  <option value="202">202 基隆市 中正區</option>
                  <option value="203">203 基隆市 中山區</option>
                  <option value="204">204 基隆市 安樂區</option>
                  <option value="205">205 基隆市 暖暖區</option>
                  <option value="206">206 基隆市 七堵區</option>
                  <option value="207">207 新北市 萬里區</option>
                  <option value="208">208 新北市 金山區</option>
                  <option value="220">220 新北市 板橋區</option>
                  <option value="221">221 新北市 汐止區</option>
                  <option value="222">222 新北市 深坑區</option>
                  <option value="223">223 新北市 石碇區</option>
                  <option value="224">224 新北市 瑞芳區</option>
                  <option value="226">226 新北市 平溪區</option>
                  <option value="227">227 新北市 雙溪區</option>
                  <option value="228">228 新北市 貢寮區</option>
                  <option value="231">231 新北市 新店區</option>
                  <option value="232">232 新北市 坪林區</option>
                  <option value="265">265 宜蘭縣 羅東鎮</option>
                  <option value="266">266 宜蘭縣 三星鄉</option>
                  <option value="267">267 宜蘭縣 大同鄉</option>
                  <option value="268">268 宜蘭縣 五結鄉</option>
                  <option value="269">269 宜蘭縣 冬山鄉</option>
                  <option value="270">270 宜蘭縣 蘇澳鎮</option>
                  <option value="272">272 宜蘭縣 南澳鄉</option>
                  <option value="300">300 新竹市 北區</option>
                  <option value="300">300 新竹市 東區</option>
                  <option value="300">300 新竹市 香山區</option>
                  <option value="300">300 新竹市</option>
                  <option value="302">302 新竹縣 竹北市</option>
                  <option value="303">303 新竹縣 湖口鄉</option>
                  <option value="304">304 新竹縣 新豐鄉</option>
                  <option value="305">305 新竹縣 新埔鎮</option>
                  <option value="306">306 新竹縣 關西鎮</option>
                  <option value="307">307 新竹縣 芎林鄉</option>
                  <option value="308">308 新竹縣 寶山鄉</option>
                  <option value="310">310 新竹縣 竹東鎮</option>
                  <option value="311">311 新竹縣 五峰鄉</option>
                  <option value="312">312 新竹縣 橫山鄉</option>
                  <option value="313">313 新竹縣 尖石鄉</option>
                  <option value="314">314 新竹縣 北埔鄉</option>
                  <option value="315">315 新竹縣 峨眉鄉</option>
                  <option value="320">320 桃園市 中壢區</option>
                  <option value="324">324 桃園市 平鎮區</option>
                  <option value="325">325 桃園市 龍潭區</option>
                  <option value="326">326 桃園市 楊梅區</option>
                  <option value="327">327 桃園市 新屋區</option>
                  <option value="328">328 桃園市 觀音區</option>
                  <option value="330">330 桃園市 桃園區</option>
                  <option value="333">333 桃園市 龜山區</option>
                  <option value="334">334 桃園市 八德區</option>
                  <option value="335">335 桃園市 大溪區</option>
                  <option value="336">336 桃園市 復興區</option>
                  <option value="337">337 桃園市 大園區</option>
                  <option value="338">338 桃園市 蘆竹區</option>
                  <option value="350">350 苗栗縣 竹南鎮</option>
                  <option value="351">351 苗栗縣 頭份市</option>
                  <option value="352">352 苗栗縣 三灣鄉</option>
                  <option value="353">353 苗栗縣 南庄鄉</option>
                  <option value="354">354 苗栗縣 獅潭鄉</option>
                  <option value="356">356 苗栗縣 後龍鎮</option>
                  <option value="357">357 苗栗縣 通霄鎮</option>
                  <option value="358">358 苗栗縣 苑裡鎮</option>
                  <option value="360">360 苗栗縣 苗栗市</option>
                  <option value="361">361 苗栗縣 造橋鄉</option>
                  <option value="362">362 苗栗縣 頭屋鄉</option>
                  <option value="363">363 苗栗縣 公館鄉</option>
                  <option value="364">364 苗栗縣 大湖鄉</option>
                  <option value="365">365 苗栗縣 泰安鄉</option>
                  <option value="366">366 苗栗縣 銅鑼鄉</option>
                  <option value="367">367 苗栗縣 三義鄉</option>
                  <option value="368">368 苗栗縣 西湖鄉</option>
                  <option value="369">369 苗栗縣 卓蘭鎮</option>
                  <option value="400">400 台中市 中區</option>
                  <option value="401">401 台中市 東區</option>
                  <option value="402">402 台中市 南區</option>
                  <option value="403">403 台中市 西區</option>
                  <option value="404">404 台中市 北區</option>
                  <option value="406">406 台中市 北屯區</option>
                  <option value="407">407 台中市 西屯區</option>
                  <option value="408">408 台中市 南屯區</option>
                  <option value="411">411 台中市 太平區</option>
                  <option value="412">412 台中市 大里區</option>
                  <option value="413">413 台中市 霧峰區</option>
                  <option value="414">414 台中市 烏日區</option>
                  <option value="420">420 台中市 豐原區</option>
                  <option value="421">421 台中市 后里區</option>
                  <option value="422">422 台中市 石岡區</option>
                  <option value="423">423 台中市 東勢區</option>
                  <option value="424">424 台中市 和平區</option>
                  <option value="426">426 台中市 新社區</option>
                  <option value="427">427 台中市 潭子區</option>
                  <option value="428">428 台中市 大雅區</option>
                  <option value="429">429 台中市 神岡區</option>
                  <option value="432">432 台中市 大肚區</option>
                  <option value="433">433 台中市 沙鹿區</option>
                  <option value="434">434 台中市 龍井區</option>
                  <option value="435">435 台中市 梧棲區</option>
                  <option value="436">436 台中市 清水區</option>
                  <option value="437">437 台中市 大甲區</option>
                  <option value="438">438 台中市 外埔區</option>
                  <option value="439">439 台中市 大安區</option>
                  <option value="500">500 彰化縣 彰化市</option>
                  <option value="502">502 彰化縣 芬園鄉</option>
                  <option value="503">503 彰化縣 花壇鄉</option>
                  <option value="504">504 彰化縣 秀水鄉</option>
                  <option value="505">505 彰化縣 鹿港鎮</option>
                  <option value="506">506 彰化縣 福興鄉</option>
                  <option value="507">507 彰化縣 線西鄉</option>
                  <option value="508">508 彰化縣 和美鎮</option>
                  <option value="509">509 彰化縣 伸港鄉</option>
                  <option value="510">510 彰化縣 員林市</option>
                  <option value="511">511 彰化縣 社頭鄉</option>
                  <option value="512">512 彰化縣 永靖鄉</option>
                  <option value="513">513 彰化縣 埔心鄉</option>
                  <option value="514">514 彰化縣 溪湖鎮</option>
                  <option value="515">515 彰化縣 大村鄉</option>
                  <option value="516">516 彰化縣 埔鹽鄉</option>
                  <option value="520">520 彰化縣 田中鎮</option>
                  <option value="521">521 彰化縣 北斗鎮</option>
                  <option value="522">522 彰化縣 田尾鄉</option>
                  <option value="523">523 彰化縣 埤頭鄉</option>
                  <option value="524">524 彰化縣 溪州鄉</option>
                  <option value="525">525 彰化縣 竹塘鄉</option>
                  <option value="526">526 彰化縣 二林鎮</option>
                  <option value="527">527 彰化縣 大城鄉</option>
                  <option value="528">528 彰化縣 芳苑鄉</option>
                  <option value="530">530 彰化縣 二水鄉</option>
                  <option value="540">540 南投縣 南投市</option>
                  <option value="541">541 南投縣 中寮鄉</option>
                  <option value="542">542 南投縣 草屯鎮</option>
                  <option value="544">544 南投縣 國姓鄉</option>
                  <option value="545">545 南投縣 埔里鎮</option>
                  <option value="546">546 南投縣 仁愛鄉</option>
                  <option value="551">551 南投縣 名間鄉</option>
                  <option value="552">552 南投縣 集集鎮</option>
                  <option value="553">553 南投縣 水里鄉</option>
                  <option value="555">555 南投縣 魚池鄉</option>
                  <option value="556">556 南投縣 信義鄉</option>
                  <option value="557">557 南投縣 竹山鎮</option>
                  <option value="558">558 南投縣 鹿谷鄉</option>
                  <option value="600">600 嘉義市 西區</option>
                  <option value="600">600 嘉義市 東區</option>
                  <option value="602">602 嘉義縣 番路鄉</option>
                  <option value="603">603 嘉義縣 梅山鄉</option>
                  <option value="604">604 嘉義縣 竹崎鄉</option>
                  <option value="605">605 嘉義縣 阿里山鄉</option>
                  <option value="606">606 嘉義縣 中埔鄉</option>
                  <option value="607">607 嘉義縣 大埔鄉</option>
                  <option value="608">608 嘉義縣 水上鄉</option>
                  <option value="611">611 嘉義縣 鹿草鄉</option>
                  <option value="612">612 嘉義縣 太保市</option>
                  <option value="613">613 嘉義縣 朴子市</option>
                  <option value="614">614 嘉義縣 東石鄉</option>
                  <option value="615">615 嘉義縣 六腳鄉</option>
                  <option value="616">616 嘉義縣 新港鄉</option>
                  <option value="621">621 嘉義縣 民雄鄉</option>
                  <option value="622">622 嘉義縣 大林鎮</option>
                  <option value="623">623 嘉義縣 溪口鄉</option>
                  <option value="624">624 嘉義縣 義竹鄉</option>
                  <option value="625">625 嘉義縣 布袋鎮</option>
                  <option value="630">630 雲林縣 斗南鎮</option>
                  <option value="631">631 雲林縣 大埤鄉</option>
                  <option value="632">632 雲林縣 虎尾鎮</option>
                  <option value="633">633 雲林縣 土庫鎮</option>
                  <option value="634">634 雲林縣 褒忠鄉</option>
                  <option value="635">635 雲林縣 東勢鄉</option>
                  <option value="636">636 雲林縣 台西鄉</option>
                  <option value="637">637 雲林縣 崙背鄉</option>
                  <option value="638">638 雲林縣 麥寮鄉</option>
                  <option value="640">640 雲林縣 斗六市</option>
                  <option value="643">643 雲林縣 林內鄉</option>
                  <option value="646">646 雲林縣 古坑鄉</option>
                  <option value="647">647 雲林縣 莿桐鄉</option>
                  <option value="648">648 雲林縣 西螺鎮</option>
                  <option value="649">649 雲林縣 二崙鄉</option>
                  <option value="651">651 雲林縣 北港鎮</option>
                  <option value="652">652 雲林縣 水林鄉</option>
                  <option value="653">653 雲林縣 口湖鄉</option>
                  <option value="654">654 雲林縣 四湖鄉</option>
                  <option value="655">655 雲林縣 元長鄉</option>
                  <option value="700">700 台南市 中西區</option>
                  <option value="701">701 台南市 東區</option>
                  <option value="702">702 台南市 南區</option>
                  <option value="704">704 台南市 北區</option>
                  <option value="708">708 台南市 安平區</option>
                  <option value="709">709 台南市 安南區</option>
                  <option value="710">710 台南市 永康區</option>
                  <option value="711">711 台南市 歸仁區</option>
                  <option value="712">712 台南市 新化區</option>
                  <option value="713">713 台南市 左鎮區</option>
                  <option value="714">714 台南市 玉井區</option>
                  <option value="715">715 台南市 楠西區</option>
                  <option value="716">716 台南市 南化區</option>
                  <option value="717">717 台南市 仁德區</option>
                  <option value="718">718 台南市 關廟區</option>
                  <option value="719">719 台南市 龍崎區</option>
                  <option value="720">720 台南市 官田區</option>
                  <option value="721">721 台南市 麻豆區</option>
                  <option value="722">722 台南市 佳里區</option>
                  <option value="723">723 台南市 西港區</option>
                  <option value="724">724 台南市 七股區</option>
                  <option value="725">725 台南市 將軍區</option>
                  <option value="726">726 台南市 學甲區</option>
                  <option value="727">727 台南市 北門區</option>
                  <option value="730">730 台南市 新營區</option>
                  <option value="731">731 台南市 後壁區</option>
                  <option value="732">732 台南市 白河區</option>
                  <option value="733">733 台南市 東山區</option>
                  <option value="734">734 台南市 六甲區</option>
                  <option value="735">735 台南市 下營區</option>
                  <option value="736">736 台南市 柳營區</option>
                  <option value="737">737 台南市 鹽水區</option>
                  <option value="741">741 台南市 善化區</option>
                  <option value="742">742 台南市 大內區</option>
                  <option value="743">743 台南市 山上區</option>
                  <option value="744">744 台南市 新市區</option>
                  <option value="745">745 台南市 安定區</option>
                  <option value="800">800 高雄市 新興區</option>
                  <option value="801">801 高雄市 前金區</option>
                  <option value="802">802 高雄市 苓雅區</option>
                  <option value="803">803 高雄市 鹽埕區</option>
                  <option value="804">804 高雄市 鼓山區</option>
                  <option value="805">805 高雄市 旗津區</option>
                  <option value="806">806 高雄市 前鎮區</option>
                  <option value="807">807 高雄市 三民區</option>
                  <option value="811">811 高雄市 楠梓區</option>
                  <option value="812">812 高雄市 小港區</option>
                  <option value="813">813 高雄市 左營區</option>
                  <option value="814">814 高雄市 仁武區</option>
                  <option value="815">815 高雄市 大社區</option>
                  <option value="820">820 高雄市 岡山區</option>
                  <option value="821">821 高雄市 路竹區</option>
                  <option value="822">822 高雄市 阿蓮區</option>
                  <option value="823">823 高雄市 田寮區</option>
                  <option value="824">824 高雄市 燕巢區</option>
                  <option value="825">825 高雄市 橋頭區</option>
                  <option value="826">826 高雄市 梓官區</option>
                  <option value="827">827 高雄市 彌陀區</option>
                  <option value="828">828 高雄市 永安區</option>
                  <option value="829">829 高雄市 湖內區</option>
                  <option value="830">830 高雄市 鳳山區</option>
                  <option value="831">831 高雄市 大寮區</option>
                  <option value="832">832 高雄市 林園區</option>
                  <option value="833">833 高雄市 鳥松區</option>
                  <option value="840">840 高雄市 大樹區</option>
                  <option value="842">842 高雄市 旗山區</option>
                  <option value="843">843 高雄市 美濃區</option>
                  <option value="844">844 高雄市 六龜區</option>
                  <option value="845">845 高雄市 內門區</option>
                  <option value="846">846 高雄市 杉林區</option>
                  <option value="847">847 高雄市 甲仙區</option>
                  <option value="848">848 高雄市 桃源區</option>
                  <option value="849">849 高雄市 那瑪夏區</option>
                  <option value="851">851 高雄市 茂林區</option>
                  <option value="852">852 高雄市 茄萣區</option>
                  <option value="880">880 澎湖縣 馬公市</option>
                  <option value="881">881 澎湖縣 西嶼鄉</option>
                  <option value="882">882 澎湖縣 望安鄉</option>
                  <option value="883">883 澎湖縣 七美鄉</option>
                  <option value="884">884 澎湖縣 白沙鄉</option>
                  <option value="885">885 澎湖縣 湖西鄉</option>
                  <option value="900">900 屏東縣 屏東市</option>
                  <option value="901">901 屏東縣 三地門鄉</option>
                  <option value="902">902 屏東縣 霧台鄉</option>
                  <option value="903">903 屏東縣 瑪家鄉</option>
                  <option value="904">904 屏東縣 九如鄉</option>
                  <option value="905">905 屏東縣 里港鄉</option>
                  <option value="906">906 屏東縣 高樹鄉</option>
                  <option value="907">907 屏東縣 鹽埔鄉</option>
                  <option value="908">908 屏東縣 長治鄉</option>
                  <option value="909">909 屏東縣 麟洛鄉</option>
                  <option value="911">911 屏東縣 竹田鄉</option>
                  <option value="912">912 屏東縣 內埔鄉</option>
                  <option value="913">913 屏東縣 萬丹鄉</option>
                  <option value="920">920 屏東縣 潮州鎮</option>
                  <option value="921">921 屏東縣 泰武鄉</option>
                  <option value="922">922 屏東縣 來義鄉</option>
                  <option value="923">923 屏東縣 萬巒鄉</option>
                  <option value="924">924 屏東縣 崁頂鄉</option>
                  <option value="925">925 屏東縣 新埤鄉</option>
                  <option value="926">926 屏東縣 南州鄉</option>
                  <option value="927">927 屏東縣 林邊鄉</option>
                  <option value="928">928 屏東縣 東港鎮</option>
                  <option value="929">929 屏東縣 琉球鄉</option>
                  <option value="931">931 屏東縣 佳冬鄉</option>
                  <option value="932">932 屏東縣 新園鄉</option>
                  <option value="940">940 屏東縣 枋寮鄉</option>
                  <option value="941">941 屏東縣 枋山鄉</option>
                  <option value="942">942 屏東縣 春日鄉</option>
                  <option value="943">943 屏東縣 獅子鄉</option>
                  <option value="944">944 屏東縣 車城鄉</option>
                  <option value="945">945 屏東縣 牡丹鄉</option>
                  <option value="946">946 屏東縣 恆春鎮</option>
                  <option value="947">947 屏東縣 滿州鄉</option>
                  <option value="950">950 台東縣 台東市</option>
                  <option value="951">951 台東縣 綠島鄉</option>
                  <option value="952">952 台東縣 蘭嶼鄉</option>
                  <option value="953">953 台東縣 延平鄉</option>
                  <option value="954">954 台東縣 卑南鄉</option>
                  <option value="955">955 台東縣 鹿野鄉</option>
                  <option value="956">956 台東縣 關山鎮</option>
                  <option value="957">957 台東縣 海端鄉</option>
                  <option value="958">958 台東縣 池上鄉</option>
                  <option value="959">959 台東縣 東河鄉</option>
                  <option value="961">961 台東縣 成功鎮</option>
                  <option value="962">962 台東縣 長濱鄉</option>
                  <option value="963">963 台東縣 太麻里鄉</option>
                  <option value="964">964 台東縣 金峰鄉</option>
                  <option value="965">965 台東縣 大武鄉</option>
                  <option value="966">966 台東縣 達仁鄉</option>
                  <option value="970">970 花蓮縣 花蓮市</option>
                  <option value="971">971 花蓮縣 新城鄉</option>
                  <option value="972">972 花蓮縣 秀林鄉</option>
                  <option value="973">973 花蓮縣 吉安鄉</option>
                  <option value="974">974 花蓮縣 壽豐鄉</option>
                  <option value="975">975 花蓮縣 鳳林鎮</option>
                  <option value="976">976 花蓮縣 光復鄉</option>
                  <option value="977">977 花蓮縣 豐濱鄉</option>
                  <option value="978">978 花蓮縣 瑞穗鄉</option>
                  <option value="979">979 花蓮縣 萬榮鄉</option>
                  <option value="981">981 花蓮縣 玉里鎮</option>
                  <option value="982">982 花蓮縣 卓溪鄉</option>
                  <option value="983">983 花蓮縣 富里鄉</option>
                  <option value="890">890 金門縣 金沙鎮</option>
                  <option value="891">891 金門縣 金湖鎮</option>
                  <option value="892">892 金門縣 金寧鄉</option>
                  <option value="893">893 金門縣 金城鎮</option>
                  <option value="894">894 金門縣 烈嶼鄉</option>
                  <option value="896">896 金門縣 烏坵鄉</option>
                  <option value="209">209 連江縣 南竿鄉</option>
                  <option value="210">210 連江縣 北竿鄉</option>
                  <option value="211">211 連江縣 莒光鄉</option>
                  <option value="212">212 連江縣 東引鄉</option>
                  <option value="817">817 南海諸島 東沙</option>
                  <option value="819">819 南海諸島 南沙</option>
                </select>
                <input
                    className="inline border border-gray-300 text-gray-500 ml-4 w-[36%] h-8 pl-2"
                    {...register("address")}
                />
                {errors.zip_code && (
                    <p className="inline ml-4 text-red-500">
                      {errors.zip_code.message}
                    </p>
                )}
                {errors.address && (
                    <p className="inline ml-4 text-red-500">
                      {errors.address.message}
                    </p>
                )}
              </li>
            </ul>

            <div className="flex justify-center">
              <button
                  className="absolute mt-16 px-20 py-3 border border-gray-300 rounded-md bg-[#5E3B25] text-gray-100 hover:bg-[#C3A789] hover:text-gray-100 hover:cursor-pointer w-[13%]">
                送出
              </button>
              {showAnimation && (
                  <div className="text-[#aeddef] absolute transform -translate-x-1/2 pt-11 pl-3 animate-riseAndFade">
                    會員資料已修改！
                  </div>
              )}
            </div>
          </form>


        </div>
        <div className="mt-[5%] w-8/12">
          <Home/>
        </div>
      </div>
  );
}

export default Profile;
