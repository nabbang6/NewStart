import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const CompleteButton = ({
  disabled = false,
  className,
  text = "다음",
  divClassName,
  onClick, 
}) => {
  return (
    <div className={`sign-up-profile-state-disabled-wrapper disabled-${disabled} ${className}`}
      onClick={!disabled ? onClick : undefined} // disabled 상태가 아닐 때만 onClick 작동
      style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      >
      <div className= {`text-wrapper ${divClassName}`}>{text}</div>
    </div>
  );
};

CompleteButton.propTypes = {
  disabled: PropTypes.bool,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default CompleteButton;