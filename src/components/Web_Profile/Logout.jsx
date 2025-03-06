import React from "react";
import "./style.css";

export const Logout = ({ className, divClassName, onClick }) => {
  return (
    <div
      className={`web-profile-frame ${className}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className={`div ${divClassName}`}>로그아웃</div>
    </div>
  );
};

export default Logout;
