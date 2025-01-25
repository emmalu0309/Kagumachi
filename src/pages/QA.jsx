import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";

const QA = () => {

    const { navbar } = useContext(AuthContext);

    if (!navbar) {
        return <p>載入中...</p>;
    }


    const faqList = navbar.qa.split("\n\n")
        .map((qa) => qa.split("\n"))
        .filter((qa) => qa.length === 2);

  return (
    <div className="w-[80%] mx-auto mt-10">
        {faqList.map((faq, index) => (
            <div key={index} className="mb-4 border-b pb-4">
                <div className="font-semibold text-lg">{faq[0]}</div>
                <div className="text-gray-700">{faq[1]}</div>
            </div>
        ))}

    </div>
  )
}

export default QA