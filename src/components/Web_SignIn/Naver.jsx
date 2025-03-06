import React from "react";
import "./style.css";
import REACT_APP_API__URL from "../../config";

export const Naver = ({ className, classNameformobiletext }) => {
  const handleClick = () => {
    window.location.href = `/oauth2/authorization/naver`; // 네이버 api 로그인 경로로 이동
  };

  return (
    <div className={`web-signin-naver ${className}`} onClick={handleClick}>
      <div className="logo">
        <div className="overlap-group">
          <div className="rectangle" />

          <div className="rectangle-2" />

          <img
            className="img"
            alt="Rectangle"
            src="https://c.animaapp.com/IP5lyiL7/img/rectangle-4-1@2x.png"
          />
        </div>
      </div>
      <div className={`div ${classNameformobiletext}`}>네이버로 로그인</div>
    </div>
  );
};

export default Naver;
