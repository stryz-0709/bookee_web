import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AuthorPubInfo = () => {
  return (
    <div className="bg-none mt-5">
        <h5><strong>Thông tin chi tiết</strong></h5>
        <table className="table table-bordered">
            <tbody>
            <tr>
                <th scope="row">ISBN:</th>
                <td>978-0133970777</td>
            </tr>
            <tr>
                <th scope="row">Tác giả:</th>
                <td>Ramez Elmasri, Shamkant Navathe</td>
            </tr>
            <tr>
                <th scope="row">Nhà xuất bản:</th>
                <td>Pearson</td>
            </tr>
            <tr>
                <th scope="row">Năm xuất bản:</th>
                <td>2015</td>
            </tr>
            <tr>
                <th scope="row">Trọng lượng (g):</th>
                <td>1814</td>
            </tr>
            <tr>
                <th scope="row">Số trang:</th>
                <td>1280</td>
            </tr>
            <tr>
                <th scope="row">Kích thước (cm):</th>
                <td>24 x 16 x 1.6</td>
            </tr>
            </tbody>
        </table>
        </div>
    );
};

export default AuthorPubInfo;