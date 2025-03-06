import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import ChangeButton from "../../components/Web_Profile_Password/ChangeButton";
import Return from "../../components/Web_Profile_Setting/Return";
import MenuForPC from "../../components/MenuForPC/MenuForPC";
import CompleteButton from "../../components/Web_Profile_Setting/CompleteButton";
import {
  validatePassword,
  validateConfirmPassword,
} from "../../components/Web_Profile_Password/validation";
import "./style.css";
import REACT_APP_API__URL from "../../config";

export const Web_Profile_Password = () => {
  const screenWidth = useWindowWidth();
  const location = useLocation();
  const navigate = useNavigate();
  const { profileData } = location.state;
  const [userId, setUserId] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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

  const handleChangePassword = async () => {
    if (!userId) return; // userId가 없으면 함수 실행 중단

    const requestData = {
      username: profileData.username, // 사용자 이름
      df_password: currentPassword, // 기존 비밀번호
      af_password: newPassword, // 새로운 비밀번호
    };

    try {
      const response = await fetch(`/api/auth/password`, {
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
        navigate(`/profile/${userId}`);
      }
    } catch (error) {
      console.error("비밀번호 변경 요청 중 오류 발생:", error);
    }
  };

  return (
    <div className="profile-password">
      <div className="div-3">
        {screenWidth < 1512 && ( // 모바일 화면
          <>
            <div className="frame-for-all-mobile-wpp">
              <div className="frame-7">
                <div className="frame-50-wrapper">
                  <Return divClassName="frame-50" />
                </div>

                <div className="title-wrapper">
                  <div className="title-2">비밀번호 재설정</div>
                </div>
              </div>
              <div className="frame-wrapper">
                <div className="frame-2">
                  <div className="frame-3">
                    <div className="view-wrapper">
                      <div className="view">
                        <div className="text-wrapper-7">현재 비밀번호</div>

                        <input
                          className="text-input"
                          type="password"
                          placeholder="현재 비밀번호 입력"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />

                        <img
                          className="line"
                          alt="Line"
                          src="https://c.animaapp.com/saL1Q9gz/img/line-3-2@2x.png"
                        />
                        <div className="error-message">
                          {currentPasswordError}
                        </div>
                      </div>
                    </div>

                    <div className="frame-4">
                      <div className="frame-5">
                        <div className="view-2">
                          <div className="text-wrapper-9">새 비밀번호</div>

                          <input
                            className="text-input"
                            type="password"
                            placeholder="8자 이상 입력"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            onBlur={() =>
                              setNewPasswordError(validatePassword(newPassword))
                            }
                          />

                          <img
                            className="line"
                            alt="Line"
                            src="https://c.animaapp.com/saL1Q9gz/img/line-3-2@2x.png"
                          />
                          <div className="error-message">
                            {newPasswordError}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="frame-4">
                      <div className="frame-6">
                        <div className="view-2">
                          <div className="text-wrapper-11">
                            새 비밀번호 재입력
                          </div>

                          <input
                            className="text-input"
                            type="password"
                            placeholder="8자 이상 입력"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={() =>
                              setConfirmPasswordError(
                                validateConfirmPassword(
                                  confirmPassword,
                                  newPassword
                                )
                              )
                            }
                          />

                          <img
                            className="line"
                            alt="Line"
                            src="https://c.animaapp.com/saL1Q9gz/img/line-3-2@2x.png"
                          />
                          <div className="error-message">
                            {confirmPasswordError}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <CompleteButton
                className="component-174"
                disabled="false"
                text="완료"
                onClick={() => handleChangePassword()}
              />
            </div>
          </>
        )}

        {screenWidth >= 1512 && ( // PC 화면
          <>
            <div className="frame-8">
              <div className="title-box">
                <Return />
                <div className="title-frame">
                  <div className="title-3">비밀번호 재설정</div>
                </div>
              </div>

              <div className="frame-9">
                <div className="div-4">
                  <div className="text-wrapper-12">현재 비밀번호</div>

                  <input
                    className="text-input-for-pc"
                    type="password"
                    placeholder="현재 비밀번호 입력"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />

                  <img
                    className="line-2"
                    alt="Line"
                    src="https://c.animaapp.com/saL1Q9gz/img/line-3-5@2x.png"
                  />
                </div>

                <div className="div-4">
                  <div className="text-wrapper-12">새 비밀번호</div>

                  <input
                    className="text-input-for-pc"
                    type="password"
                    placeholder="8자 이상 입력"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onBlur={() =>
                      setNewPasswordError(validatePassword(newPassword))
                    }
                  />

                  <img
                    className="line-2"
                    alt="Line"
                    src="https://c.animaapp.com/saL1Q9gz/img/line-3-5@2x.png"
                  />

                  <div className="error-message-pc">{newPasswordError}</div>
                </div>

                <div className="div-4">
                  <div className="text-wrapper-12">새 비밀번호 재입력</div>

                  <input
                    className="text-input-for-pc"
                    type="password"
                    placeholder="8자 이상 입력"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() =>
                      setConfirmPasswordError(
                        validateConfirmPassword(confirmPassword, newPassword)
                      )
                    }
                  />

                  <img
                    className="line-2"
                    alt="Line"
                    src="https://c.animaapp.com/saL1Q9gz/img/line-3-5@2x.png"
                  />
                  <div className="error-message-pc">{confirmPasswordError}</div>
                </div>
              </div>

              <ChangeButton
                className="button"
                divClassName="component-175"
                text="완료"
                disabled="false"
                onClick={() => handleChangePassword()}
              />
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

export default Web_Profile_Password;
