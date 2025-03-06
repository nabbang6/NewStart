import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const CompleteButton = ({
  disabled = false,
  className,
  text,
  divClassName,
  onClick,
}) => {
  return (
    <div
      className={`wps-state-disabled-wrapper disabled-${disabled} ${className}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className={`div ${divClassName}`}>{text}</div>
    </div>
  );
};

CompleteButton.propTypes = {
  disabled: PropTypes.bool,
  text: PropTypes.string,
};

export default CompleteButton;
