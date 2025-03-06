import PropTypes from "prop-types";
import React, { useReducer } from "react";
import bookmark from "./bookmark.png";
import state_hover from "./state_hover.png";
import state_bookmark_filled from "./state_bookmark_filled.png";

import "./style.css";

export const BookmarkHover = ({ 
  classNameForBookmarkImg,
  stateProp, 
  onBookmarkChange, // 상태 변화를 부모에게 알릴 콜백
}) => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "default",
  });

  const handleClick = () => {
    if (state.state === "bookmark-filled") {
      dispatch({ type: "unbookmark" });
      if (onBookmarkChange) onBookmarkChange("unbookmark");
    } else {
      dispatch({ type: "bookmark" });
      if (onBookmarkChange) onBookmarkChange("bookmark");
    }
  };

  return (
    <>
      <div
        className={`web-headline-bookmark ${
          state.state === "hover"
            ? "state-hover"
            : state.state === "bookmark-filled"
            ? "state-bookmark-filled"
            : "state-default"
        }`}
        onMouseEnter={() => {
          if (state.state !== "bookmark-filled") {
            dispatch({ type: "mouse_enter" });
          }
        }}
        onMouseLeave={() => {
          if (state.state !== "bookmark-filled") {
            dispatch({ type: "mouse_leave" });
          }
        }}
        onClick={handleClick}
      >
        <img
          alt="State bookmark"
          className={`${classNameForBookmarkImg}`}
          src={
            state.state === "hover"
              ? state_hover
              : state.state === "bookmark-filled"
              ? state_bookmark_filled
              : bookmark
          }
        />
      </div>
    </>
  );
};

function reducer(state, action) {
  switch (action.type) {
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
    case "bookmark":
      return {
        ...state,
        state: "bookmark-filled",
      };
    case "unbookmark":
      return {
        ...state,
        state: "default",
      };
    default:
      return state;
  }
}

BookmarkHover.propTypes = {
  stateProp: PropTypes.oneOf(["bookmark-filled", "hover", "default"]),
  stateDefaultClassName: PropTypes.string,
};

export default BookmarkHover;
