import {
  TbCircleNumber1,
  TbCircleNumber2,
  TbCircleNumber3,
  TbCircleNumber4,
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
  TbCircleNumber4Filled,
  TbArrowRight,
} from "react-icons/tb";

function ShoppingcartStepIcon(props) {
  const stepOne = () => {
    switch (props.step) {
      case "1":
        return <TbCircleNumber1Filled className="w-14 h-14" />;
      default:
        return <TbCircleNumber1 className="w-14 h-14" />;
    }
  };

  const stepTwo = () => {
    switch (props.step) {
      case "2":
        return <TbCircleNumber2Filled className="w-14 h-14" />;
      default:
        return <TbCircleNumber2 className="w-14 h-14" />;
    }
  };

  const stepThree = () => {
    switch (props.step) {
      case "3":
        return <TbCircleNumber3Filled className="w-14 h-14" />;
      default:
        return <TbCircleNumber3 className="w-14 h-14" />;
    }
  };

  const stepFour = () => {
    switch (props.step) {
      case "4":
        return <TbCircleNumber4Filled className="w-14 h-14" />;
      default:
        return <TbCircleNumber4 className="w-14 h-14" />;
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="flex flex-col items-center">
        {stepOne()}
        <span className="text-xl font-semibold">確認購物車</span>
      </div>
      <TbArrowRight className="w-14 h-14" />
      <div className="flex flex-col items-center">
        {stepTwo()}
        <span className="text-xl font-semibold">付款與運送方式</span>
      </div>
      <TbArrowRight className="w-14 h-14" />
      <div className="flex flex-col items-center">
        {stepThree()}
        <span className="text-xl font-semibold">填寫資料</span>
      </div>
      <TbArrowRight className="w-14 h-14" />
      <div className="flex flex-col items-center">
        {stepFour()}
        <span className="text-xl font-semibold">完成訂購</span>
      </div>
    </div>
  );
}

export default ShoppingcartStepIcon;
