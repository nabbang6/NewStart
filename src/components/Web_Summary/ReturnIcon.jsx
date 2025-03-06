import React from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate
import "./style.css";

export const ReturnIcon = ({ className }) => {
  const navigate = useNavigate(); // navigate 함수 정의
  return (
    <img
      className={`outline-interface ${className}`}
      alt="Outline interface"
      src="https://c.animaapp.com/UCp2MqVE/img/outline-interface-caret-left-1@2x.png"
      onClick={() => navigate("/")} // 클릭 시 "/main" 경로로 이동
    />
  );
};

export default ReturnIcon;
