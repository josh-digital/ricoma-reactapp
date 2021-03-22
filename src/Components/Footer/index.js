import React from "react";
import logo from "../../Assets/Li Logo.svg";
import "./style.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <img className="footer-logo" alt="li logo" src={logo} />
        <nav className="footer-nav">
          <ul className="footer-ul">
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
          </ul>
          <ul className="footer-ul">
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
          </ul>
          <ul className="footer-ul">
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
