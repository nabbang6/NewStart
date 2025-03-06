import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const NextButton = ({ className, agreement, navigateTo, emailValid, 
                      passwordValid, confirmPasswordValid, email, password, }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!agreement.all) return; // 조건이 충족되지 않았으면 아무 동작도 하지 않음
    if (!emailValid) return;
    if (!passwordValid) return;
    if (!confirmPasswordValid) return;

    // 모든 조건 만족 시 페이지 이동
    navigate(navigateTo, {
      state: {
        email,
        password
      }
    });
  };

  const isButtonActive =
    agreement.all && emailValid && passwordValid && confirmPasswordValid;


  return (
    <div
      className={`web-signup-state-disabled-wrapper ${isButtonActive ? "active" : ""} ${className}`}
      onClick={handleClick} // 항상 클릭 가능하지만 조건에 따라 동작 제어
    >
      <div className="text-wrapper">다음</div>
    </div>
  );
};

NextButton.propTypes = {
  className: PropTypes.string,
  agreement: PropTypes.shape({
    all: PropTypes.bool.isRequired,
    age: PropTypes.bool.isRequired,
    service: PropTypes.bool.isRequired,
    privacy: PropTypes.bool.isRequired,
  }).isRequired,
  navigateTo: PropTypes.string.isRequired, // 성공 시 이동할 경로
  emailValid: PropTypes.bool.isRequired,
  passwordValid: PropTypes.bool.isRequired,
  confirmPasswordValid: PropTypes.bool.isRequired,
};

export default NextButton;