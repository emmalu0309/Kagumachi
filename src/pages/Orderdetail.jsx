import imageTest from "../img/closet1.png";

const orderdetail = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      {/* 外層容器，水平垂直置中 */}
      <div className="w-3/4 space-y-6 mt-0">
        {/* 訂單編號區塊 */}
        <div className="text-left  text-gray-400 mt-8">
          您的訂單編號為：<span className="font-semibold">241119011502</span>
        </div>

        {/* 購物明細區塊 */}
        <div className="border border-gray-400 rounded-lg p-4">
          <div className="mb-2 font-bold text-gray-600">購物明細</div>
          <hr />
          <div className="flex items-center m-2 text-gray-600">
            <div id="pic" className="flex-[1]"></div>
            <div className="flex-[4] text-left">商品名稱</div>
            <div className="flex-[1] text-center">數量</div>
            <div className="flex-[1] text-center">單價</div>
            <div className="flex-[1] text-center">折扣價</div>
            <div className="flex-[1] text-center">小計</div>
          </div>
          <hr />
          <div className="flex items-center m-2  text-gray-600">
            <div
              id="pic"
              className="flex-[1] aspect-square max-w-[80px] max-h-[80px] overflow-hidden mr-6"
            >
              <img
                src={imageTest}
                alt="滑門衣櫃-黑棕色"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-[4] text-left">
              <span className="block">66200011</span>
              <span className="block">滑門衣櫃</span>
              <span className="block">黑棕色-117x176公分</span>
            </div>
            <div className="flex-[1] text-center">1</div>
            <div className="flex-[1] text-center line-through">4999</div>
            <div className="flex-[1] text-center">4999</div>
            <div className="flex-[1] text-center">4999</div>
          </div>

          <hr />
          <div className="flex items-center m-2  text-gray-600">
            <div
              id="pic"
              className="flex-[1] aspect-square max-w-[80px] max-h-[80px] overflow-hidden mr-6"
            >
              <img
                src={imageTest}
                alt="滑門衣櫃-黑棕色"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-[4] text-left">
              <span className="block">66200011</span>
              <span className="block">滑門衣櫃</span>
              <span className="block">黑棕色-117x176公分</span>
            </div>
            <div className="flex-[1] text-center">1</div>
            <div className="flex-[1] text-center line-through">4999</div>
            <div className="flex-[1] text-center">4999</div>
            <div className="flex-[1] text-center">4999</div>
          </div>
          <hr />
          <div className="flex items-center m-2  text-gray-600">
            <div
              id="pic"
              className="flex-[1] aspect-square max-w-[80px] max-h-[80px] overflow-hidden mr-6"
            >
              <img
                src={imageTest}
                alt="滑門衣櫃-黑棕色"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-[4] text-left">
              <span className="block">66200011</span>
              <span className="block">滑門衣櫃</span>
              <span className="block">黑棕色-117x176公分</span>
            </div>
            <div className="flex-[1] text-center">1</div>
            <div className="flex-[1] text-center line-through">4999</div>
            <div className="flex-[1] text-center">4999</div>
            <div className="flex-[1] text-center">4999</div>
          </div>
          <hr />
          <div className="flex items-center m-2  text-gray-600">
            <div
              id="pic"
              className="flex-[1] aspect-square max-w-[80px] max-h-[80px] overflow-hidden mr-6"
            >
              <img
                src={imageTest}
                alt="滑門衣櫃-黑棕色"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-[4] text-left">
              <span className="block">66200011</span>
              <span className="block">滑門衣櫃</span>
              <span className="block">黑棕色-117x176公分</span>
            </div>
            <div className="flex-[1] text-center">1</div>
            <div className="flex-[1] text-center line-through">4999</div>
            <div className="flex-[1] text-center">4999</div>
            <div className="flex-[1] text-center">4999</div>
          </div>
        </div>

        {/* 寄送資料區塊 */}
        <div className="border border-gray-400 rounded-lg p-4 text-left text-gray-600">
          <div className="mb-4 font-bold">付款方式與寄送資料</div>
          <span className="block">付款方式</span>
          <span className="block">訂購姓名</span>
          <span className="block">取貨地址</span>
        </div>
      </div>
    </div>
  );
};

export default orderdetail;
