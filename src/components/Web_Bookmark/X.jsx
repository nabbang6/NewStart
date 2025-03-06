import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const X = ({
  size,
  className,
  img = "https://c.animaapp.com/WStZlVhZ/img/size-24@2x.png",
  onClick,
}) => {
  return (
    <img
      className={`x ${size} ${className}`}
      alt="Size"
      onClick={onClick}
      style={{ cursor: "pointer" }} // 클릭 가능 표시
      src={
        size === "sixteen"
          ? "https://c.animaapp.com/WStZlVhZ/img/size-16@2x.png"
          : size === "twenty"
          ? "https://c.animaapp.com/WStZlVhZ/img/size-20@2x.png"
          : size === "twenty-four"
          ? img
          : size === "thirty-two"
          ? "https://c.animaapp.com/WStZlVhZ/img/size-32@2x.png"
          : size === "forty"
          ? "https://c.animaapp.com/WStZlVhZ/img/size-40@2x.png"
          : "https://c.animaapp.com/WStZlVhZ/img/size-48@2x.png"
      }
    />
  );
};

X.propTypes = {
  size: PropTypes.oneOf([
    "sixteen",
    "twenty-four",
    "forty-eight",
    "twenty",
    "thirty-two",
    "forty",
  ]),
  img: PropTypes.string,
  onClick: PropTypes.func,
};

export default X;
