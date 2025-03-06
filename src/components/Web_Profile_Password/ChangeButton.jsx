import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const ChangeButton = ({
  className,
  divClassName,
  text,
  disabled,
  onClick,
}) => {
  return (
    <div
      className={`wpp-div-wrapper disabled-${disabled} ${className}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className={`text-wrapper-2 ${divClassName}`}>{text}</div>
    </div>
  );
};

ChangeButton.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ChangeButton;
