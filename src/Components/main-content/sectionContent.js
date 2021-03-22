import React from "react";
import logo from "../../Assets/man-standing (3).jpg";

export default function SectionContent() {
  return (
    <div style={{ position: "relative" }}>
      <div className="man-standing-img-container">
        <div className="section-content">
          <div className="main-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </div>
          <div className="sub-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
          <button className="btn">Lorem</button>
        </div>
      </div>
      <img
        alt="man standing on tower"
        src={logo}
        className="man-standing-img"
      />
    </div>
  );
}
