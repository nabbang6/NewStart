import PropTypes from "prop-types";
import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate
import "./style.css";

export const HomeTab = ({
  stateProp,
  srcforactivate = "https://c.animaapp.com/WStZlVhZ/img/icon-12@2x.png",
  activated,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "default",
  });
  const navigate = useNavigate(); // navigate 함수 정의
  return (
    <div
      className={`for-pc-menu-home-tab`}
      onClick={() => navigate("/")} // 클릭 시 "/main" 경로로 이동
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      {state.state === "default" && (
        <img src={srcforactivate} className="for-pc-menu-home-tab-instance" />
      )}

      {state.state === "hover" && (
        <img
          className="for-pc-menu-home-tab-filled"
          src="https://c.animaapp.com/zuoomGM9/img/icon-9@2x.png"
        />
      )}

      <div className={`for-pc-menu-home-tab-text-wrapper ${activated}`}>
        Home
      </div>
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

HomeTab.propTypes = {
  stateProp: PropTypes.oneOf(["hover", "default"]),
};

export default HomeTab;
