import React from "react";
import PropTypes from "prop-types";
import X from "../../components/Web_Bookmark/X";
import "./style.css";

export const FrameForMobile = ({
  bookmark_id,
  title,
  category,
  press,
  onDelete,
}) => {
  const handleDelete = () => {
    onDelete(bookmark_id);
  };

  return (
    <div className="mobile-bookmark-Frame-div-1">
      <div className="mobile-bookmark-Frame-div-2">
        <div className="mobile-bookmark-Frame-text-1">{title}</div>

        <div className="mobile-bookmark-Frame-cn-1">
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

FrameForMobile.propTypes = {
  bookmark_id: PropTypes.number,
  title: PropTypes.string,
  category: PropTypes.string,
  press: PropTypes.string,
  onDelete: PropTypes.func,
};

export default FrameForMobile;
