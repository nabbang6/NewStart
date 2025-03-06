import PropTypes from "prop-types";
import React from "react";
import RadioButton from "./RadioButton";
import "./style.css";

export const Terms = ({ isActive, onClick, className, type }) => {
  return (
    <div
      className={`web-signup-on ${className} ${type || ""}`}
      onClick={onClick} // 클릭 이벤트를 외부로 전달
    >
      <RadioButton
        className={`${isActive ? "class-2" : ""}`}
        ellipseClassName={`${isActive ? "class" : ""}`}
        frameClassName={`${isActive ? "class-3" : ""}`}
        onOff={isActive}
        overlapGroupClassName={`${isActive ? "class-4" : ""}`}
      />
    </div>
  );
};

Terms.propTypes = {
  isActive: PropTypes.bool.isRequired, // 현재 상태: true(활성) 또는 false(비활성)
  onClick: PropTypes.func.isRequired, // 클릭 이벤트 핸들러
  className: PropTypes.string, // 추가 클래스 이름
  type: PropTypes.string, // 전체 동의와 개별 항목을 구분하기 위한 속성
};

export default Terms;
