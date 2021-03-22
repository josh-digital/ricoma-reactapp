import React from "react";
import spinner from "../../Assets/loader.gif";
import "./style.css";

export default function Preload() {
  return (
    <div className="spinner-container">
      <img src={spinner} alt="loading..." />
    </div>
  );
}
