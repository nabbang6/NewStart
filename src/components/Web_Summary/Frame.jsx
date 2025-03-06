import React, { useEffect, useState } from "react";
import "./style.css";

export const Frame = ({ className, title, content }) => {
  return (
    <div className={`web-summary-frame ${className}`}>
      <div className="div-wrapper">
        <div className="div">
          <p className="p">{title}</p>
          <p className="element">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Frame;
