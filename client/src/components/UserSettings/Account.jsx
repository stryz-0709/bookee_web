
import React, { useState } from "react";

const Account = ({ user, success, error, handleAccountSubmit }) => {
    const [preview, setPreview] = useState(user.avatar || "https://via.placeholder.com/512");

    // Handle Image Upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                if (img.width === 512 && img.height === 512) {
                    setPreview(img.src); // Update preview if valid dimensions
                } else {
                    alert("Please upload an image with dimensions 512x512 pixels.");
                }
            };
        }
    };
    return (
        <div className="col-md-9">
            <h4 className="mb-4"><strong>Hồ Sơ Của Tôi</strong></h4>
            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleAccountSubmit}>
                {/* Username */}
                <div className="mb-3 row">
                    <label htmlFor="username" className="col-sm-3 col-form-label">
                        Tên đăng nhập
                    </label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            readOnly
                            className="form-control-plaintext"
                            id="username"
                            value={user.username || ""}
                        />
                    </div>
                </div>
                {/* Name */}
                <div className="mb-3 row">
                    <label htmlFor="name" className="col-sm-3 col-form-label">
                        Tên
                    </label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            defaultValue={user.name || ""}
                        />
                    </div>
                </div>
                {/* Email */}
                <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-3 col-form-label">
                        Email
                    </label>
                    <div className="col-sm-9">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            defaultValue={user.email || ""}
                        />
                    </div>
                </div>
                {/* Phone */}
                <div className="mb-3 row">
                    <label htmlFor="phone" className="col-sm-3 col-form-label">
                        Số điện thoại
                    </label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            defaultValue={user.phone || ""}
                        />
                    </div>
                </div>
                {/* Gender */}
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Giới tính</label>
                    <div className="col-sm-9">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="Male"
                                value="Male"
                                defaultChecked={user.gender === "Male"}
                            />
                            <label className="form-check-label" htmlFor="Male">
                                Nam
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="Female"
                                value="Female"
                                defaultChecked={user.gender === "Female"}
                            />
                            <label className="form-check-label" htmlFor="Female">
                                Nữ
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="Other"
                                value="Other"
                                defaultChecked={user.gender === "Other"}
                            />
                            <label className="form-check-label" htmlFor="Other">
                                Khác
                            </label>
                        </div>
                    </div>
                </div>
                {/* Date of Birth */}
                <div className="mb-3 row">
                    <label htmlFor="dob" className="col-sm-3 col-form-label">
                        Ngày sinh
                    </label>
                    <div className="col-sm-9">
                        <input
                            type="date"
                            className="form-control"
                            id="dob"
                            defaultValue={user.dob || ""}
                        />
                    </div>
                </div>
                {/* Image Upload */}
                <div className="mb-3 row">
                    <label htmlFor="avatar" className="col-sm-3 col-form-label">
                        Ảnh đại diện
                    </label>
                    <div className="col-sm-9">
                        <form>
                            {/* Preview Image */}
                            <img
                                src={preview}
                                alt="Avatar Preview"
                                className="img-thumbnail mb-3"
                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                            />
                            {/* File Input */}
                            <input
                                type="file"
                                name="avatar"
                                className="form-control"
                                id="avatar"
                                accept="image/png, image/jpeg"
                                onChange={handleImageUpload}
                            />
                        </form>
                    </div>
                </div>

                {/* Save Button */}
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9">
                        <button type="submit" className="btn btn-danger">
                            Lưu
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Account;