import React, { useState, useEffect } from "react";
import { useWindowWidth } from "../../breakpoints";
import Terms from "../../components/Web_SignUp/Terms";
import NextButton from "../../components/Web_SignUp/NextButton";
import {
  handleAllToggle,
  handleSingleToggle,
} from "../../components/Web_SignUp/agreementHandlers";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../components/Web_SignUp/validation";
import "./style.css";

export const Web_SignUp = () => {
  const [agreement, setAgreement] = useState({
    // 약관 동의 상태 정의
    all: false,
    age: false,
    service: false,
    privacy: false,
  });

  const [email, setEmail] = useState(""); // 이메일 & 비밀번호 상태 정의
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // ★ useEffect 추가 ★
  useEffect(() => {
    setEmailError(validateEmail(email));
  }, [email]);

  useEffect(() => {
    setPasswordError(validatePassword(password));
  }, [password]);

  useEffect(() => {
    setConfirmPasswordError(validateConfirmPassword(confirmPassword, password));
  }, [confirmPassword, password]);

  const screenWidth = useWindowWidth();

  return (
    <div className="web-signup-top">
      <div className="web-signup">
        {screenWidth < 1512 && ( // 모바일용 화면
          <>
            <div className="for-mobile-div">
              <div className="for-mobile-frame-2">
                <div className="for-mobile-title">회원가입</div>
              </div>

              <div className="for-mobile-frame-wrapper">
                <div className="frame-3">
                  <div className="div-2">
                    <div className="text-wrapper-3">이메일</div>

                    <input
                      className="text-input"
                      type="email"
                      placeholder="이메일을 입력해주세요"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => validateEmail(email)}
                    />

                    <img
                      className="line"
                      alt="Line"
                      src="https://c.animaapp.com/m1TRmDWZ/img/line-3-8@2x.png"
                    />
                    {emailError && (
                      <div className="error-message">{emailError}</div>
                    )}
                  </div>

                  <div className="div-2">
                    <div className="text-wrapper-3">비밀번호</div>

                    <input
                      className="input"
                      type="password"
                      placeholder="8자 이상을 입력해주세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => validatePassword(password)}
                    />

                    <img
                      className="line"
                      alt="Line"
                      src="https://c.animaapp.com/m1TRmDWZ/img/line-3-8@2x.png"
                    />
                    {passwordError && (
                      <div className="error-message">{passwordError}</div>
                    )}
                  </div>

                  <div className="div-2">
                    <div className="text-wrapper-3">비밀번호 확인</div>

                    <input
                      className="input"
                      type="password"
                      placeholder="비밀번호를 한 번 더 입력해주세요"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={() => validateConfirmPassword(confirmPassword)}
                    />

                    <img
                      className="line"
                      alt="Line"
                      src="https://c.animaapp.com/m1TRmDWZ/img/line-3-8@2x.png"
                    />
                    {confirmPasswordError && (
                      <div className="error-message">
                        {confirmPasswordError}
                      </div>
                    )}
                  </div>
                </div>

                <div className="frame-4">
                  <div className="view">
                    <div className="text-wrapper-4">약관 동의</div>
                  </div>

                  <div className="frame-4">
                    <div className="frame-5">
                      <Terms
                        isActive={agreement.all}
                        type="all"
                        className="on-instance"
                        onClick={() => handleAllToggle(agreement, setAgreement)}
                      />
                      <div className="div-wrapper">
                        <div className="text-wrapper-5">전체 동의</div>
                      </div>
                    </div>

                    <div className="frame-5">
                      <Terms
                        isActive={agreement.age}
                        type="single"
                        className="on-instance"
                        onClick={() =>
                          handleSingleToggle(agreement, setAgreement, "age")
                        }
                      />
                      <div className="element">
                        <p className="text-wrapper-5">
                          만 14세 이상 가입 동의 (필수)
                        </p>
                      </div>
                    </div>

                    <div className="frame-6">
                      <Terms
                        isActive={agreement.service}
                        type="single"
                        className="on-instance"
                        onClick={() =>
                          handleSingleToggle(agreement, setAgreement, "service")
                        }
                      />
                      <div className="view-2">
                        <div className="text-wrapper-5">
                          서비스 이용 동의 (필수)
                        </div>

                        <div className="text-wrapper-6">약관보기</div>
                      </div>
                    </div>

                    <div className="frame-6">
                      <Terms
                        isActive={agreement.privacy}
                        type="single"
                        className="on-instance"
                        onClick={() =>
                          handleSingleToggle(agreement, setAgreement, "privacy")
                        }
                      />
                      <div className="view-2">
                        <div className="text-wrapper-5">
                          개인정보처리방침 동의 (필수)
                        </div>

                        <div className="text-wrapper-6">약관보기</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <NextButton
              className="for-mobile-component-141"
              agreement={agreement} // 약관 상태 전달
              emailValid={!emailError}
              passwordValid={!passwordError}
              confirmPasswordValid={!confirmPasswordError}
              navigateTo="/auth/profile" // 성공 시 이동할 경로
              email={email}
              password={password}
            />
          </>
        )}

        {screenWidth >= 1512 && ( // PC용 화면
          <div className="div">
            <div className="frame-2">
              <div className="title">NEWSTART</div>

              <div className="text-wrapper-2">회원가입</div>
            </div>

            <div className="frame-3">
              <div className="div-2">
                <div className="text-wrapper-3">이메일</div>

                <input
                  className="text-input"
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => validateEmail(email)}
                />

                <img
                  className="line"
                  alt="Line"
                  src="https://c.animaapp.com/m1TRmDWZ/img/line-3-8@2x.png"
                />
                {emailError && (
                  <div className="error-message">{emailError}</div>
                )}
              </div>

              <div className="div-2">
                <div className="text-wrapper-3">비밀번호</div>

                <input
                  className="input"
                  type="password"
                  placeholder="8자 이상을 입력해주세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => validatePassword(password)}
                />

                <img
                  className="line"
                  alt="Line"
                  src="https://c.animaapp.com/m1TRmDWZ/img/line-3-8@2x.png"
                />
                {passwordError && (
                  <div className="error-message">{passwordError}</div>
                )}
              </div>

              <div className="div-2">
                <div className="text-wrapper-3">비밀번호 확인</div>

                <input
                  className="input"
                  type="password"
                  placeholder="비밀번호를 한 번 더 입력해주세요"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => validateConfirmPassword(confirmPassword)}
                />

                <img
                  className="line"
                  alt="Line"
                  src="https://c.animaapp.com/m1TRmDWZ/img/line-3-8@2x.png"
                />
                {confirmPasswordError && (
                  <div className="error-message">{confirmPasswordError}</div>
                )}
              </div>
            </div>

            <div className="frame-4">
              <div className="view">
                <div className="text-wrapper-4">약관 동의</div>
              </div>

              <div className="frame-4">
                <div className="frame-5">
                  <Terms
                    isActive={agreement.all}
                    type="all"
                    className="on-instance"
                    onClick={() => handleAllToggle(agreement, setAgreement)}
                  />
                  <div className="div-wrapper">
                    <div className="text-wrapper-5">전체 동의</div>
                  </div>
                </div>

                <div className="frame-5">
                  <Terms
                    isActive={agreement.age}
                    type="single"
                    className="on-instance"
                    onClick={() =>
                      handleSingleToggle(agreement, setAgreement, "age")
                    }
                  />
                  <div className="element">
                    <p className="text-wrapper-5">
                      만 14세 이상 가입 동의 (필수)
                    </p>
                  </div>
                </div>

                <div className="frame-6">
                  <Terms
                    isActive={agreement.service}
                    type="single"
                    className="on-instance"
                    onClick={() =>
                      handleSingleToggle(agreement, setAgreement, "service")
                    }
                  />
                  <div className="view-2">
                    <div className="text-wrapper-5">
                      서비스 이용 동의 (필수)
                    </div>

                    <div className="text-wrapper-6">약관보기</div>
                  </div>
                </div>

                <div className="frame-6">
                  <Terms
                    isActive={agreement.privacy}
                    type="single"
                    className="on-instance"
                    onClick={() =>
                      handleSingleToggle(agreement, setAgreement, "privacy")
                    }
                  />
                  <div className="view-2">
                    <div className="text-wrapper-5">
                      개인정보처리방침 동의 (필수)
                    </div>

                    <div className="text-wrapper-6">약관보기</div>
                  </div>
                </div>
              </div>
            </div>

            <NextButton
              className="component-141"
              agreement={agreement} // 약관 상태 전달
              emailValid={!emailError}
              passwordValid={!passwordError}
              confirmPasswordValid={!confirmPasswordError}
              navigateTo="/auth/profile" // 성공 시 이동할 경로
              email={email}
              password={password}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Web_SignUp;
