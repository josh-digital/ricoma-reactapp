import React, { useRef } from "react";
import "./styleDrawer.css";

export default function OpenDrawer(props) {
  const items = ["Lorem", "ipsum", "Excepteur", "Consectetur", "Veniam"];

  const handleClickOutside = (e) => {
    props.handleClose();
  };

  const handleClickInside = (e) => {
    e.stopPropagation();
  };

  const ref = useRef();
  return (
    <div
      className="main-nav-container"
      ref={ref}
      onClick={(e) => handleClickOutside(e)}
    >
      <div className="content" onClick={(e) => handleClickInside(e)}>
        <div className="header-content">
          {/* <div>abcd</div> */}
          <div onClick={props.handleClose} className="close-symbol">
            X
          </div>
        </div>
        <ul className="nav-items">
          {items.map((data, index) => (
            <li className="list-items" key={index}>
              <a href="#">{data}</a>
            </li>
          ))}
        </ul>
        {/* <ul className="nav-items">
          <li>
            <a href="#">Lorem ipsum</a>
          </li>
          <li>
            <a href="#">Lorem</a>
          </li>
          <li>
            <a href="#">ipsum</a>
          </li>
          <li>
            <a href="#">Excepteur</a>
          </li>
          <li>
            <a href="#">Consectetur</a>
          </li>
          <li>
            <a href="#">Veniam</a>
          </li>
        </ul> */}
      </div>
    </div>
  );
}
