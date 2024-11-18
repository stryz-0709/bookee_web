import React from "react";
import AuthorPubCard from "../AuthorPubCard/AuthorPubCard";
import "bootstrap/dist/css/bootstrap.min.css";

const AuthorPubInfo = () => {
  const authors = [
    { id: 1, name: "Ramez Elmasri", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Shamkant Navathe", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Author 3", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Author 4", image: "https://via.placeholder.com/150" },
    { id: 5, name: "Author 5", image: "https://via.placeholder.com/150" }
  ];

  const publishers = [
    { id: 1, name: "Pearson", image: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="container mt-2">
      {/* About the Author Section */}
      <h5><strong>Thông tin Tác giả</strong></h5>
      <div
        className="d-flex align-items-start overflow-auto mt-4"
        style={{ whiteSpace: "nowrap" }}
      >
        {authors.map((author) => (
          <AuthorPubCard key={author.id} item={author} type="author"/>
        ))}
      </div>

      {/* About the Publisher Section */}
      <h5 className="mt-2"><strong>Thông tin Nhà xuất bản</strong></h5>
      <div
        className="d-flex align-items-start overflow-auto mt-4"
        style={{ whiteSpace: "nowrap" }}
      >
        {publishers.map((publisher) => (
          <AuthorPubCard key={publisher.id} item={publisher} type="publisher" />
        ))}
      </div>
    </div>
  );
};

export default AuthorPubInfo;