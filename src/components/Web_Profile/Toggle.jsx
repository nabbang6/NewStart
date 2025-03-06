import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Toggle = ({ state, className, knobClassName }) => {
  return (
    <div className={`toggle ${state} ${className}`}>
      <div className={`knob ${knobClassName}`} />
    </div>
  );
};

Toggle.propTypes = {
  state: PropTypes.oneOf(["off", "on"]),
};

export default Toggle;
