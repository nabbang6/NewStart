import PropTypes from "prop-types";
import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate
import "./style.css";

export const SearchTab = ({
  stateProp,
  srcforactivate = "https://c.animaapp.com/zuoomGM9/img/icon-10@2x.png",
  activated,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "default",
  });
  const navigate = useNavigate(); // navigate 함수 정의
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      console.log("Loaded userId from localStorage:", storedUserId);
      setUserId(storedUserId);
    } else {
      console.error("userId가 localStorage에 없습니다.");
    }
  }, []);
  return (
    <div
      className={`for-pc-menu-search-tab state-5-${state.state}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onClick={() => navigate(`/search/${userId}`)} // 클릭 시 "/search" 경로로 이동
    >
      {state.state === "default" && (
        <img src={srcforactivate} className="for-pc-menu-search-tab-icon" />
      )}

      {state.state === "hover" && (
        <img
          className="for-pc-menu-search-tab-icon"
          src="https://c.animaapp.com/nzh65NNa/img/icon-17@2x.png"
        />
      )}

      <div className={`for-pc-menu-search-tab-text-wrapper ${activated}`}>
        Search
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

SearchTab.propTypes = {
  stateProp: PropTypes.oneOf(["hover", "default"]),
};

export default SearchTab;
