import React, { useState, useEffect } from "react";
import ArrowLeft from "./ArrowLeft";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate
import "./style.css";

export const Return = ({ divClassName }) => {
  const navigate = useNavigate(); // navigate 함수 정의
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      console.log("Loaded userId from localStorage:", storedUserId);
      setUserId(storedUserId);
    } else {
      console.error("userId가 localStorage에 없습니다.");
    }
  }, []);
  return (
    <div
      className="wps-frame"
      onClick={() => navigate(`/profile/${userId}`)} // 클릭 시 "/profile" 경로로 이동
      style={{ cursor: "pointer" }}
    >
      <div className={`text-wrapper ${divClassName}`}>프로필로 돌아가기</div>

      <ArrowLeft
        img="https://c.animaapp.com/G4E98Tez/img/arrow-left-2@2x.png"
        size="twenty-four"
      />
    </div>
  );
};

export default Return;
