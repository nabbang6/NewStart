import React from "react";
import "./style.css";

export const ProfileEdit = ({ className, divClassName, onClick }) => {
  return (
    <button
      className={`web-profile-button ${className}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className={`text-wrapper ${divClassName}`}>프로필 편집</div>
    </button>
  );
};

export default ProfileEdit;
