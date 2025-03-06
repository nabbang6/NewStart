import React from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate
import { useWindowWidth } from "../../breakpoints";
import SignUpButton from "../../components/Web_SignIn/SignUpButton";
import Google from "../../components/Web_SignIn/Google";
import Naver from "../../components/Web_SignIn/Naver";
import "./style.css";

export const Web_SignIn = () => {
  const navigate = useNavigate(); // navigate 함수 정의
  const screenWidth = useWindowWidth();
  return (
    <div className="web-signin">
      <div className="frame-wrapper">
       {screenWidth >= 1512 && ( // PC용 화면
        <div className="frame-2">
          <div className="frame-3">
            <div className="title">NEWSTART</div>

            <p className="p">
              매일 새로운 소식과 함께하는 아티클을 만나보세요.
            </p>
          </div>

          <div className="frame-4">
            <Google />
            <Naver />
            <div className="div-wrapper" //navigate
            onClick={() => navigate("/auth/email/login")} // 클릭 시 이메일 로그인 페이지로 이동
            style={{ cursor: "pointer" }} // 클릭 가능하도록 커서 변경
            >
              <div className="text-wrapper-3">이메일 로그인</div>
            </div>

            <div className="group-wrapper">
                <SignUpButton />
            </div>
          </div>
        </div>
        )}

       {screenWidth < 1512 && ( // 모바일용 화면
        <div className='frame-for-mobile-all-center'>
        
          <div className="frame-3-for-mobile">
            <div className="title">NEWSTART</div>

            <p className="p-for-mobile">
              매일 새로운 소식과 함께하는 아티클을 만나보세요.</p>
          </div>
        
          <div className="frame-4-for-mobile">
            <Google 
              className="button-for-mobile"
              classNameforpadding="classNameforpadding"
              classNameformobiletext="button-text-for-mobile"
            />
            <Naver 
              className="button-for-mobile"
              classNameformobiletext="button-text-for-mobile"
            />
            <div className="div-wrapper button-for-mobile" //navigate
            onClick={() => navigate("/auth/email/login")} // 클릭 시 이메일 로그인 페이지로 이동
            style={{ cursor: "pointer" }} // 클릭 가능하도록 커서 변경
            >
              <div className="text-wrapper-3-for-mobile">이메일 로그인</div>
            </div>

            <div className="group-wrapper">
              <div className="group">
                <SignUpButton className="signupbutton-for-mobile" />
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Web_SignIn;