import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import { Link } from "react-router-dom";
// import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer bg-dark pt-4">
      <div className="container">
        <div className="row">
          {/* Categories Section */}

        <div className="col-lg-3 col-6 mb-4 text-light">
          <h5>Services</h5>
          <ul className="list-unstyled">
            <li><Link className="dropdown-item" to="/terms-of-service"><small>Terms of Services</small></Link></li>
            <li><Link className="dropdown-item" to="/privacy-policy"><small>Privacy Policy</small></Link></li>
            <li><Link className="dropdown-item" to="/payment-security"><small>Payment Security Policy</small></Link></li>
            <li><Link className="dropdown-item" to="/about-bookee"><small>About Bookee</small></Link></li>
          </ul>
        </div>

        {/* Links Section */}
        <div className="col-lg-3 col-6 mb-4 bg-dark  text-light">
          <h5>Support</h5>
          <ul className="list-unstyled">
            <li><Link className="dropdown-item" to="/support/faq"><small>FAQ</small></Link></li>
            <li><Link className="dropdown-item" to="/support/return-policy"><small>Return Policy</small></Link></li>
            <li><Link className="dropdown-item" to="/support/warranty-policy"><small>Warranty Policy</small></Link></li>
            <li><Link className="dropdown-item" to="/support/shipping-policy"><small>Shipping Policy</small></Link></li>
            <li><Link className="dropdown-item" to="/support/customer-care"><small>Customer Care Policy</small></Link></li>
          </ul>
        </div>

          {/* About Section */}
          <div className="col-lg-3 col-12 mb-4 text-light">
            <h5>About</h5>
            <span><small>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </small></span>
          </div>

          {/* Contact Section */}
          <div className="col-lg-3 col-12 mb-4 text-light">
            <h5>Contact</h5>
            <div className="d-flex align-items-center mb-2">
              <PlaceIcon alt="Location" className="me-2" style={{ maxWidth: '18px', height: '18px' }} />
              <span><small>268 Lý Thường Kiệt, Phường 14, Quận 10, TP. HCM</small></span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <EmailIcon alt="Email" className="me-2" style={{ maxWidth: '18px', height: '18px' }} />
              <span><small>bookee@hcmut.edu.vn</small></span>
            </div>
            <div className="d-flex align-items-center">
              <PhoneIcon alt="Phone" className="me-2" style={{ maxWidth: '18px', height: '18px' }} />
              <span><small>1900 0099</small></span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="row border-top mt-3 bg-light">
          <div className="col-md-6 col-12 d-flex align-items-center">
            <img src="/img/logo.png" alt="Bookee" style={{ width: '150px', height: 'auto' }} />
            <span className="ms-3">
              © 2024 Bookee. All Rights Reserved.
            </span>
          </div>
          <div className="col-md-6 col-12 text-md-end mt-3 mt-md-0">
            <img src="/img/payment.png" alt="Payment Methods" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;