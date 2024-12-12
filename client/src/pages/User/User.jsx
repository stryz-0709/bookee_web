import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Account from "../../components/UserSettings/Account";
import ChangePassword from "../../components/UserSettings/ChangePassword";
import Payment from "../../components/UserSettings/Payment";
import Address from "../../components/UserSettings/Address";
import Wishlist from "../../components/UserSettings/Wishlist"
import History from "../../components/UserSettings/History";
import Reviews from "../../components/UserSettings/Reviews";
import Order from "../../components/UserSettings/Order";
import { useLocation } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [putId, setPutId] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const jwt = localStorage.getItem("jwt"); 
        if (!jwt) throw new Error("User not authenticated");

        const meResponse = await axios.get("http://localhost:1337/api/users/me", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        const userId = meResponse.data.id;
        console.log("User ID:", userId);
        setPutId(userId);

        const userResponse = await axios.get(
          `http://localhost:1337/api/users/${userId}?populate=*`,
          {
            headers: {
              Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
            },
          }
        );

        console.log("Full User Data:", userResponse.data);
        setUser(userResponse.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user information.");
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);


  const handleAccountSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) throw new Error("User not authenticated");

      const avatarInput = document.getElementById("avatar");
      let avatarResponse = null;

      if (avatarInput && avatarInput.files && avatarInput.files[0]) {
        const avatarFile = avatarInput.files[0];
        const avatarFormData = new FormData();
        avatarFormData.append("files", avatarFile);

        console.log("Avatar file details:", avatarFile);

        // Upload avatar to Strapi
        avatarResponse = await axios.post(
          `http://localhost:1337/api/upload`,
          avatarFormData,
          {
            headers: {
              Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (avatarResponse.status !== 200) {
          throw new Error("Failed to upload avatar.");
        }
      }

      // Prepare user data for updating
      const updatedUser = {
        name: event.target.name.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
        gender: event.target.gender.value,
        dob: event.target.dob.value,
      };

      // Attach the uploaded avatar ID if an image was uploaded
      if (avatarResponse && avatarResponse.data && avatarResponse.data[0]) {
        updatedUser.avatar = avatarResponse.data[0].id; // Attach uploaded file ID
      }

      // Update the user profile
      const response = await axios.put(
        `http://localhost:1337/api/users/${putId}`,
        updatedUser,
        {
          headers: {
            Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Profile updated successfully!");
      } else {
        throw new Error("Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to update profile. Please try again.");
    }
  };


  const handleAddressSubmit = async (addresses) => {
    console.log(addresses);
    setError("");
    setSuccess("");
  
    try {
      const jwt = localStorage.getItem("jwt"); 
      if (!jwt) throw new Error("User not authenticated");
  
      // Fetch user data
      const userResponse = await axios.get(`http://localhost:1337/api/users/${putId}?populate=*`, {
        headers: {
          Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
        },
      });
  
      console.log("Full user response:", userResponse);
  
      const existingAddresses = userResponse.data?.addresses || [];
      console.log("Existing addresses:", existingAddresses);
  
      const jsonAddresses = addresses.map((address) => ({
        name: address.name,
        phone: address.phone,
        address: address.address,
        type: address.type,
        users_permissions_user: putId,
      }));
  
      const uniqueAddresses = jsonAddresses.filter((newAddress) => {
        return !existingAddresses.some((existing) =>
          existing.name === newAddress.name &&
          existing.phone === newAddress.phone &&
          existing.address === newAddress.address &&
          existing.type === newAddress.type
        );
      });
  
      console.log("Unique addresses to be posted:", uniqueAddresses);
  
      const updatedAddresses = await Promise.all(
        uniqueAddresses.map(async ({ name, phone, address, type, users_permissions_user }) => {
          try {
            const response = await axios.post(
              `http://localhost:1337/api/addresses`,
              {
                data: { name, phone, address, type, users_permissions_user },
              },
              {
                headers: {
                  Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
                },
              }
            );
            return response.data;
          } catch (err) {
            console.error("Error posting address:", { name, phone, address, type, users_permissions_user }, err.response?.data || err.message);
            return null;
          }
        })
      );
  
      const allSuccessful = updatedAddresses.every((response) => response !== null);
  
      if (allSuccessful) {
        setSuccess("Addresses updated successfully!");
      } else {
        // setError("Failed to update addresses. Please try again.");
      }
    } catch (err) {
      console.error("Error during address submission:", err.message || err);
      // setError("Failed to update addresses. Please try again.");
    }
  };


  const handlePaymentSubmit = async (payments) => {
    console.log(payments);
    setError("");
    setSuccess("");
  
    try {
      const jwt = localStorage.getItem("jwt"); 
      if (!jwt) throw new Error("User not authenticated");
  
      // Fetch user data
      const userResponse = await axios.get(`http://localhost:1337/api/users/${putId}?populate=*`, {
        headers: {
          Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
        },
      });
  
      console.log("Full user response:", userResponse);
  
      const existingPayments = userResponse.data?.payments || [];
      console.log("Existing payments:", existingPayments);
  
      const jsonAddresses = payments.map((payment) => ({
        name: payment.name,
        phone: payment.phone,
        cardNumber: payment.cardNumber,
        expireDate: payment.expireDate,
        CVV: payment.CVV,
        type: payment.type,
        users_permissions_user: putId,
      }));
  
      const uniquePayments = jsonAddresses.filter((newAddress) => {
        return !existingPayments.some((existing) =>
          existing.name === newAddress.name &&
          existing.phone === newAddress.phone &&
          existing.cardNumber === newAddress.cardNumber &&
          existing.expireDate === newAddress.expireDate &&
          existing.CVV === newAddress.CVV &&
          existing.type === newAddress.type
        );
      });
  
      console.log("Unique payments to be posted:", uniquePayments);
  
      const updatedPayments = await Promise.all(
        uniquePayments.map(async ({ name, phone, cardNumber, expireDate, CVV, type, users_permissions_user }) => {
          try {
            const response = await axios.post(
              `http://localhost:1337/api/payments`,
              {
                data: { name, phone, cardNumber, expireDate, CVV, type, users_permissions_user },
              },
              {
                headers: {
                  Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
                },
              }
            );
            return response.data;
          } catch (err) {
            console.error("Error posting address:", { name, phone, cardNumber, expireDate, CVV, type, users_permissions_user }, err.response?.data || err.message);
            return null;
          }
        })
      );
  
      const allSuccessful = updatedPayments.every((response) => response !== null);
  
      if (allSuccessful) {
        setSuccess("Payment updated successfully!");
      } else {
        // setError("Failed to update addresses. Please try again.");
      }
    } catch (err) {
      console.error("Error during address submission:", err.message || err);
      // setError("Failed to update addresses. Please try again.");
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;

  return (
    <div className="container py-5">
      <div className="row">
        {/* Sidebar */}
        <Sidebar user={user} />


        {/* Main Content */}
        {/* Check URL Path */}
        {location.pathname === "/user/account" && (
          <Account
            user={user}
            success={success}
            error={error}
            handleAccountSubmit={handleAccountSubmit}
          />
        )}
        {location.pathname === "/user/change-password" && (
          <ChangePassword
          // user={user}
          // success={success}
          // error={error}
          // handleFormSubmit={handleFormSubmit}
          />
        )}
        {location.pathname === "/user/payment" && (
          <Payment user={user} success={success} error={error} handlePaymentSubmit={handlePaymentSubmit} />
        )}
        {location.pathname === "/user/address" && (
          <Address user={user} success={success} error={error} handleAddressSubmit={handleAddressSubmit} />
        )}
        {location.pathname === "/user/wishlist" && (
          <Wishlist user={user} />
        )}
        {location.pathname === "/user/history" && (
          <History user={user} />
        )}
        {location.pathname === "/user/reviews" && (
          <Reviews user={user} />
        )}
        {location.pathname === "/order/history" && (
          <Order user={user} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;