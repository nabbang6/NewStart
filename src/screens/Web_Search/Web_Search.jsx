import React, { useState, useEffect } from "react";
import { useWindowWidth } from "../../breakpoints";
import { useNavigate, useParams } from "react-router-dom";
import MenuForPC from "../../components/MenuForPC/MenuForPC";
import MenuForMobile from "../../components/MenuForMobile/MenuForMobile";
import SearchBar from "../../components/Web_Search/SearchBar";
import FrameForSearchBar from "../../components/Web_Search/FrameForSearchBar";
import FrameForMobileSearchBar from "../../components/Web_Search/FrameForMobileSearchBar";
import "./style.css";
import REACT_APP_API__URL from "../../config";

export const Web_Search = ({ searchCount = 5 }) => {
  const screenWidth = useWindowWidth();
  const navigate = useNavigate(); // navigate 함수 정의
  const { id } = useParams(); // URL에서 id 가져오기
  const [results, setResults] = useState([]); // 검색 결과 상태
  const [searchRecords, setSearchRecords] = useState([]); // 검색 기록 상태
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /***** userId 초기화 *****/
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!id && storedUserId) {
      console.log("Loaded userId from localStorage:", storedUserId);
      setUserId(storedUserId);
      navigate(`/search/${storedUserId}`, { replace: true });
    } else {
      console.error("userId가 localStorage에 없습니다.");
      setLoading(false); // userId가 없을 때 로딩 해제
    }
  }, [id, navigate]);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchSearchRecords(); // userId가 존재할 때만 실행
    }
  }, [userId]); // userId 변경 시 실행

  // 로딩 상태 처리
  if (loading) return <div>Loading...</div>;

  // 에러 상태 처리
  if (error) return <div>Error: {error.message}</div>;

  // 검색 API 호출 함수
  const handleSearch = async (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      console.warn("검색어가 없습니다.");
      return;
    }

    try {
      const response = await fetch(`/api/search/result/${trimmedQuery}`, {
        credentials: "include",
        method: "GET",
        headers: { Accept: "application/json" },
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("API 요청 실패");
      }

      const data = await response.json();
      setResults(data.results); // 검색 결과 상태 업데이트
    } catch (error) {
      console.error("검색 실패:", error);
    }
  };

  // 검색 기록 가져오기
  const fetchSearchRecords = async () => {
    try {
      const response = await fetch(`/api/search/${userId}`, {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include",
        mode: "cors",
      });

      if (!response.ok) throw new Error("API 요청 실패");

      const data = await response.json();
      setSearchRecords(data.search); // 검색 기록 업데이트
      setError(null);
    } catch (error) {
      console.error("검색 기록 불러오기 실패:", error);
      setError(error); // 에러 상태 업데이트
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  // 동적으로 검색 결과 div 생성, 실험해 보고 싶으면 배열 자리에 Array.from({ length: searchCount }) 입력 ㄱㄱ
  const dynamicDivs2 = results.map((item, index) => (
    <div key={index} className="dynamic-div-creator-for-searchbar">
      <FrameForSearchBar
        text={item.title}
        newspaper={
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            링크 클릭
          </a>
        }
      />
    </div>
  ));

  const dynamicDivs3 = results.map((item, index) => (
    <div key={index} className="dynamic-div-creator-for-searchbar">
      <FrameForMobileSearchBar
        text={item.title}
        newspaper={
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            링크 클릭
          </a>
        }
      />
    </div>
  ));

  return (
    <div className="search-screen">
      <div className="search-2">
        {screenWidth >= 1512 && ( // PC용 화면
          <>
            <div className="for-pc-screen">
              <div className="title-frame">
                <div className="text-wrapper-8">검색</div>
              </div>

              <SearchBar
                property1="default"
                onSearch={handleSearch}
                onFetchRecords={fetchSearchRecords} // 검색 기록 API 호출 함수 전달
                searchRecords={searchRecords} // 동적 생성을 위한 검색 기록 전달
              />
              <div className="search-result-frame-web-search">
                <div className="text-wrapper-for-web-search">
                  <div className="text-wrapper-2-for-web-search">
                    <div className="text-wrapper-6-for-bookmark">아티클</div>
                    <div className="div-3" />
                  </div>
                </div>
                {dynamicDivs2}
              </div>
            </div>
            <MenuForPC
              className="menu-instance"
              IsActivated="yessearchis"
              SearchTabActivated="https://c.animaapp.com/zuoomGM9/img/icon-6@2x.png"
            />
          </>
        )}

        {screenWidth < 1512 && ( // 모바일용 화면
          <>
            <div className="for-mobile-screen">
              <div className="for-mobile-title-2">
                <div className="title-wrapper">
                  <div className="title-3">검색</div>
                </div>

                <SearchBar
                  property1="default"
                  className="search-bar-for-mobile"
                  onSearch={handleSearch}
                  onFetchRecords={fetchSearchRecords} // 검색 기록 API 호출 함수 전달
                  searchRecords={searchRecords} // 동적 생성을 위한 자식으로 검색 기록 전달
                />
                <div className="search-result-frame-web-search-for-mobile">
                  <div className="text-wrapper-for-web-search">
                    <div className="text-wrapper-2-for-web-search-for-mobile">
                      <div className="text-wrapper-6-for-bookmark-for-mobile">
                        아티클
                      </div>
                      <div className="div-3" />
                    </div>
                  </div>
                  {dynamicDivs3}
                </div>
              </div>
              <MenuForMobile
                srcforsearchicon="https://c.animaapp.com/nzh65NNa/img/icon-17@2x.png"
                activeTab="search"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Web_Search;
