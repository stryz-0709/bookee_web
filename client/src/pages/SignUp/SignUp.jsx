import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();

        // Basic validation
        if (password !== retypePassword) {
            setError("Passwords do not match");
            setSuccess("");
            return;
        }

        try {
            // Call Strapi register endpoint
            const response = await axios.post("http://localhost:1337/api/auth/local/register", {
                username,
                email,
                password,
            });

            // Handle successful registration
            console.log("User registered successfully:", response.data);

            // Navigate to the home screen
            navigate("/");

        } catch (err) {
            // Handle errors
            const errorMessage = err.response?.data?.error?.message || "Something went wrong.";
            setError(errorMessage);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center my-5">
            <div className="card p-4 shadow-lg" style={{ width: "450px" }}>
                <h2 className="text-center mb-4">Create an Account</h2>

                {/* Display Error or Success Message */}
                {error && (
                    <div className="alert alert-danger text-center" role="alert">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="alert alert-success text-center" role="alert">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSignup}>
                    <div className="form-group mb-3">
                        <label htmlFor="username" className="form-label">
                            Username <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email" className="form-label">
                            Email <span className="text-danger">*</span>
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password" className="form-label">
                            Password <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </button>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="retypePassword" className="form-label">
                            Retype Password <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                            <input
                                type={showRePassword ? "text" : "password"}
                                className="form-control"
                                id="retypePassword"
                                placeholder="Retype password"
                                value={retypePassword}
                                onChange={(e) => setRetypePassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowRePassword(!showRePassword)}
                                aria-label="Toggle password visibility"
                            >
                                {showRePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-danger w-100">
                        Create Account
                    </button>
                    <div className="text-center mt-3">
                        <p>
                            Already have an account?{" "}
                            <a href="/login" className="text-decoration-none text-danger">
                                Login
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;