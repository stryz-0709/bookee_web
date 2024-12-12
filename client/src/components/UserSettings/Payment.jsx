import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Payment = ({ user, success, error, handlePaymentSubmit }) => {
  const [paymentMethods, setPaymentMethods] = useState(
    user.payments
      .filter((payment) => payment.publishedAt !== null)
      .map((payment, index) => ({ ...payment, id: index + 1 })) || []
  );
  const [idCounter, setIdCounter] = useState(paymentMethods.length + 1);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newMethod, setNewMethod] = useState({
    type: "",
    name: "",
    phone: "",
    cardNumber: "",
    CVV: "",
    expireDate: "",
  });

  const handleRemoveMethod = (id) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  const handleEditMethod = (id) => {
    const methodToEdit = paymentMethods.find((method) => method.id === id);
    if (methodToEdit) {
      setEditingId(id);
      setNewMethod({ ...methodToEdit });
      setShowModal(true);
    }
  };

  const handleAddOrUpdateMethod = () => {
    if (newMethod.type === "Momo") {
      if (!newMethod.name || !newMethod.phone) {
        alert("Vui lòng điền đầy đủ thông tin! (Họ tên và Số điện thoại cho Ví Momo)");
        return;
      }
    }

    if (newMethod.type === "Bank") {
      if (!newMethod.name || !newMethod.cardNumber || !newMethod.CVV || !newMethod.expireDate) {
        alert(
          "Vui lòng điền đầy đủ thông tin! (Họ tên, Số thẻ, CVV, và Ngày hết hạn cho Thẻ Ngân hàng)"
        );
        return;
      }
    }

    if (editingId !== null) {
      setPaymentMethods((prevMethods) =>
        prevMethods.map((method) =>
          method.id === editingId ? { ...method, ...newMethod } : method
        )
      );
    } else {
      const isDuplicate = paymentMethods.some(
        (method) =>
          method.type === newMethod.type &&
          method.name === newMethod.name &&
          method.phone === newMethod.phone &&
          method.cardNumber === newMethod.cardNumber &&
          method.CVV === newMethod.CVV &&
          method.expireDate === newMethod.expireDate
      );

      if (isDuplicate) {
        alert("Phương thức thanh toán này đã tồn tại!");
        return;
      }

      setPaymentMethods((prevMethods) => [
        ...prevMethods,
        {
          id: idCounter,
          ...newMethod,
        },
      ]);
      setIdCounter((prevCounter) => prevCounter + 1);
    }

    setShowModal(false);
    setEditingId(null);
    setNewMethod({
      type: "",
      name: "",
      phone: "",
      cardNumber: "",
      CVV: "",
      expireDate: "",
    });
  };

  const handleSave = (event) => {
    event.preventDefault();
    handlePaymentSubmit(paymentMethods);
  };

  return (
    <div className="col-md-9">
      <h4 className="mb-4">
        <strong>Phương Thức Thanh Toán</strong>
      </h4>
      <p>Quản lý phương thức thanh toán của bạn</p>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}

      {paymentMethods.length > 0 ? (
        <ul className="list-group mb-3">
          {paymentMethods.map((method) => (
            <li
              key={method.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center">
                <img className="me-3"
                  src={
                    method.type === "Momo"
                      ? "http://localhost:1337/uploads/download_b1847215df.png"
                      : method.type === "Bank"
                        ? "http://localhost:1337/uploads/ico_zalopaycc_3c7d80fc87.svg"
                        : ""
                  }
                  alt={method.type}
                  style={{ width: "24px", height: "24px", marginRight: "10px" }}
                />
                <div>
                  <strong>{method.type}</strong>
                  <p className=" text-muted align-items-center mb-0">{method.name}</p>
                  <small className="text-muted align-items-center mb-0">
                    {method.type === "Momo" ? method.phone : method.cardNumber}
                  </small>
                </div>
              </div>
              <div className="d-flex">
                <button
                  className="btn mx-2 btn-outline-secondary btn-sm"
                  onClick={() => handleEditMethod(method.id)}
                >
                  Chỉnh sửa
                </button>
                <button
                  className="btn mx-2 btn-outline-danger btn-sm"
                  onClick={() => handleRemoveMethod(method.id)}
                >
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">Chưa có phương thức thanh toán nào.</p>
      )}

      <div className="d-flex justify-content-end align-items-center">
        <button className="btn btn-danger me-3" onClick={() => setShowModal(true)}>
          Thêm phương thức
        </button>

        <form onSubmit={handleSave}>
          <button type="submit" className="btn btn-danger">
            Lưu
          </button>
        </form>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><strong>
                  {editingId !== null
                    ? "Chỉnh sửa phương thức thanh toán"
                    : "Thêm phương thức mới"}
                </strong></h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setEditingId(null); // Reset editing state
                  }}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="paymentMethod" className="form-label">
                    <strong>Chọn phương thức thanh toán</strong>
                  </label>
                  <div className="list-group">
                    {[
                      { id: "Momo", label: "Ví Momo", imgSrc: "http://localhost:1337/uploads/download_b1847215df.png" },
                      { id: "Bank", label: "Thẻ tín dụng/ghi nợ", imgSrc: "http://localhost:1337/uploads/ico_zalopaycc_3c7d80fc87.svg" },
                    ].map((method) => (
                      <div key={method.id} className="form-check d-flex align-items-center">
                        <input
                          className="form-check-input me-3"
                          type="radio"
                          name="paymentMethod"
                          id={method.id}
                          value={method.id}
                          checked={newMethod.type === method.id}
                          onChange={(e) =>
                            setNewMethod({ ...newMethod, type: e.target.value })
                          }
                        />
                        <label className="form-check-label d-flex align-items-center" htmlFor={method.id}>
                          <img
                            src={method.imgSrc}
                            alt={method.label}
                            style={{ width: "24px", height: "24px", marginRight: "10px" }}
                          />
                          {method.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {newMethod.type === "Momo" && (
                  <div className="mt-4">
                    <h6><strong>Chi tiết</strong></h6>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Họ và tên <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Nhập họ và tên"
                        value={newMethod.name || ""}
                        onChange={(e) =>
                          setNewMethod({ ...newMethod, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Số điện thoại <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Nhập điện thoại"
                        value={newMethod.phone || ""}
                        onChange={(e) =>
                          setNewMethod({ ...newMethod, phone: e.target.value })
                        }
                      />
                    </div>

                  </div>
                )}
                {newMethod.type === "Bank" && (
                  <div className="mt-4">
                    <h6><strong>Chi tiết thẻ</strong></h6>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Họ và tên<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Nhập họ và tên"
                        value={newMethod.name || ""}
                        onChange={(e) =>
                          setNewMethod({ ...newMethod, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="cardNumber" className="form-label">
                        Số thẻ <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cardNumber"
                        placeholder="Nhập số thẻ"
                        value={newMethod.cardNumber || ""}
                        onChange={(e) =>
                          setNewMethod({ ...newMethod, cardNumber: e.target.value })
                        }
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="expireDate" className="form-label">
                          Ngày hết hạn (MM/YY) <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="expireDate"
                          placeholder="MM/YY"
                          value={newMethod.expireDate || ""}
                          onChange={(e) =>
                            setNewMethod({ ...newMethod, expireDate: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="CVV" className="form-label">
                          Mã CVV <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="CVV"
                          placeholder="CVV"
                          value={newMethod.CVV || ""}
                          onChange={(e) =>
                            setNewMethod({ ...newMethod, CVV: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setEditingId(null); // Reset editing state
                  }}
                >
                  Trở Lại
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleAddOrUpdateMethod}
                >
                  {editingId !== null ? "Lưu thay đổi" : "Hoàn Thành"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;