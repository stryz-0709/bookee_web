import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TableInfo = ({ book }) => {
  return (
    <div className="bg-none mt-5">
        <h5><strong>Thông tin chi tiết</strong></h5>
        <table className="table table-bordered">
            <tbody>
            <tr>
                <th scope="row">ISBN:</th>
                <td>{book[0]?.ISBN}</td>
            </tr>
            <tr>
                <th scope="row">Tác giả:</th>
                <td>{book[0]?.authors && book[0]?.authors.length > 0 ? (
            book[0]?.authors.map((author, index) => (
              <span key={author.id}>
                {author.name}
                {index < book[0]?.authors.length - 1 && ", "}
              </span>
            ))
          ) : (
            "Unknown"
          )}</td>
            </tr>
            <tr>
                <th scope="row">Nhà xuất bản:</th>
                <td>{book[0]?.publisher?.name || "Unknown"}</td>
            </tr>
            <tr>
                <th scope="row">Năm xuất bản:</th>
                <td>{book[0]?.publish_date}</td>
            </tr>
            <tr>
                <th scope="row">Trọng lượng (g):</th>
                <td>{book[0]?.weight}</td>
            </tr>
            <tr>
                <th scope="row">Số trang:</th>
                <td>{book[0]?.num_of_page}</td>
            </tr>
            <tr>
                <th scope="row">Kích thước (cm):</th>
                <td>{book[0]?.size}</td>
            </tr>
            </tbody>
        </table>
        </div>
    );
};

export default TableInfo;