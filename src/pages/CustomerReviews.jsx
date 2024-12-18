import imageTest from "../img/closet1.png";

const customerreviews = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      {/* 外層容器，水平垂直置中 */}
      <div className="w-3/4 space-y-6">
        {/* 發表評價區塊 */}
        <div className="border border-gray-400 rounded-lg p-4">
          <div className="mb-2 font-bold text-gray-600">發表評價</div>
          <hr />
          <div className="flex items-center m-2 text-gray-600">
            <div id="pic" className="flex-[1]"></div>
            <div className="flex-[4] text-left">商品名稱</div>
            <div className="flex-[4] text-left">評價</div>
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
            <div className="flex-[4]">
              <textarea
                className="w-full h-full resize-none border p-2"
                placeholder="請輸入評價"
                rows={5}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <button className="px-8 py-2 bg-[#5e3b25] text-white rounded-md hover:bg-[#c3a789]">
            送出評價
          </button>
        </div>
      </div>
    </div>
  );
};

export default customerreviews;
