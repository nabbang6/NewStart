import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const ArrowLeft = ({
  size,
  img = "https://c.animaapp.com/G4E98Tez/img/size-24@2x.png",
}) => {
  return (
    <img
      className={`arrow-left ${size}`}
      alt="Size"
      src={
        size === "sixteen"
          ? "https://c.animaapp.com/G4E98Tez/img/size-16@2x.png"
          : size === "twenty"
          ? "https://c.animaapp.com/G4E98Tez/img/size-20@2x.png"
          : size === "twenty-four"
          ? img
          : size === "thirty-two"
          ? "https://c.animaapp.com/G4E98Tez/img/size-32@2x.png"
          : size === "forty"
          ? "https://c.animaapp.com/G4E98Tez/img/size-40@2x.png"
          : "https://c.animaapp.com/G4E98Tez/img/size-48@2x.png"
      }
    />
  );
};

ArrowLeft.propTypes = {
  size: PropTypes.oneOf([
    "sixteen",
    "twenty-four",
    "forty-eight",
    "twenty",
    "thirty-two",
    "forty",
  ]),
  img: PropTypes.string,
};

export default ArrowLeft;
