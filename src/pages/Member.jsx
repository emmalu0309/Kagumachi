import './Member.css';
function Member() {
  return (
    <div className='MemberListContainer'>
        <table className='MemberListtable'>
          <thead>
            <tr>
              <th className='MemberListth'>訂購日期</th>
              <th className='MemberListth'>訂單編號</th>
              <th className='MemberListth'>付款方式</th>
              <th className='MemberListth'>處理進度</th>
              <th className='MemberListth'>出貨日期</th>
              <th className='MemberListth'>應付金額</th>
              <th className='MemberListth'>訂單取消</th>
              <th className='MemberListth'>客服</th>
              <th className='MemberListth'>評論</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="MemberListtd">
                2024/11/19
              </td>
              <td className="MemberListtd">
                <a>241119011502</a>
              </td>
              <td className="MemberListtd">
                信用卡
              </td>
              <td className="MemberListtd">
                訂單完成
              </td>
              <td className="MemberListtd">
                2024/11/20
              </td>
              <td className="MemberListtd">
                2063
              </td>
              <td className="MemberListtd">
                ?
              </td>
              <td className="MemberListtd">
                客服
              </td>
              <td className="MemberListtd">
                <a>評論</a>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th className="MemberListalignR" colspan="9">
                <div className="MemberListpager">
                  共1筆訂單
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
    </div>
  );
}

export default Member;
