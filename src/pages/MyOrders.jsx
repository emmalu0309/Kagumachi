import { Link } from "react-router-dom";

function Member() {
  return (
    <div className="flex justify-center">
      <table className="w-4/6 text-sm font-sans text-[#706e6c] border-collapse text-center">
        <thead>
          <tr>
            <th className="h-12 text-sm font-sans font-normal bg-[#ebebeb] border border-[#ccc]">訂購日期</th>
            <th className="text-sm font-sans font-normal bg-[#ebebeb] border border-[#ccc]">訂單編號</th>
            <th className="text-sm font-sans font-normal bg-[#ebebeb] border border-[#ccc]">付款方式</th>
            <th className="text-sm font-sans font-normal bg-[#ebebeb] border border-[#ccc]">處理進度</th>
            <th className="text-sm font-sans font-normal bg-[#ebebeb] border border-[#ccc]">出貨日期</th>
            <th className="text-sm font-sans font-normal bg-[#ebebeb] border border-[#ccc]">應付金額</th>
            <th className="text-sm font-sans font-normal bg-[#ebebeb] border border-[#ccc]">訂單取消</th>
            <th className="text-sm font-sans font-normal bg-[#ebebeb] border border-[#ccc]">客服</th>
            <th className="text-sm font-sans font-normal bg-[#ebebeb] border border-[#ccc]">評論</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border border-[#ccc]">2024/11/19</td>
            <td className="border border-[#ccc]">
              <Link to="/orderdetail" className="hover:underline">241119011502</Link>
            </td>
            <td className="border border-[#ccc]">信用卡</td>
            <td className="border border-[#ccc]">訂單完成</td>
            <td className="border border-[#ccc]">2024/11/20</td>
            <td className="border border-[#ccc]">2063</td>
            <td className="border border-[#ccc]">?</td>
            <td className="border border-[#ccc]">客服</td>
            <td className="border border-[#ccc]">
              <Link to="/customerreviews" className="hover:underline">評論</Link>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td className="h-12 py-2 px-5 bg-[#ebebeb] border border-[#ccc] text-[#686868] text-right" colspan="9">
              共1筆訂單
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Member;
