import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar, FaThumbsUp, FaFlag } from "react-icons/fa";

const reviews = [
  {
    name: "n",
    date: "23/08/2023",
    rating: 5,
    content:
      "Cuốn sách đem đến cho mình rất nhiều ý tưởng mới lạ, thay đổi nhiều về tư duy của mình. Đầu tiên là “tốt là kẻ thù của vĩ đại”, trước đây mình vẫn luôn nghĩ rằng tốt là kẻ thù của xấu, vĩ đại là kẻ thù của nhỏ nhen, tốt và vĩ đại có thể là cùng 1 phe. Tuy nhiên tốt và vĩ đại khác hoàn toàn nhau, để trở thành vĩ đại thì phải bỏ đi rất nhiều thành quả ở mức tốt. Tiếp theo, chọn những điều có cả 3 yếu tố yêu thích, tài giỏi, mang lại thu nhập cho bản thân sẽ giúp ta phát triển rất nhiều và thành công đến từ những việc nhỏ nhưng tăng dần lên mỗi ngày, kiên trì tăng dần chút một, không bỏ cuộc và cũng không vội vã làm quá mức, quan trọng là phải giữ vững sự kiên trì, niềm tin sẽ thành công nhưng đừng chỉ ngồi đó và mơ về tương lai.",
  },
  {
    name: "Vũ Hoàng Tuấn Anh",
    date: "12/07/2022",
    rating: 5,
    content:
      "Với tôi cuốn sách này là một trong những cuốn sách hay nhất mà tôi đã từng đọc được. Cuốn sách đem đến cho mình rất nhiều ý tưởng mới lạ, thay đổi nhiều về tư duy của mình. Đầu tiên là “tốt là kẻ thù của vĩ đại”, trước đây mình vẫn luôn nghĩ rằng tốt là kẻ thù của xấu, vĩ đại là kẻ thù của nhỏ nhen, tốt và vĩ đại có thể là cùng 1 phe. Điều thú vị nhất là các bí quyết này có thể được hiểu và áp dụng bởi bất kỳ một người bình thường nào, hoạt động trong bất cứ lĩnh vực nào. Qua hơn 70 năm tồn tại, những đúc kết về thành công của Napoleon Hill đến nay vẫn không hề bị lỗi thời, ngược lại, thời gian chính là minh chứng sống động cho tính đúng đắn của những bí quyết mà ông chia sẻ. Tôi rất thích cuốn sách này",
  },
  {
    name: "Ng",
    date: "27/08/2020",
    rating: 3,
    content:
      "Cuốn sách rất hay. Vận chuyển rất nhanh. Bao bọc cực kì cẩn thận. Nội dung thì không cần phải chê vào đâu được. Bạn có thể thiếu bất kì cuốn sách nào. Bạn có thể mua rất nhiều sách. Nhưng quyển Think and grow rich thì không thể thiếu",
  },
];

const ReviewSummary = () => {
  return (
    <div className="container mb-4 p-3">
      <h5 className="my-3"><strong>Đánh giá sản phẩm</strong></h5>
      <div className="d-flex align-items-center col-12 my-3 col-lg-4">
        <h1 className="me-3">4.8/5</h1>
        <div>
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} color="#ffc107" />
          ))}
          <p className="mb-0">(8 đánh giá)</p>
        </div>
      </div>
      <div className="mt-3 col-12 col-lg-4">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="d-flex align-items-center">
            <span className="me-2">{star} sao</span>
            <div className="progress flex-grow-1" style={{ height: "10px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${star === 5 ? 88 : star === 3 ? 13 : 0}%` }}
              />
            </div>
            <span className="ms-2">{star === 5 ? 88 : star === 3 ? 13 : 0}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReviewTabs = ({ activeTab, setActiveTab }) => {
  return (
    <ul className="nav nav-tabs mb-4">
      <li className="nav-item">
        <button
          className={`nav-link ${activeTab === "newest" ? "active" : ""}`}
          onClick={() => setActiveTab("newest")}
        >
          Mới nhất
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link ${activeTab === "mostLiked" ? "active" : ""}`}
          onClick={() => setActiveTab("mostLiked")}
        >
          Yêu thích nhất
        </button>
      </li>
    </ul>
  );
};

const ReviewItem = ({ review }) => {
    return (
      <div className="row mx-3">
        <div className="card p-3 col-12 w-100 mb-4">
          <div className="d-flex justify-content-between">
            <h6>{review.name}</h6>
            <span>{review.date}</span>
          </div>
          <div className="d-flex align-items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} color={i < review.rating ? "#ffc107" : "#e4e5e9"} />
            ))}
          </div>
          <p>{review.content}</p>
          <div className="d-flex">
            <button className="btn btn-link text-decoration-none me-3">
              <FaThumbsUp className="me-1" /> Thích (0)
            </button>
            <button className="btn btn-link text-decoration-none">
              <FaFlag className="me-1" /> Báo cáo
            </button>
          </div>
        </div>
      </div>
    );
};

const ReviewList = ({ reviews }) => {
  return (
    <div>
      {reviews.map((review, index) => (
        <ReviewItem key={index} review={review} />
      ))}
    </div>
  );
};

const BookReview = () => {
  const [activeTab, setActiveTab] = React.useState("newest");

  return (
    <div className="bg-light my-5 rounded w-100">
      <ReviewSummary />
      <ReviewTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default BookReview;