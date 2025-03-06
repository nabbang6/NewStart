import React from "react";
import PropTypes from "prop-types";
import X from "../../components/Web_Bookmark/X";
import "./style.css";

export const Frame = ({ bookmark_id, title, category, press, onDelete }) => {
  const handleDelete = () => {
    onDelete(bookmark_id);
  };
  return (
    <div className="web-bookmark-Frame-div-1">
      <div className="web-bookmark-Frame-div-2">
        <div className="web-bookmark-Frame-text-1">{title}</div>

        <div className="web-bookmark-Frame-cn-1">
          {category} | {press}
        </div>

        <img
          className="web-bookmark-line"
          alt="Line"
          src="https://c.animaapp.com/WStZlVhZ/img/line-8-2@2x.png"
        />
      </div>

      <X
        className="web-bookmark-x-instance"
        img="https://c.animaapp.com/WStZlVhZ/img/x-2@2x.png"
        size="twenty-four"
        onClick={handleDelete}
      />
    </div>
  );
};

Frame.propTypes = {
  bookmark_id: PropTypes.number,
  title: PropTypes.string,
  category: PropTypes.string,
  press: PropTypes.string,
  onDelete: PropTypes.func,
};

export default Frame;
