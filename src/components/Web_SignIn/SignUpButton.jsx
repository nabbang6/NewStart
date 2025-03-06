import React from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate
import "./style.css";

export const SignUpButton = ({ className }) => {
  const navigate = useNavigate(); // navigate 함수 정의
  return (
    <div
      className={`web-signin-frame`}
      onClick={() => navigate("/auth/joinForm")} // 클릭 시 "/joinForm" 경로로 이동
      style={{ cursor: "pointer" }} // 클릭 가능하도록 커서 변경
    >
      <div className={`text-wrapper-2 ${className}`}>회원가입</div>
    </div>
  );
};

export default SignUpButton;
