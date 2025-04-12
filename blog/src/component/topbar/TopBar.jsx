import React from "react";
import "./topbar.css";

export default function TopBar() {
  return (
      <div className="top">
        <div className="topLeft" id="topIcon">
        <i class="fa-brands fa-facebook-f"></i>
        <i class="fa-brands fa-twitter"></i>
        <i class="fa-brands fa-linkedin"></i>
        <i class="fa-brands fa-github"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">HOME</li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">WRITE</li>
          <li className="topListItem">LOGOUT</li>
        </ul>
      </div>
      <div className="topRight">
        <img className="topImg" src="data:image/png;base64,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" alt="" />
      <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}