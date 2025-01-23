import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";


const ProductDetail = ({product, selectedColor}) => {

    const InfoStyleDiv = "my-2 text-gray-500 flex";
    const InfoStyleTitle = "w-[20%]";
    const InfoStyleSpan = "text-gray-800 px-10 w-[80%]";
    return (
        <div className="mt-20">
            <div className="text-xl">產品資訊</div>
            <div className="text-sm mt-1">
                {product.productdescription}
            </div>
            <div className="mt-6">
                <div className="text-xl">尺寸</div>
                <div className={InfoStyleDiv}>
                    <div className={InfoStyleTitle}>寬度</div>
                    <div className={InfoStyleSpan}>{product.width}公分</div>
                </div>
                <div className={InfoStyleDiv}>
                    <div className={InfoStyleTitle}>深度</div>
                    <div className={InfoStyleSpan}>{product.depth}公分</div>
                </div>
                <div className={InfoStyleDiv}>
                    <div className={InfoStyleTitle}>高度</div>
                    <div className={InfoStyleSpan}>{product.height}公分</div>
                </div>
            </div>

        </div>
    )
}

export default ProductDetail