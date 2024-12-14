import { Link } from "react-router-dom";


const CategoryList = () => {
    const categoryTitle = "px-4 py-3 text-gray-800 relative group text-sm";
    const categoryHoverLine =
        "absolute bottom-0 left-0 w-full h-0.5 bg-blue-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-300";
    const smCategoryDiv = "absolute top-8 hidden w-60 bg-white shadow-lg border-t group-hover:block z-10";
    const smCategoryLi = "px-4 py-2 hover:bg-gray-200";
    return (
        <div className="flex items-center justify-between">
            <div className=" w-full border-b">
                <nav className="flex items-center justify-between bg-white  w-[90%] mx-auto p-4">
                    <div className="relative group">
                        <a href="#" className={categoryTitle}>
                            質感櫃子
                            <span className={categoryHoverLine}></span>
                        </a>

                        <div className={smCategoryDiv}>
                            <ul>
                                <li className={smCategoryLi}>
                                    <Link to="productpage">衣櫃</Link>
                                </li>
                                <li className={smCategoryLi}>鞋櫃</li>
                                <li className={smCategoryLi}>書櫃</li>
                                <li className={smCategoryLi}>櫥櫃</li>
                                <li className={smCategoryLi}>電視櫃</li>
                                <li className={smCategoryLi}>浴櫃</li>

                            </ul>
                        </div>
                    </div>
                    <div className="relative group">
                        <a href="#" className={categoryTitle}>
                            流行桌子
                            <span className={categoryHoverLine}></span>
                        </a>

                        <div className={smCategoryDiv}>
                            <ul>
                                <li className={smCategoryLi}>餐桌</li>
                                <li className={smCategoryLi}>茶几</li>
                                <li className={smCategoryLi}>書桌</li>
                                <li className={smCategoryLi}>升降桌</li>
                            </ul>
                        </div>
                    </div>
                    <div className="relative group">
                        <a href="#" className={categoryTitle}>
                            舒適椅子
                            <span className={categoryHoverLine}></span>
                        </a>

                        <div className={smCategoryDiv}>
                            <ul>
                                <li className={smCategoryLi}>餐椅</li>
                                <li className={smCategoryLi}>椅凳</li>
                                <li className={smCategoryLi}>辦公椅</li>
                                <li className={smCategoryLi}>電競椅</li>
                                <li className={smCategoryLi}>吧台椅</li>
                            </ul>
                        </div>
                    </div>
                    <div className="relative group">
                        <a href="#" className={categoryTitle}>
                            實用沙發
                            <span className={categoryHoverLine}></span>
                        </a>

                        <div className={smCategoryDiv}>
                            <ul>
                                <li className={smCategoryLi}>單人</li>
                                <li className={smCategoryLi}>雙人</li>
                                <li className={smCategoryLi}>L型</li>
                            </ul>
                        </div>
                    </div>
                    <div className="relative group">
                        <a href="#" className={categoryTitle}>
                            超美燈具
                            <span className={categoryHoverLine}></span>
                        </a>

                        <div className={smCategoryDiv}>
                            <ul>
                                <li className={smCategoryLi}>坎燈</li>
                                <li className={smCategoryLi}>吊燈</li>
                                <li className={smCategoryLi}>檯燈</li>
                                <li className={smCategoryLi}>壁燈</li>
                            </ul>
                        </div>
                    </div>
                    <div className="relative group">
                        <a href="#" className={categoryTitle}>
                            舒適寢具
                            <span className={categoryHoverLine}></span>
                        </a>

                        <div className={`${smCategoryDiv} right-0`}>
                            <ul>
                                <li className={smCategoryLi}>床架</li>
                                <li className={smCategoryLi}>床墊</li>
                                <li className={smCategoryLi}>床包/棉被/枕頭</li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default CategoryList