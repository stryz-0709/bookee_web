import React, { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ChangePassword = ({ success, error, handleFormSubmit }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Toggle password visibility
  const toggleVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="col-md-9">
      <h4 className="mb-4"><strong>Đổi mật khẩu</strong></h4>
      <p>Quản lý mật khẩu để bảo mật tài khoản</p>
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={(e) => handleFormSubmit(e, formData)}>
        {/* Current Password */}
        <div className="mb-3 row">
          <label htmlFor="currentPassword" className="form-label">
            Mật khẩu hiện tại <span className="text-danger">*</span>
          </label>
          <div className="input-group">
            <input
              type={showPasswords.current ? "text" : "password"}
              className="form-control"
              id="currentPassword"
              placeholder="Nhập mật khẩu hiện tại"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => toggleVisibility("current")}
              aria-label="Toggle password visibility"
            >
              {showPasswords.current ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="mb-3 row">
          <label htmlFor="newPassword" className="form-label">
            Mật khẩu mới <span className="text-danger">*</span>
          </label>
          <div className="input-group">
            <input
              type={showPasswords.new ? "text" : "password"}
              className="form-control"
              id="newPassword"
              placeholder="Nhập mật khẩu mới"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => toggleVisibility("new")}
              aria-label="Toggle password visibility"
            >
              {showPasswords.new ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="mb-3 row">
          <label htmlFor="confirmPassword" className="form-label">
            Nhập lại mật khẩu mới <span className="text-danger">*</span>
          </label>
          <div className="input-group">
            <input
              type={showPasswords.confirm ? "text" : "password"}
              className="form-control"
              id="confirmPassword"
              placeholder="Nhập lại mật khẩu mới"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => toggleVisibility("confirm")}
              aria-label="Toggle password visibility"
            >
              {showPasswords.confirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
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

export default ChangePassword;