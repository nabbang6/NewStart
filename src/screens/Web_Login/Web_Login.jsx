import React, { useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import LoginButton from "../../components/Web_Login/LoginButton";
import {
  validateEmail,
  validatePassword,
} from "../../components/Web_Login/validation";
import "./style.css";
import REACT_APP_API__URL from "../../config";

export const Web_Login = () => {
  const screenWidth = useWindowWidth();
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [emailError, setEmailError] = useState(""); // 이메일 오류 메시지
  const [passwordError, setPasswordError] = useState(""); // 비밀번호 오류 메시지

  // 이메일과 비밀번호가 모두 입력된 경우 disabled-true
  const isButtonDisabled = !validateEmail(email) || !validatePassword(password);

  const emailValidation = (value) => {
    setEmail(value);
    setEmailError(validateEmail(value)); // 이메일 검증
  };

  const passwordValidation = (value) => {
    setPassword(value);
    setPasswordError(validatePassword(value)); // 비밀번호 검증
  };

  // 로그인 요청
  const onClickLoginBtn = async () => {
    try {
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);

      // FormData console에 출력
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await fetch(`/api/auth/email/loginProcess`, {
        method: "POST",
        body: formData,
        credentials: "include",
        mode: "cors",
      });

      const responseData = await response.json();
      console.log("서버 응답 데이터: ", responseData);

      if (responseData.statusCode === "OK") {
        console.log("로그인 성공");

        if (responseData.userId) {
          const userId = String(responseData.userId);
          localStorage.setItem("userId", userId);
          console.log(`userId ${userId} 저장`);
        }

        window.location.href = "/"; // 페이지 이동
      } else {
        console.error("로그인 실패: ", responseData);
      }
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  return (
    <div className="login">
      <div className="div">
        {screenWidth < 1512 && ( // 모바일용 화면
          <>
            <div className="frame">
              <div className="frame-for-top-5vh">
                <div className="title-wrapper">
                  <div className="title">이메일 로그인</div>
                </div>

                <div className="frame-wrapper">
                  <div className="div-2">
                    <div className="view">
                      <div className="text-wrapper-2">이메일</div>

                      <input
                        className="text-input"
                        placeholder="이메일을 입력해주세요."
                        value={email}
                        onChange={(e) => emailValidation(e.target.value)}
                      />

                      <img
                        className="line"
                        alt="Line"
                        src="https://c.animaapp.com/2w9FzD4H/img/line-3-5@2x.png"
                      />
                      {/* 이메일 오류 메시지 출력 */}
                      {emailError && (
                        <div className="error-message">{emailError}</div>
                      )}
                    </div>

                    <div className="view">
                      <div className="text-wrapper-2">비밀번호</div>

                      <input
                        className="element"
                        placeholder="비밀번호를 입력해주세요."
                        type="password"
                        value={password}
                        onChange={(e) => passwordValidation(e.target.value)}
                      />

                      <img
                        className="line"
                        alt="Line"
                        src="https://c.animaapp.com/2w9FzD4H/img/line-3-5@2x.png"
                      />
                      {/* 비밀번호 오류 메시지 출력 */}
                      {passwordError && (
                        <div className="error-message">{passwordError}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <LoginButton
                className="component-87"
                text="로그인"
                emailValid={validateEmail(email)}
                passwordValid={validatePassword(password)}
                disabled={isButtonDisabled}
                onClick={onClickLoginBtn}
              />
            </div>
          </>
        )}

        {screenWidth >= 1512 && ( // PC용 화면
          <div className="frame-2">
            <div className="title-2">
              <div className="title-3">NEWSTART</div>

              <div className="text-wrapper-3">로그인</div>
            </div>

            <div className="div-2">
              <div className="view">
                <div className="text-wrapper-2">이메일</div>

                <input
                  className="text-input"
                  placeholder="이메일을 입력해주세요."
                  value={email}
                  onChange={(e) => emailValidation(e.target.value)}
                />

                <img
                  className="line"
                  alt="Line"
                  src="https://c.animaapp.com/2w9FzD4H/img/line-3-7@2x.png"
                />
                {/* 이메일 오류 메시지 출력 */}
                {emailError && (
                  <div className="error-message">{emailError}</div>
                )}
              </div>

              <div className="view">
                <div className="text-wrapper-2">비밀번호</div>

                <input
                  className="element"
                  placeholder="비밀번호를 입력해주세요."
                  type="password"
                  value={password}
                  onChange={(e) => passwordValidation(e.target.value)}
                />

                <img
                  className="line"
                  alt="Line"
                  src="https://c.animaapp.com/2w9FzD4H/img/line-3-7@2x.png"
                />
                {/* 비밀번호 오류 메시지 출력 */}
                {passwordError && (
                  <div className="error-message">{passwordError}</div>
                )}
              </div>
            </div>

            <LoginButton
              className="component-87-instance"
              text="로그인"
              emailValid={validateEmail(email)}
              passwordValid={validatePassword(password)}
              disabled={isButtonDisabled}
              onClick={onClickLoginBtn}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Web_Login;
