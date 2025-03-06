import React, { useState, useEffect } from "react";
import { useWindowWidth } from "../../breakpoints";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate
import MenuForPC from "../../components/MenuForPC/MenuForPC";
import Headline from "../../components/Web_Main/Headline";
import Category from "../../components/Web_Main/Category";
import ToSummaryButton from "../../components/Web_Main/ToSummaryButton";
import MenuForMobile from "../../components/MenuForMobile/MenuForMobile";
import "./style.css";

export const Web_Main = () => {
  const screenWidth = useWindowWidth();
  const navigate = useNavigate(); // navigate 함수 정의
  const [time, setTime] = useState("08:00");
  /**** 업데이트 시각 표시 ****/
  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours(); // 현재 시간(0 ~ 23시)

    if (currentHour >= 8 && currentHour < 12) {
      setTime("08:00");
    } else if (currentHour >= 12 && currentHour < 18) {
      setTime("12:00");
    } else {
      setTime("18:00");
    }
  }, []);

  return (
    <div className="web-main">
      <div className="div-3">
        {screenWidth < 1512 && ( //모바일용 화면
          <>
            <div className="mobile-frame-4">
              <div className="main-view-for-mobile">
                <div className="frame-5">
                  <div className="title-2 title-2-for-mobile">
                    오늘의 1분 요약!
                  </div>

                  <ToSummaryButton
                    arrowRight="https://c.animaapp.com/zuoomGM9/img/arrow-right-2@2x.png"
                    className="component-374"
                    stateProp="default"
                    classNameformobilever="tosummary-font-for-mobile"
                    classNameformobilearrow="arrow-size-for-mobile"
                  />
                </div>

                <div
                  className="main-folder-for-mobile"
                  onClick={() => navigate("/summary/view")} // 클릭 시 "/summary" 경로로 이동
                />

                <img
                  className="line-2"
                  alt="Line"
                  src="https://c.animaapp.com/AoZMr3Yn/img/line-3-1@2x.png"
                />
              </div>
              <div className="main-headline-wrapper-for-mobile">
                <div className="main-headline-for-mobile">
                  <div className="title-3 title-3-for-mobile-font">
                    최신 헤드라인
                  </div>

                  <div className="text-wrapper-12">{time}</div>
                </div>

                <div className="main-category-wrapper-for-mobile">
                  <Category
                    classNameForMobileCategoryFrame="web-main-category-size-jojung"
                    stateProp="politics"
                  />
                </div>
                {/* 모바일 헤드라인이 있던 곳... */}
              </div>
              {/* 모바일용 네비게이터 */}
              <MenuForMobile srcformainicon="https://c.animaapp.com/zuoomGM9/img/icon-9@2x.png" />
            </div>
          </>
        )}

        {screenWidth >= 1512 && ( //PC용 화면
          <>
            <div className="frame-4">
              <div className="view">
                <div className="frame-5">
                  <div className="title-2">오늘의 1분 요약!</div>

                  <ToSummaryButton
                    arrowRight="https://c.animaapp.com/zuoomGM9/img/arrow-right-2@2x.png"
                    className="component-374"
                    stateProp="default"
                  />
                </div>

                <div
                  className="folder"
                  onClick={() => navigate("/summary/view")} // 클릭 시 "/summary" 경로로 이동
                />

                <img
                  className="line-2"
                  alt="Line"
                  src="https://c.animaapp.com/AoZMr3Yn/img/line-3-1@2x.png"
                />
              </div>

              <div className="headlinewrapperforpc">
                <div className="headline-2">
                  <div className="title-3">최신 헤드라인</div>

                  <div className="text-wrapper-12">{time}</div>
                </div>

                <div className="menu-bar-wrapper">
                  <Category stateProp="politics" />
                </div>
                {/* PC용 헤드라인이 자리하던 곳... */}
              </div>
            </div>

            <MenuForPC
              className="frame-51"
              IsActivated="yeshomeis"
              HomeTabActivated="https://c.animaapp.com/zuoomGM9/img/icon-9@2x.png"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Web_Main;
