import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const ReadOriginalButton = ({
  label = "Play",
  size,
  style,
  state,
  onMaterial,
  labelType,
  className,
  hasSymbol = true,
  labelClassName,
  onClick,
}) => {
  return (
    <div
      className={`web-summary-button ${labelType} ${state} ${style} ${size} on-material-${onMaterial} ${className}`}
      onClick={onClick}
      style={{ cursor: "pointer" }} // 클릭 가능 표시
    >
      {labelType === "symbol-text" && (
        <>
          <>{hasSymbol && <div className="text-wrapper">􀊄</div>}</>

          <div className={`label ${labelClassName}`}>{label}</div>
        </>
      )}

      {["symbol", "text"].includes(labelType) && (
        <div className="symbol-2">
          {labelType === "symbol" && <>􀊄</>}

          {labelType === "text" && <>{label}</>}
        </div>
      )}
    </div>
  );
};

ReadOriginalButton.propTypes = {
  label: PropTypes.string,
  size: PropTypes.oneOf(["large", "medium", "small"]),
  style: PropTypes.oneOf(["plain", "gray", "tinted", "filled"]),
  state: PropTypes.oneOf(["disabled", "enabled"]),
  onMaterial: PropTypes.bool,
  labelType: PropTypes.oneOf(["text", "symbol-text", "symbol"]),
  hasSymbol: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ReadOriginalButton;
