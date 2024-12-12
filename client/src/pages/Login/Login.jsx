import React, { useState, useEffect } from "react";
import axios from "axios";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Check if "Remember Me" is set and auto-fill username
  useEffect(() => {
    const savedUsername = localStorage.getItem("rememberedUsername");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: username,
        password: password,
      });
  
      const { jwt, user } = response.data;
      console.log("Logged in successfully:", user);

      const userRole = user.userRole?.toLowerCase();

      console.log("User Role:", userRole);

      localStorage.setItem("jwt", jwt);
      dispatch(login({ jwt, user }));
  
      if (rememberMe) {
        localStorage.setItem("rememberedUsername", username);
      } else {
        localStorage.removeItem("rememberedUsername");
      }
  
      switch (userRole) {
        case "admin":
          navigate("/admin");
          break;
        case "publisher":
          navigate("/publisher");
          break;
        case "user":
          navigate("/");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err.response?.data?.message ||
        "An error occurred while logging in. Please try again."
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center my-5">
      <div className="card p-4 shadow-lg" style={{ width: "450px" }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
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
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember Me
            </label>
          </div>
          <button type="submit" className="btn btn-danger w-100">
            Login
          </button>
          <div className="text-center mt-3">
            <p>
              Don't have an account?{" "}
              <a href="/signup" className="text-decoration-none text-danger">
                Signup
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;