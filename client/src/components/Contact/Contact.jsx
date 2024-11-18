import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import "./Contact.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Contact = () => {
  return (
    <div className="contact bg-danger py-4">
      <div className="container text-center">
        <p className="d-block mb-4 text-light"><strong>GET NOTIFICATIONS FOR NEW BOOKS</strong></p>
        
        {/* Email Subscription Section */}
        <div className="mail d-flex justify-content-center mb-4">
          <input 
            type="text" 
            className="form-control me-2 w-50" 
            placeholder="Enter your e-mail..." 
          />
          <button className="btn btn-warning-subtle text-light">SUBCRIBE</button>
        </div>
        
        {/* Social Media Icons */}
        <div className="icons d-flex justify-content-center gap-3">
          <FacebookIcon className="text-light" />
          <InstagramIcon className="text-light" />
          <TwitterIcon className="text-light" />
          <LinkedInIcon className="text-light" />
          <PinterestIcon className="text-light" />
        </div>
      </div>
    </div>
  );
};

export default Contact;