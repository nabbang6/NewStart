/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate
import "./style.css";

export const ToSummaryButton = ({
  stateProp,
  className,
  classNameformobilever,
  classNameformobilearrow,
  arrowRight = "https://c.animaapp.com/zuoomGM9/img/arrow-right-1@2x.png",
}) => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "default",
  });
  const navigate = useNavigate(); // navigate 함수 정의
  return (
    <div
      className={`web-main-state-default-wrapper ${state.state} ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onClick={() => navigate("/summary/view")} // 클릭 시 "/summary" 경로로 이동

    >
      <div className={`div ${classNameformobilever}`}>
        {state.state === "default" && <>아티클 요약 보러가기</>}

        {state.state === "hover" && (
          <div className="text-wrapper">아티클 요약 보러가기</div>
        )}
      </div>

      <img className={`arrow-right ${classNameformobilearrow}`} alt="Arrow right" src={arrowRight} />
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        state: "hover",
      };

    case "mouse_leave":
      return {
        ...state,
        state: "default",
      };
  }

  return state;
}

ToSummaryButton.propTypes = {
  stateProp: PropTypes.oneOf(["hover", "default"]),
  arrowRight: PropTypes.string,
};

export default ToSummaryButton;