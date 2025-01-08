import {
  TbCircleNumber1,
  TbCircleNumber2,
  TbCircleNumber3,
  TbCircleNumber4,
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
  TbCircleNumber4Filled,
} from "react-icons/tb";
import {
  PiNumberCircleOneLight,
  PiNumberCircleTwoLight,
  PiNumberCircleThreeLight,
  PiNumberCircleFourLight,
  PiNumberCircleOneFill,
  PiNumberCircleTwoFill,
  PiNumberCircleThreeFill,
  PiNumberCircleFourFill,
  PiArrowRightThin,
} from "react-icons/pi";

function ShoppingcartStepIcon(props) {
  const stepOne = () => {
    switch (props.step) {
      case "1":
        return <PiNumberCircleOneFill className="w-14 h-14" />;
      default:
        return <PiNumberCircleOneLight className="w-14 h-14" />;
    }
  };
  const stepTwo = () => {
    switch (props.step) {
      case "2":
        return <PiNumberCircleTwoFill className="w-14 h-14" />;
      default:
        return <PiNumberCircleTwoLight className="w-14 h-14" />;
    }
  };
  const stepThree = () => {
    switch (props.step) {
      case "3":
        return <PiNumberCircleThreeFill className="w-14 h-14" />;
      default:
        return <PiNumberCircleThreeLight className="w-14 h-14" />;
    }
  };
  const stepFour = () => {
    switch (props.step) {
      case "4":
        return <PiNumberCircleFourFill className="w-14 h-14" />;
      default:
        return <PiNumberCircleFourLight className="w-14 h-14" />;
    }
  };

  const myStyle = "flex flex-col basis-1/4 items-center text-gray-500";

  return (
    <div className="flex justify-center items-center mt-10 w-[60%] mx-auto">
      <div className={myStyle}>
        {stepOne()}
        <span className="text-xl font-semibold">確認購物車</span>
      </div>
      <PiArrowRightThin className="w-14 h-14" />
      <div className={myStyle}>
        {stepTwo()}
        <span className="text-xl font-semibold">付款與運送方式</span>
      </div>
      <PiArrowRightThin className="w-14 h-14" />
      <div className={myStyle}>
        {stepThree()}
        <span className="text-xl font-semibold">填寫資料</span>
      </div>
      <PiArrowRightThin className="w-14 h-14" />
      <div className={myStyle}>
        {stepFour()}
        <span className="text-xl font-semibold">完成訂購</span>
      </div>
    </div>
  );
}

export default ShoppingcartStepIcon;
