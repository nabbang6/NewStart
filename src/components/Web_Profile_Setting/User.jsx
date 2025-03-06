import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const User = ({ style }) => {
  return (
    <>
      {["duotone", "line"].includes(style) && (
        <img
          className="wps-user"
          alt="Style duotone"
          src={
            style === "line"
              ? "https://c.animaapp.com/G4E98Tez/img/style-line@2x.png"
              : "https://c.animaapp.com/G4E98Tez/img/style-duotone.png"
          }
        />
      )}
    </>
  );
};

User.propTypes = {
  style: PropTypes.oneOf(["line", "duotone", "solid"]),
};

export default User;
