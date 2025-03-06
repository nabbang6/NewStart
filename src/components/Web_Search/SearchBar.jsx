import PropTypes from "prop-types";
import React, { useReducer, useRef, useEffect, useState } from "react";
import "./style.css";

export const SearchBar = ({
  property1,
  classNameForSearchIcon,
  searchRecords = [], // 부모로부터 전달받은 검색 기록
  onFetchRecords, // 부모에게 API 호출 요청
  // recordsCount = 10,
  className,
  onSearch, // 검색어를 외부로 전달하기 위한 콜백 함수
}) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });
  const searchBarRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState(""); // 검색창의 상태 관리

  useEffect(() => {
    // 클릭 상태일 때 부모에게 검색 기록 요청
    if (state.property1 === "click") {
      onFetchRecords(); // 부모에게 검색 기록 요청
    }
  }, [state.property1, onFetchRecords]);

  useEffect(() => {
    // click 상태일 때 외부 클릭을 감지
    if (state.property1 === "click") {
      const handleClickOutside = (event) => {
        if (
          searchBarRef.current &&
          !searchBarRef.current.contains(event.target)
        ) {
          dispatch("reset");
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [state.property1]);

  // recordsCount에 따른 동적 검색 기록 div 생성
  const dynamicDivs = searchRecords.map((content, index) => (
    <div
      key={index}
      className="dynamic-div-creator-for-searchbar"
      onClick={() => onSearch(content)} // 컨텐츠에 해당하는 내용을 클릭하면 바로 검색을 실행함!
    >
      <img
        src="https://c.animaapp.com/nzh65NNa/img/icon-12@2x.png"
        className="record-timer-icon"
      />
      {content}
    </div>
  ));

  // 엔터키 이벤트 처리 함수
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch(searchQuery); // 검색어를 외부로 전달
      setSearchQuery(""); // 검색어 초기화
      dispatch("reset"); // 상태를 default로 전환
    }
  };

  return (
    <div
      ref={searchBarRef}
      className={`search-bar property-1-0-${state.property1} ${className}`}
      onMouseEnter={() => {
        if (state.property1 === "default") {
          dispatch("mouse_enter");
        }
      }}
      onMouseLeave={() => {
        if (state.property1 === "hover") {
          dispatch("mouse_leave");
        }
      }}
      onClick={() => {
        // 클릭 시 click 상태로 유지
        if (state.property1 === "hover") {
          dispatch("click");
        }
      }}
    >
      {["default", "hover"].includes(state.property1) && (
        <>
          <div className="rectangle-3">
            <div className="searchbar-contents-for-first">
              <input
                className="text-wrapper-2"
                placeholder="궁금한 아티클을 찾아보세요"
              />
              <img
                src="https://c.animaapp.com/nzh65NNa/img/search-5@2x.png"
                className={`search-icon-for-search-bar ${classNameForSearchIcon}`}
              />
            </div>
          </div>
        </>
      )}

      {state.property1 === "click" && (
        <>
          <div className="rectangle-3">
            <div className="searchbar-contents-for-first">
              <input
                className="text-wrapper-2"
                placeholder="궁금한 아티클을 찾아보세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown} // 엔터키 이벤트 처리
              />
              <img
                src="https://c.animaapp.com/nzh65NNa/img/search-5@2x.png"
                className={`search-icon-for-search-bar ${classNameForSearchIcon}`}
              />
            </div>
            <div className="searchbar-search-record-box">
              <img
                src="https://c.animaapp.com/nzh65NNa/img/line-11-1@2x.png"
                className="search-record-line"
              />
              {dynamicDivs}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function reducer(state, action) {
  switch (state.property1) {
    case "default":
      if (action === "mouse_enter") {
        return { property1: "hover" };
      }
      break;
    case "hover":
      if (action === "mouse_leave") {
        return { property1: "default" };
      }
      if (action === "click") {
        return { property1: "click" };
      }
      break;
    case "click":
      // 외부 클릭 시 default로 돌아가는 reset 액션 추가
      if (action === "reset") {
        return { property1: "default" };
      }
      break;
    default:
      return state;
  }
  return state;
}

SearchBar.propTypes = {
  property1: PropTypes.oneOf(["click", "hover", "default"]),
  searchSize: PropTypes.string,
  recordsCount: PropTypes.number,
};

export default SearchBar;
