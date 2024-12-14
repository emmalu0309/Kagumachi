

const ProductDetail = () => {
    const InfoStyleDiv = "my-2 text-gray-500 flex";
    const InfoStyleTitle = "w-[20%]";
    const InfoStyleSpan = "text-gray-800 px-10 w-[80%]";
    return (
        <div className="mt-20">
            <div className="text-xl">產品資訊</div>
            <div>
                滑門打開時不佔空間，可提供更多空間擺放家具

                對整個家庭來說，家應是安全的地方；產品附安全配件，讓你將衣櫃固定在牆上

                根據空間和個人需求，可單獨使用，或搭配其他RAKKESTAD衣櫃
            </div>
            <div className="mt-6">
                <div className="text-xl">尺寸</div>
                <div className={InfoStyleDiv}>
                    <div className={InfoStyleTitle}>寬度</div>
                    <div className={InfoStyleSpan}>117公分</div>
                </div>
                <div className={InfoStyleDiv}>
                    <div className={InfoStyleTitle}>深度</div>
                    <div className={InfoStyleSpan}>55公分</div>
                </div>
                <div className={InfoStyleDiv}>
                    <div className={InfoStyleTitle}>高度</div>
                    <div className={InfoStyleSpan}>176公分</div>
                </div>
            </div>

        </div>
    )
}

export default ProductDetail