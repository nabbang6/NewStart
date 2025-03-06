import React from "react";
import GoogleIcon from "./GoogleIcon";
import "./style.css";
import REACT_APP_API__URL from "../../config";

export const Google = ({
  className,
  classNameforpadding,
  classNameformobiletext,
}) => {
  const handleClick = () => {
    window.location.href = `/oauth2/authorization/google`; // 구글 api 로그인 경로로 이동
  };

  return (
    <div className={`web-signin-google ${className}`} onClick={handleClick}>
      <div className={`for-google-icon-paddingormargin ${classNameforpadding}`}>
        <GoogleIcon
          className="google-icon-instance"
          size="thirty-two-x-32"
          sizeX="https://c.animaapp.com/IP5lyiL7/img/google-icon-1@2x.png"
        />
      </div>
      <div className={`text-wrapper ${classNameformobiletext}`}>
        Google로 로그인
      </div>
    </div>
  );
};

export default Google;
