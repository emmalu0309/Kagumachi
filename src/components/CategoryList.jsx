import { Link } from "react-router-dom";
import {useEffect, useState} from "react";

const CategoryList = () => {

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState({});

    useEffect(() => {
        const fetchMainCategories = async () => {
            try {
                const response = await fetch("http://localhost:8080/products/main");
                if (!response.ok) {
                    throw new Error("Failed to fetch main categories");
                }
                const data = await response.json();

                // 過濾掉 status !== "sale" 的分類
                const filteredCategories = data.filter(category => category.status === "sale");

                setCategories(filteredCategories);
            } catch (error) {
                console.error("Error fetching main categories:", error);
            }
        };

        fetchMainCategories();
    }, []);

    const fetchSubCategories = async (mainCategoryId) => {
        if (subCategories[mainCategoryId]) return; // 如果已經載入過就不重複請求
        try {
            const response = await fetch(`http://localhost:8080/products/sub?mainCategoryId=${mainCategoryId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch subcategories");
            }
            const data = await response.json();

            // 過濾掉 `status !== "sale"` 的小分類
            const filteredSubCategories = data.filter(subCategory => subCategory.status === "sale");

            setSubCategories((prev) => ({
                ...prev,
                [mainCategoryId]: filteredSubCategories, // 記錄這個大分類對應的小分類
            }));
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };


    const categoryTitle = "px-4 py-3 text-gray-800 relative group text-sm";
    const categoryHoverLine =
        "absolute bottom-0 left-0 w-full h-0.5 bg-blue-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-300";
    const smCategoryDiv = "absolute top-8 hidden w-60 bg-white shadow-lg border-t group-hover:block z-10";
    const smCategoryLi = "px-4 py-2 hover:bg-gray-200";

    return (
        <div className="flex items-center justify-between">
            <div className="w-full border-b">
                <nav className="flex items-center justify-between bg-white w-[90%] mx-auto p-4">

                    {categories.map((category) => (
                        <div
                            key={category.maincategoryid}
                            className="relative group"
                            onMouseEnter={() => fetchSubCategories(category.maincategoryid)}
                        >

                            <a href="#" className={categoryTitle}>
                                {category.categoryname}
                                <span className={categoryHoverLine}></span>
                            </a>


                            <div className={smCategoryDiv}>
                                <ul>

                                    {(subCategories[category.maincategoryid] || []).map((subCategory) => (
                                        <li key={subCategory.subcategoryid} className={smCategoryLi}>
                                            <Link to={`/SearchTwo?query=${subCategory.categoryname}`}>
                                                {subCategory.categoryname}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default CategoryList