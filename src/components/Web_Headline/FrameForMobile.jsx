import React from "react";
import PropTypes from "prop-types";
import BookmarkHover from "./BookmarkHover";
import "./style.css";

export const Frame = ({
  press,
  title,
  date,
  content,
  isBookmarked,
  onBookmarkChange,
  category,
  link,
}) => {
  return (
    <div className="mobile-headline-frame">
      <div className="mobile-headline-title-wrapper">
        <p className="mobile-headline-title">{title}</p>
        <div className="mobile-headline-newspaper">{press}</div>

        <div className="time-bookmark-wrapper-for-headline-frame-for-mobile">
          <div className="mobile-headline-date">{date}</div>

          <BookmarkHover
            stateDefaultClassName="mobile-headline-bookmark-button"
            stateProp={isBookmarked ? "bookmark-filled" : "default"}
            onBookmarkChange={onBookmarkChange}
          />
        </div>
      </div>
      <img
        className="mobile-headline-line-image"
        alt="Line"
        src="https://c.animaapp.com/JmVmo2aX/img/line-7.png"
      />
      <p className="mobile-headline-article-text">{content}</p>
      <div className="web-headline-link">{link}</div>
    </div>
  );
};

Frame.propTypes = {
  press: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string,
  link: PropTypes.string,
};

export default Frame;
