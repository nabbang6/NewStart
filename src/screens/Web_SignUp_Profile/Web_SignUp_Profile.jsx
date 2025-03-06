import React, { useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { useLocation } from "react-router-dom";
import CompleteButton from "../../components/Web_SignUp_Profile/CompleteButton";
import User from "../../components/Web_SignUp_Profile/User";
import { validateNickname } from "../../components/Web_SignUp_Profile/validation";
import "./style.css";
import REACT_APP_API__URL from "../../config";

export const Web_SignUp_Profile = () => {
  const screenWidth = useWindowWidth();
  const location = useLocation();
  const { email, password } = location.state; // signUp 페이지에서 email과 password 전달받음
  const [nickname, setNickname] = useState(""); // 닉네임 상태 관리
  const [nicknameError, setNicknameError] = useState("");

  const onClickCompleteBtn = async () => {
    try {
      const bodyData = {
        username: email, // 이메일
        password: password, // 비밀번호
        nickname: nickname, // 닉네임
        image_url: "test", // 프로필 사진
        platformName: "email", // 로그인 방법
        noti_yn: "N", // 알림 여부 (N으로 고정)
      };

      // body 내용을 console로 출력
      console.log("전송할 데이터:", JSON.stringify(bodyData));

      const response = await fetch(`/api/auth/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(bodyData),
        credentials: "include",
        mode: "cors",
      });

      const responseData = await response.json();
      console.log("서버 응답 데이터: ", responseData);

      // 서버 statusCode가 OK면 /login으로 리다이렉트
      if (responseData.statusCode === "OK") {
        console.log("회원가입 성공");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      alert("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="sign-up-profile">
      <div className="div">
        {screenWidth < 1512 && ( // 화면 너비가 기준 미만일 경우
          <>
            <div className="frame">
              <div className="frame-2">
                <div className="title-wrapper">
                  <div className="title">프로필 설정</div>
                </div>

                <div className="frame-3">
                  <div className="profile">
                    <div className="overlap-group">
                      <div className="user-wrapper">
                        <User style="solid" />
                      </div>

                      <div className="camera">
                        <img
                          className="icon"
                          alt="Icon"
                          src="https://c.animaapp.com/AoZMr3Yn/img/icon-1@2x.png"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="frame-wrapper">
                    <div className="view-wrapper">
                      <div className="view">
                        <div className="text-wrapper-2">닉네임</div>

                        <input
                          className="text-input"
                          placeholder="닉네임을 입력해주세요"
                          value={nickname}
                          onChange={(e) => {
                            const value = e.target.value;
                            setNickname(value);
                            setNicknameError(validateNickname(value)); // 에러 메시지
                          }}
                        />

                        <img
                          className="line"
                          alt="Line"
                          src="https://c.animaapp.com/AoZMr3Yn/img/line-3-1@2x.png"
                        />
                        {nicknameError && (
                          <div className="error-message">{nicknameError}</div> // 에러 메시지 표시
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <CompleteButton
                className="component-87"
                text="완료"
                disabled={!nickname.trim()} // 닉네임이 비어 있으면 disabled
                onClick={onClickCompleteBtn}
              />
            </div>
          </>
        )}

        {screenWidth >= 1512 && ( // 화면 너비가 기준 이상일 경우
          <div className="frame-4">
            <div className="title-2">
              <div className="title-3">NEWSTART</div>

              <div className="text-wrapper-3">프로필 설정</div>
            </div>

            <div className="profile-set">
              <div className="profile">
                <div className="overlap-group">
                  <div className="user-wrapper">
                    <User style="solid" />
                  </div>

                  <div className="camera">
                    <img
                      className="icon"
                      alt="Icon"
                      src="https://c.animaapp.com/AoZMr3Yn/img/icon-1@2x.png"
                    />
                  </div>
                </div>
              </div>

              <div className="frame-wrapper">
                <div className="view-wrapper">
                  <div className="view-2">
                    <div className="text-wrapper-2">닉네임</div>

                    <input
                      className="input"
                      placeholder="닉네임을 입력해주세요"
                      value={nickname}
                      onChange={(e) => {
                        const value = e.target.value;
                        setNickname(value);
                        setNicknameError(validateNickname(value)); // 에러 메시지
                      }}
                    />

                    <img
                      className="line"
                      alt="Line"
                      src="https://c.animaapp.com/AoZMr3Yn/img/line-3-1@2x.png"
                    />

                    {nicknameError && (
                      <div className="error-message">{nicknameError}</div> // 에러 메시지 표시
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="next-button">
              <CompleteButton
                text="완료"
                disabled={!nickname.trim()} // 닉네임이 비어 있으면 disabled
                onClick={onClickCompleteBtn}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Web_SignUp_Profile;
