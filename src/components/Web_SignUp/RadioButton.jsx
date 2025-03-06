import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const RadioButton = ({
  onOff,
  className,
  frameClassName,
  overlapGroupClassName,
  ellipseClassName,
}) => {
  return (
    <div className={`web-signup-radio-button on-off-${onOff} ${className}`}>
      <div className={`frame ${frameClassName}`}>
        <div className={`overlap-group ${overlapGroupClassName}`}>
          {onOff && <div className={`ellipse ${ellipseClassName}`} />}
        </div>
      </div>
    </div>
  );
};

RadioButton.propTypes = {
  onOff: PropTypes.bool,
};

export default RadioButton;
