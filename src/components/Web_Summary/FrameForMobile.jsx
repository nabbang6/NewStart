import React from "react";
import "./style.css";
import ReadOriginalButton from "./ReadOriginalButton";

export const MobileForFrame = ({
  className,
  title,
  content,
  link,
  onButtonClick,
}) => {
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick(link); // 부모에서 전달받은 함수 호출
    }
  };

  return (
    <div className="overlap-group-2">
      <div className="frame-3">
        <img
          className="free-icon-quote"
          alt="Free icon quote"
          src="https://c.animaapp.com/UCp2MqVE/img/free-icon-quote-9298522-1@2x.png"
        />
        <p className="text-wrapper-6">{title}</p>
        <p className="element-2">{content}</p>
      </div>
      <div className="under-text-button-wrapper">
        <ReadOriginalButton
          className="button-instance"
          hasSymbol={false}
          label="원문 읽기"
          labelClassName="instance-node"
          labelType="symbol-text"
          onMaterial={false}
          size="small"
          state="enabled"
          style="filled"
          onClick={() => handleClick(link)}
        />
      </div>
    </div>
  );
};

export default MobileForFrame;
