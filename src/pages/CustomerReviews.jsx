import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import ReactStars from "react-stars";
import Modal from "../components/Modal";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Customerreviews = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>載入會員</div>;
  }

  const memberId = user.memberId;

  const { orderserial } = useParams();
  const [orderData, setOrderData] = useState([]);
  const [reviewData, setReviewData] = useState({});
  const [loading, setLoading] = useState(true);

  // 驗證是否已評分才能送出評價
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // 評價是否正在送出
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (key, field, value) => {
    setReviewData((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        [field]: value,
      },
    }));
  };

  const checkAllRatings = () => {
    return Object.values(reviewData).every((item) => item.rating > 0); // 評分>0 return true
  };

  // 按下送出評價
  const handleSubmit = () => {
    if (!checkAllRatings()) {
      setIsWarningOpen(true); // 打開未完成評分的警告 Modal
      return;
    }
    setIsConfirmOpen(true); // 打開確認送出的 Modal
  };

  // 按下確認送出
  const handleConfirmSubmit = () => {
    if (isSubmitting) return; // 防止重複送出
    setIsSubmitting(true); // 狀態為正在送出

    const dataToSubmit = Object.entries(reviewData)
      .filter(([, value]) => !value.isSubmitted)
      .map(([key, value]) => {
        const [orderId, productId, colorsId] = key.split("_");

        return {
          productId: parseInt(productId, 10),
          colorsId: parseInt(colorsId, 10),
          orderId: parseInt(orderId, 10),
          rating: value.rating,
          content: value.content,
          memberId: parseInt(memberId, 10),
          isSubmitted: !value.isSubmitted,
        };
      });

    if (dataToSubmit.length === 0) {
      console.log("評價已經提交過了");
      return;
    }

    fetch("http://localhost:8080/reviews/addreviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dataToSubmit),
    })
      .then((response) => response.json)
      .then(() => {
        setReviewData((prevState) => {
          const newState = { ...prevState };
          dataToSubmit.forEach((submitted) => {
            const key = `${submitted.orderId}_${submitted.productId}_${submitted.colorsId}`;
            newState[key] = {
              ...newState[key],
              isSubmitted: true,
            };
          });
          return newState;
        });
      })
      .catch((error) => {
        console.log("評價存入資料庫失敗:", error);
      })
      .finally(() => {
        setIsConfirmOpen(false);
        setIsSubmitting(false);
      });
  };

  // 確認用戶是否已提交過評論
  const allReviewsSubmitted = useMemo(() => {
    return orderData.every((product) => {
      const key = `${product.orderid}_${product.productid}_${product.colorsid}`;
      return reviewData[key]?.isSubmitted;
    });
  }, [orderData, reviewData]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const orderResponse = await fetch(
          `http://localhost:8080/orderdetail/${orderserial}`
        );
        if (!orderResponse.ok) {
          throw new Error(
            `Failed to fetch order details: ${orderResponse.statusText}`
          );
        }
        const orderData = await orderResponse.json();
        if (isMounted) {
          setOrderData(orderData);
        }

        const fetchReviewsForProducts = async () => {
          const reviewPromises = orderData.map(async (product) => {
            const productId = product.productid;
            const colorsId = product.colorsid;
            const orderId = product.orderid;
            try {
              const reviewResponse = await fetch(
                `http://localhost:8080/reviews?productId=${productId}&colorsId=${colorsId}&orderId=${orderId}`
              );
              if (!reviewResponse.ok) {
                console.warn(
                  `No reviews found for productId ${productId} & colorsId ${colorsId} & orderId ${orderId}`
                );
                return {
                  productId: productId,
                  colorsId: colorsId,
                  orderId: orderId || null,
                  content: "",
                  rating: 0,
                  isSubmitted: false,
                };
              }
              const reviewData = await reviewResponse.json();
              console.log(reviewData);
              return {
                productId: productId,
                colorsId: colorsId,
                orderId: orderId || null,
                rating: reviewData?.rating || 0,
                content: reviewData?.content || "",
                isSubmitted: reviewData?.issubmitted || false,
              };
            } catch (error) {
              console.error(
                `Failed to fetch review for productId ${productId} & colorsId ${colorsId} & orderId ${orderId}`,
                error
              );
              return {
                productId: productId,
                colorsId: colorsId,
                orderId: orderId || null,
                content: "",
                rating: 0,
                isSubmitted: false,
              };
            }
          });

          const reviews = await Promise.all(reviewPromises);
          const reviewMap = reviews.reduce((acc, curr) => {
            acc[`${curr.orderId}_${curr.productId}_${curr.colorsId}`] = {
              rating: curr.rating,
              content: curr.content || "",
              productId: curr.productId,
              colorsId: curr.colorsId,
              orderId: curr.orderId,
              isSubmitted: curr.isSubmitted,
            };
            return acc;
          }, {});
          setReviewData(reviewMap);
        };

        await fetchReviewsForProducts();
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [orderserial]);

  if (loading) {
    return <div>載入中...</div>;
  }

  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-3/4 space-y-6">
        <span className="mb-2 font-bold text-gray-600">
          訂單編號：{orderserial}
        </span>
        <div className="border border-gray-400 rounded-lg p-4">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              className="text-gray-500 mb-3 mr-2 ml-1"
            >
              <path
                fill="currentColor"
                d="M18 26h8v2h-8zm0-4h12v2H18zm0-4h12v2H18z"
              />
              <path
                fill="currentColor"
                d="M20.549 11.217L16 2l-4.549 9.217L1.28 12.695l7.36 7.175L6.902 30L14 26.269v-2.26l-4.441 2.335l1.052-6.136l.178-1.037l-.753-.733l-4.458-4.347l6.161-.895l1.04-.151l.466-.943L16 6.519l2.755 5.583l.466.943l1.04.151l7.454 1.085L28 12.3z"
              />
            </svg>
            <div className="mt-0.5 font-bold text-gray-600">發表評價</div>
          </div>

          <hr />
          <div className="flex items-center m-2 text-gray-600">
            <div id="pic" className="flex-[1]"></div>
            <div className="flex-[4] text-left">商品名稱</div>
            <div className="flex-[4] text-left">評分</div>
            <div className="flex-[4] text-left">評價</div>
          </div>
          <hr />
          {orderData.map((product) => {
            const key = `${product.orderid}_${product.productid}_${product.colorsid}`;
            const { rating, content, isSubmitted } = reviewData[key] || {};

            return (
              <div key={key}>
                <div className="flex items-center m-2 text-gray-600">
                  {/* 商品圖片 */}
                  <div className="flex-[1]">
                    <img
                      src={product.imageurl}
                      alt={product.productname}
                      className="w-16 h-16"
                    />
                  </div>
                  {/* 商品名稱 */}
                  <div className="flex-[4] text-left">
                    <span className="block">{product.productname}</span>
                    <span className="block">規格:{product.colorname}</span>
                  </div>

                  {/* 評分 */}
                  <div className="flex-[4]">
                    <ReactStars
                      count={5}
                      value={rating}
                      onChange={(newRating) =>
                        handleInputChange(key, "rating", newRating)
                      }
                      size={20}
                      color2={"#ffd700"}
                      half={false}
                      edit={!isSubmitted}
                    />
                  </div>
                  {/* 評論內容 */}
                  <div className="flex-[4]">
                    <textarea
                      value={content}
                      onChange={(e) =>
                        handleInputChange(key, "content", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md p-2"
                      disabled={isSubmitted}
                    />
                  </div>
                </div>
                <hr className="my-4 border-t border-gray-300" />
              </div>
            );
          })}
          <div className="flex flex-col items-center justify-center mt-4 space-y-2">
            <button
              className={`px-8 py-2 ${
                allReviewsSubmitted
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#5e3b25] hover:bg-[#c3a789]"
              }  text-white rounded-md  w-[10rem]`}
              onClick={handleSubmit}
              disabled={allReviewsSubmitted}
            >
              送出評價
            </button>
            <Link
              to="/MemberInfo/MyOrders"
              className="px-8 py-2 bg-[#5e3b25] text-white rounded-md hover:bg-[#c3a789] w-[10rem] text-center"
            >
              返回會員頁面
            </Link>

            {/* 未完成評分警告 */}
            <Modal
              isOpen={isWarningOpen}
              onClose={() => setIsWarningOpen(false)}
              title="提示"
              description="請為每個商品評分，評分為必填"
              buttons={[
                {
                  label: "返回評價",
                  type: "primary",
                  onClick: () => setIsWarningOpen(false),
                },
              ]}
            />

            {/* 確認送出警告 */}
            <Modal
              isOpen={isConfirmOpen}
              onClose={() => setIsConfirmOpen(false)}
              title="確認送出評價"
              description="送出後，評價將無法再新增或修改，是否確認送出？"
              buttons={[
                {
                  label: "取消",
                  type: "secondary",
                  onClick: () => setIsConfirmOpen(false),
                },
                {
                  label: "確認送出",
                  type: "primary",
                  onClick: handleConfirmSubmit,
                  disabled: isSubmitting,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customerreviews;
