import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Address = ({ user, success, error, handleAddressSubmit }) => {
    const [addresses, setAddresses] = useState(
        user.addresses
            .filter((address) => address.publishedAt !== null)
            .map((address, index) => ({ ...address, id: index + 1 })) || []
    );
    const [idCounter, setIdCounter] = useState(addresses.length + 1);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newAddress, setNewAddress] = useState({
        name: "",
        phone: "",
        address: "",
        type: "Home",
    });

    const handleRemoveAddress = (id) => {
        setAddresses(addresses.filter((address) => address.id !== id));
    };

    const handleEditAddress = (id) => {
        const addressToEdit = addresses.find((address) => address.id === id);
        if (addressToEdit) {
            setEditingId(id);
            setNewAddress({ ...addressToEdit });
            setShowModal(true);
        }
    };

    const handleAddOrUpdateAddress = () => {
        if (newAddress.name && newAddress.phone) {
            if (editingId !== null) {
                setAddresses((prevAddresses) =>
                    prevAddresses.map((address) =>
                        address.id === editingId ? { ...address, ...newAddress } : address
                    )
                );
            } else {
                const isDuplicate = addresses.some(
                    (address) =>
                        address.name === newAddress.name &&
                        address.phone === newAddress.phone &&
                        address.address === newAddress.address &&
                        address.type === newAddress.type
                );

                if (isDuplicate) {
                    alert("Địa chỉ này đã tồn tại!");
                    return;
                }

                setAddresses((prevAddresses) => [
                    ...prevAddresses,
                    {
                        id: idCounter,
                        ...newAddress,
                    },
                ]);
                setIdCounter((prevCounter) => prevCounter + 1);
            }

            setShowModal(false);
            setEditingId(null);
            setNewAddress({
                name: "",
                phone: "",
                address: "",
                type: "Home",
            });
        } else {
            alert("Vui lòng điền đầy đủ thông tin!");
        }
    };

    const handleSave = (event) => {
        event.preventDefault();
        handleAddressSubmit(addresses);
    };

    return (
        <div className="col-md-9">
            <h4 className="mb-4"><strong>Địa Chỉ</strong></h4>
            <p>Quản lý địa chỉ giao hàng của bạn</p>

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

            {addresses.length > 0 ? (
                <ul className="list-group mb-3">
                    {addresses.map((address) => (
                        <li
                            key={address.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <strong>{address.name}</strong>
                                <p className="mb-0 text-muted">{address.address}</p>
                                <small className="text-muted">{address.type}</small>
                            </div>
                            <div className="d-flex">
                                <button
                                    className="btn mx-2 btn-outline-secondary btn-sm"
                                    onClick={() => handleEditAddress(address.id)} // Open modal for editing
                                >
                                    Chỉnh sửa
                                </button>
                                <button
                                    className="btn mx-2 btn-outline-danger btn-sm"
                                    onClick={() => handleRemoveAddress(address.id)}
                                >
                                    Xóa
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted">Chưa có địa chỉ nào.</p>
            )}

            <div className="d-flex justify-content-end align-items-center">
                <button className="btn btn-danger me-3" onClick={() => setShowModal(true)}>
                    Thêm địa chỉ
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
                                <h5 className="modal-title">
                                    {editingId !== null ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingId(null);
                                    }}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Họ và tên
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={newAddress.name}
                                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        value={newAddress.phone}
                                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">
                                        Địa chỉ
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        value={newAddress.address}
                                        onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Loại địa chỉ:</label>
                                    <div className="d-flex gap-3">
                                        <button
                                            type="button"
                                            className={`btn ${newAddress.type === "Home" ? "btn-danger" : "btn-outline-secondary"
                                                }`}
                                            onClick={() => setNewAddress({ ...newAddress, type: "Home" })}
                                        >
                                            Home
                                        </button>
                                        <button
                                            type="button"
                                            className={`btn ${newAddress.type === "Company" ? "btn-danger" : "btn-outline-secondary"
                                                }`}
                                            onClick={() => setNewAddress({ ...newAddress, type: "Company" })}
                                        >
                                            Company
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingId(null);
                                    }}
                                >
                                    Trở Lại
                                </button>
                                <button type="button" className="btn btn-danger" onClick={handleAddOrUpdateAddress}>
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

export default Address;