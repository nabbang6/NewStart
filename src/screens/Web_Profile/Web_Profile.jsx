import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { useNavigate, useParams } from "react-router-dom"; // 페이지 이동을 위한 useNavigate
import ProfileEdit from "../../components/Web_Profile/ProfileEdit";
import Logout from "../../components/Web_Profile/Logout";
import MenuForPC from "../../components/MenuForPC/MenuForPC";
import ToggleButton from "../../components/Web_Profile/ToggleButton";
import User from "../../components/Web_Profile/User";
import MenuForMobile from "../../components/MenuForMobile/MenuForMobile";
import "./style.css";
import REACT_APP_API__URL from "../../config";

export const Web_Profile = () => {
  const screenWidth = useWindowWidth();
  const navigate = useNavigate(); // navigate 함수 정의
  const { id } = useParams(); // URL에서 id 가져오기
  const [userId, setUserId] = useState(null);
  const [profileData, setProfileData] = useState({
    id: "",
    username: "",
    password: "",
    nickname: "",
    platformName: "",
    image_url: "",
    noti_yn: "N",
  });

  /***** userId 초기화 *****/
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!id && storedUserId) {
      console.log("Loaded userId from localStorage:", storedUserId);
      setUserId(storedUserId);
      navigate(`/profile/${storedUserId}`, { replace: true });
    } else {
      console.error("userId가 localStorage에 없습니다.");
    }
  }, [id, navigate]);

  /**** 프로필 데이터 로드 ****/
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return; // userId가 없으면 함수 실행 중단
      try {
        const response = await fetch(`/api/profile/${userId}`, {
          method: "GET",
          headers: { Accept: "application/json" },
          credentials: "include",
          mode: "cors",
        });
        const data = await response.json();
        setProfileData(data.userentity); // userentity의 데이터를 상태로 설정
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [userId]);

  /**** 비밀번호 재설정 버튼 렌더링 여부 ****/
  const showResetPasswordButton = profileData.platformName === "email";

  /**** 로그아웃 처리 ****/
  const handleLogout = async () => {
    const confirmLogout = window.confirm("정말 로그아웃하시겠습니까?"); // 로그아웃 확인 메시지

    if (!confirmLogout) {
      // 사용자가 취소를 누르면 로그아웃을 중단
      return;
    }
    try {
      // 서버로 로그아웃 요청 전송
      const response = await fetch(`/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        mode: "cors",
      });

      if (response.ok) {
        localStorage.removeItem("userId");
        console.log("userId가 localStorage에서 제거되었습니다.");

        navigate("/login"); // 로그인 페이지로 리디렉션
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  /**** 프로필 편집 페이지 이동 시 데이터 전달 ****/
  const handleEditProfile = () => {
    navigate("/profile/update", { state: { profileData } });
  };

  return (
    <div className="web-profile">
      <div className="div-3">
        {screenWidth < 1512 && ( //모바일용 화면
          <>
            <div className="mobile-screen-for-web-profile">
              <div className="title-wrapper">
                <div className="title-2">프로필</div>
              </div>
              <div className="frame-2">
                <div className="frame-3">
                  <div className="user-wrapper">
                    <User style="solid" />
                  </div>

                  <div className="frame-4">
                    {/* 닉네임과 이메일 출력 */}
                    <div className="text-wrapper-6">{profileData.nickname}</div>

                    <div className="group">
                      <div className="text-wrapper-7">
                        {profileData.username}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="button-wrapper">
                  <ProfileEdit
                    className="button-instance"
                    divClassName="instance-node"
                    onClick={() => handleEditProfile()}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <img
                  className="line"
                  alt="Line"
                  src="https://c.animaapp.com/KaiTeIt5/img/line-7@2x.png"
                />
              </div>

              <div className="frame-5">
                <div className="frame-6">
                  <div className="frame-7">
                    <div className="text-wrapper-8">알림 설정</div>

                    <div className="text-wrapper-9">
                      매일 08:00 알림을 전송합니다.
                    </div>
                  </div>
                  <ToggleButton />
                </div>

                {/* 비밀번호 재설정 버튼 - email 로그인일 때만 렌더링 */}
                {showResetPasswordButton && (
                  <div className="frame-wrapper">
                    <div className="div-wrapper">
                      <div
                        className="text-wrapper-8"
                        onClick={() =>
                          navigate("/profile/password", {
                            state: { profileData },
                          })
                        }
                        style={{ cursor: "pointer" }}
                      >
                        비밀번호 재설정
                      </div>
                    </div>
                  </div>
                )}

                <Logout
                  className="frame-16"
                  divClassName="frame-instance"
                  onClick={() => {
                    handleLogout();
                  }}
                />
              </div>

              {/* 모바일용 네비게이터 */}
              <MenuForMobile
                srcforprofileicon="https://c.animaapp.com/KaiTeIt5/img/icon-14@2x.png"
                activeTab="profile"
              />
            </div>
          </>
        )}

        {screenWidth >= 1512 && ( //PC용 화면
          <>
            <div className="frame-8">
              <div className="title-3">
                <div className="text-wrapper-10">프로필</div>
              </div>

              <div className="div-4">
                <div className="frame-9">
                  <div className="frame-for-profileicon-web-profile">
                    <div className="user-instance-wrapper">
                      <User style="solid" />
                    </div>

                    <div className="textbox">
                      {/* 닉네임과 이메일 출력 */}
                      <div className="nickname">{profileData.nickname}</div>
                      <div className="email">{profileData.username}</div>
                    </div>
                  </div>
                  <div className="frame-for-setbutton-web-profile">
                    <ProfileEdit
                      className="button-2"
                      onClick={() => handleEditProfile()}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <img
                    className="line-2"
                    alt="Line"
                    src="https://c.animaapp.com/KaiTeIt5/img/line-7-1@2x.png"
                  />
                </div>

                <div className="button-frame">
                  <div className="button-menu">
                    <div className="alram-button">
                      <div className="alram-button-text-for-web-profile">
                        <div className="alram-set">
                          <div className="text-wrapper-11">알림 설정</div>
                        </div>

                        <div className="detail-text">
                          <div className="text-wrapper-12">
                            매일 08:00 알림을 전송합니다.
                          </div>
                        </div>
                      </div>
                      <ToggleButton />
                    </div>

                    <div className="button-3">
                      {/* 비밀번호 재설정 버튼 조건부 렌더링 */}
                      {showResetPasswordButton && (
                        <div
                          className="text-wrapper-11"
                          onClick={() =>
                            navigate("/profile/password", {
                              state: { profileData },
                            })
                          }
                          style={{ cursor: "pointer" }}
                        >
                          비밀번호 재설정
                        </div>
                      )}
                      <Logout
                        className="frame-16"
                        onClick={() => {
                          handleLogout();
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <MenuForPC
              className="menu-instance"
              IsActivated="yesprofileis"
              ProfileTabActivated="https://c.animaapp.com/zuoomGM9/img/icon-4@2x.png"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Web_Profile;
