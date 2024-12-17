import { TbCircleNumber2 } from "react-icons/tb";
import { TbCircleNumber3 } from "react-icons/tb";
import { TbCircleNumber4 } from "react-icons/tb";
import { TbCircleNumber1Filled } from "react-icons/tb";
import { TbArrowRight } from "react-icons/tb";

function StepIcon() {
  return (
    <div className="flex justify-center mt-10">
      <div className="flex flex-col items-center">
        <TbCircleNumber1Filled className="w-14 h-14" />
        <span className="text-xl font-semibold">確認購物車</span>
      </div>
      <TbArrowRight className="w-14 h-14" />
      <div className="flex flex-col items-center">
        <TbCircleNumber2 className="w-14 h-14" />
        <span className="text-xl font-semibold">付款與運送方式</span>
      </div>
      <TbArrowRight className="w-14 h-14" />
      <div className="flex flex-col items-center">
        <TbCircleNumber3 className="w-14 h-14" />
        <span className="text-xl font-semibold">填寫資料</span>
      </div>
      <TbArrowRight className="w-14 h-14" />
      <div className="flex flex-col items-center">
        <TbCircleNumber4 className="w-14 h-14" />
        <span className="text-xl font-semibold">完成訂購</span>
      </div>
    </div>
  );
}

export default StepIcon;
