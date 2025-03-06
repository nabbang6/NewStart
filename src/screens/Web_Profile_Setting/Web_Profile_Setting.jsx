import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import Return from "../../components/Web_Profile_Setting/Return";
import MenuForPC from "../../components/MenuForPC/MenuForPC";
import CompleteButton from "../../components/Web_Profile_Setting/CompleteButton";
import User from "../../components/Web_Profile_Setting/User";
import "./style.css";
import REACT_APP_API__URL from "../../config";

export const Web_Profile_Setting = () => {
  const screenWidth = useWindowWidth();
  const location = useLocation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const { profileData } = location.state; // profile 페이지에서 전달된 데이터
  const [nickname, setNickname] = useState(profileData.nickname); // 닉네임 관리

  /***** userId 초기화 *****/
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      console.log("Loaded userId from localStorage:", storedUserId);
      setUserId(storedUserId);
    } else {
      console.error("userId가 localStorage에 없습니다.");
    }
  }, []);

  /**** 닉네임 변경 핸들러 ****/
  const handleNickname = (e) => {
    setNickname(e.target.value);
  };

  /**** 완료 버튼 클릭 핸들러 ****/
  const handleCompleteClick = async () => {
    if (!userId) return; // userId가 없으면 함수 실행 중단
    const requestData = {
      username: profileData.username,
      nickname,
      image_url: "test",
      noti_yn: "N",
    };

    console.log("전송할 데이터:", JSON.stringify(requestData));

    try {
      const response = await fetch(`/api/profile/updateProcess`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestData),
        credentials: "include",
        mode: "cors",
      });

      if (response.ok) {
        // 성공적으로 업데이트되면 리다이렉트
        navigate(`/profile/${userId}`);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error while updating profile:", error);
    }
  };

  return (
    <div className="web-profile-set">
      <div // 반응형 웹 기준 설정
        className="div-3"
      >
        {screenWidth >= 1512 && ( // PC용 화면
          <>
            <div className="frame-2">
              <div className="frame-3">
                <Return />
                <div className="frame-4">
                  <div className="text-wrapper-8">프로필 편집</div>
                </div>
              </div>
              <div className="overlap">
                <div className="email-frame">
                  <div className="profile">
                    <div className="overlap-group-2">
                      <div className="user-wrapper">
                        <User style="solid" />
                      </div>

                      <div className="camera">
                        <img
                          className="icon-3"
                          alt="Icon"
                          src="https://c.animaapp.com/G4E98Tez/img/icon-10@2x.png"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="email-text">
                    <div className="frame-wrapper">
                      <div className="view-wrapper">
                        <div className="view">
                          <div className="web-profile-text-wrapper-6">
                            이메일
                          </div>

                          <div className="web-profile-div-wrapper">
                            <div className="web-profile-text-wrapper-7">
                              {profileData.username}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="nickname">
                  <div className="text-wrapper-9">닉네임</div>

                  <input
                    className="text-input"
                    value={nickname}
                    onChange={handleNickname}
                    placeholder={profileData.nickname}
                  />

                  <img
                    className="line"
                    alt="Line"
                    src="https://c.animaapp.com/G4E98Tez/img/line-3-4@2x.png"
                  />
                </div>
              </div>

              <CompleteButton
                className="component-210"
                disabled={!nickname.trim()}
                divClassName="button"
                text="완료"
                onClick={() => {
                  handleCompleteClick();
                }}
              />
            </div>
            <MenuForPC
              className="menu-instance"
              IsActivated="yesprofileis"
              ProfileTabActivated="https://c.animaapp.com/zuoomGM9/img/icon-4@2x.png"
            />
          </>
        )}

        {screenWidth < 1512 && ( // 모바일용 화면
          <div className="frame-for-all-mobile-wps">
            <div className="frame-7">
              <div className="frame-50-wrapper">
                <Return divClassName="frame-50" />
              </div>

              <div className="title-wrapper">
                <div className="title-2">프로필 편집</div>
              </div>
            </div>
            <div className="frame-5">
              <div className="overlap-group-wrapper">
                <div className="overlap-group-3">
                  <div className="user-instance-wrapper">
                    <User style="solid" />
                  </div>

                  <div className="icon-wrapper">
                    <img
                      className="icon-4"
                      alt="Icon"
                      src="https://c.animaapp.com/G4E98Tez/img/icon-9@2x.png"
                    />
                  </div>
                </div>
              </div>

              <div className="frame-6">
                <div className="view-2">
                  <div className="text-wrapper-11">닉네임</div>
                  <input
                    className="text-wrapper-12"
                    value={nickname}
                    onChange={handleNickname}
                    placeholder={profileData.nickname}
                  />

                  <img
                    className="line-2"
                    alt="Line"
                    src="https://c.animaapp.com/G4E98Tez/img/line-3-3@2x.png"
                  />
                </div>

                <div className="overlap-2">
                  <div className="rectangle-2" />

                  <div className="view-3">
                    <div className="text-wrapper-11">이메일</div>

                    <div className="text-wrapper-13">
                      {profileData.username}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <CompleteButton
              className="component-210-instance"
              disabled={!nickname.trim()}
              text="완료"
              onClick={() => handleCompleteClick()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Web_Profile_Setting;
