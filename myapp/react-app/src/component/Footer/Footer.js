import React from 'react';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className="logo-text">Hangang Festival</h2>
          <p>
            The Hangang Festival is an annual event that showcases a variety of events and performances, delivering joy and happiness to visitors.
          </p>
        </div>

        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/Festival">Festival Info</a></li>
            <li><a href="/Gallery">Gallery</a></li>
            <li><a href="/Mypage">My Page</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <p><i className="fas fa-phone"></i> +82-2-1234-5678</p>
            <p><i className="fas fa-envelope"></i> contact@hangangfestival.com</p>
            <p><i className="fas fa-map-marker-alt"></i> 123 Hangang-ro, Seoul, South Korea</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023 Hangang Festival. All rights reserved.</p>
      </div>
    </footer>
  );
};


export default Footer;
