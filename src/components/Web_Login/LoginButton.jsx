import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const LoginButton = ({ 
  emailValid, 
  passwordValid,
  disabled = false,
  className,
  text = "로그인",
  divClassName,
  onClick,
}) => {

  const isButtonDisabled = disabled && !emailValid && !passwordValid;

  return (
    <div
      className={`login-state-disabled-wrapper disabled-${isButtonDisabled ? "false" : "true"} ${className}`}
      onClick={!isButtonDisabled ? undefined : onClick} // 비활성화 상태에서는 클릭 이벤트 무시
    >
      <div className={`text-wrapper ${divClassName}`}>{text}</div>
    </div>
  );
};

LoginButton.propTypes = {
  emailValid: PropTypes.bool.isRequired, // 이메일 유효성
  passwordValid: PropTypes.bool.isRequired, // 비밀번호 유효성
  disabled: PropTypes.bool,
  text: PropTypes.string,
  className: PropTypes.string,
  divClassName: PropTypes.string,
  onClick: PropTypes.func, // 클릭 이벤트 핸들러
};

export default LoginButton;