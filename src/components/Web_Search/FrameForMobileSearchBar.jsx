import React from "react";
import PropTypes from "prop-types";
import "./style.css";

export const FrameForMobileSearchBar = ({ text, newspaper }) => {
  return (
    <div className="mobile-bookmark-Frame-div-1">
      <div className="mobile-bookmark-Frame-div-2">
        <div className="mobile-bookmark-Frame-text-1">{text}</div>

        <div className="mobile-bookmark-Frame-cn-1">{newspaper}</div>

        <img
          className="web-bookmark-line"
          alt="Line"
          src="https://c.animaapp.com/WStZlVhZ/img/line-8-2@2x.png"
        />
      </div>
    </div>
  );
};

FrameForMobileSearchBar.propTypes = {
  text: PropTypes.string,
  category: PropTypes.string,
  newspaper: PropTypes.string,
};

export default FrameForMobileSearchBar;
