import React, { useState, useEffect, useRef } from "react";
import { useWindowWidth } from "../../breakpoints";
import ReadOriginalButton from "../../components/Web_Summary/ReadOriginalButton";
import Frame from "../../components/Web_Summary/Frame";
import MenuForPC from "../../components/MenuForPC/MenuForPC";
import ReturnIcon from "../../components/Web_Summary/ReturnIcon";
import "./style.css";
import MobileForFrame from "../../components/Web_Summary/FrameForMobile";
import REACT_APP_API__URL from "../../config";

export const Web_Summary = () => {
  const [summaryData, setSummaryData] = useState([]); // 데이터를 저장할 곳
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const screenWidth = useWindowWidth();
  const wrapRef = useRef(null); // wrap 요소 참조
  const isAnimating = useRef(false);

  /***** 데이터 로드 *****/
  useEffect(() => {
    // API 호출
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/summary/view`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
          mode: "cors",
        });
        if (!response.ok) throw new Error("데이터를 가져오는 데 실패했습니다.");
        const result = await response.json();
        setSummaryData(result.summary); // summary 데이터 설정
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /***** 스크롤 *****/
  const handleScroll = (e) => {
    if (isAnimating.current) return; // 애니메이션 중이면 이벤트 무시
    e.preventDefault(); // 기본 스크롤 방지
    const pageCount = summaryData.length; // 총 페이지 수

    // deltaY 값에 따라 페이지 변경
    if (e.deltaY > 0) {
      setCurrentPage((prev) => {
        const nextPage = Math.min(prev + 1, pageCount - 1);
        if (prev !== nextPage) isAnimating.current = true; // 페이지 변경 시 애니메이션 시작
        return nextPage;
      });
    } else if (e.deltaY < 0) {
      setCurrentPage((prev) => {
        const prevPage = Math.max(prev - 1, 0);
        if (prev !== prevPage) isAnimating.current = true; // 페이지 변경 시 애니메이션 시작
        return prevPage;
      });
    }
  };

  // 애니메이션 종료 시점 감지 (requestAnimationFrame 사용)
  useEffect(() => {
    if (isAnimating.current) {
      requestAnimationFrame(() => {
        // 여기서 현재 화면이 실제로 이동 완료된 후 상태를 해제
        isAnimating.current = false;
      });
    }
  }, [currentPage]);

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false }); // 스크롤 이벤트 등록

    return () => {
      window.removeEventListener("wheel", handleScroll); // 컴포넌트 언마운트 시 이벤트 제거
    };
  }, [summaryData]);

  /***** wrap 스타일 업데이트 *****/
  useEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.style.transform = `translateY(-${currentPage * 100}vh)`;
      wrapRef.current.style.transition = "transform 0.5s ease-in-out";
    }
  }, [currentPage]);

  /***** 원문 읽기 버튼 클릭 이벤트 *****/
  const handleButtonClick = (link) => {
    console.log("Button clicked:", link);
    if (link) {
      window.open(link, "_blank"); // 새 탭에서 링크 열기
    }
  };

  return (
    <div ref={wrapRef} class="wrap">
      {summaryData.map((data) => (
        <div key={data.summary_id} className="summary">
          <div className="div-3">
            {screenWidth < 1512 ? ( // 모바일 화면
              <div className="overlap">
                <ReturnIcon className="outline-interface-caret-left" />
                <MobileForFrame
                  className="mobile"
                  title={data.title}
                  content={data.content}
                  link={data.link}
                  onButtonClick={handleButtonClick}
                />{" "}
                {/* 모바일 Frame */}
                <img
                  className="summary-icon-3"
                  alt="Icon"
                  src="https://c.animaapp.com/UCp2MqVE/img/icon-10@2x.png"
                />
              </div>
            ) : (
              // PC 화면
              <>
                <div className="frame-5">
                  <div className="frame-4">
                    <div className="overlap-group-wrapper">
                      <div className="overlap-group-3">
                        <img
                          className="article-box"
                          alt="Article box"
                          src="https://c.animaapp.com/UCp2MqVE/img/article-box.png"
                        />

                        <div className="textbox">
                          <div className="frame-36-wrapper">
                            <div className="div-wrapper">
                              <div className="div">
                                <Frame
                                  className="frame-36"
                                  title={data.title}
                                  content={data.content}
                                />{" "}
                                {/* PC Frame */}
                              </div>
                            </div>
                          </div>
                        </div>

                        <img
                          className="quotes"
                          alt="Quotes"
                          src="https://c.animaapp.com/UCp2MqVE/img/quotes@2x.png"
                        />

                        <ReadOriginalButton
                          className="moreread-button"
                          hasSymbol={false}
                          label="원문 읽기"
                          labelClassName="moreread-button-2"
                          labelType="symbol-text"
                          onMaterial={false}
                          size="small"
                          state="enabled"
                          style="filled"
                          onClick={() => handleButtonClick(data.link)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Frame마다 추가되는 MenuForPC */}
                  <MenuForPC
                    className="frame-51"
                    IsActivated="yeshomeis"
                    HomeTabActivated="https://c.animaapp.com/zuoomGM9/img/icon-9@2x.png"
                  />
                  {/* Frame마다 추가되는 하단 클릭 이미지 */}
                  <img
                    className="icon-4"
                    alt="Icon"
                    src="https://c.animaapp.com/UCp2MqVE/img/icon-10@2x.png"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Web_Summary;
