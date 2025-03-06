import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { useParams, useLocation } from "react-router-dom";
import MenuForPC from "../../components/MenuForPC/MenuForPC";
import MenuForMobile from "../../components/MenuForMobile/MenuForMobile";
import FrameForMobile from "../../components/Web_Headline/FrameForMobile";
import Frame from "../../components/Web_Headline/Frame";
import "./style.css";
import REACT_APP_API__URL from "../../config";

export const Web_Headline = () => {
  const { headline_id } = useParams(); // URL에서 headline id 추출
  const [headline, setHeadline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const screenWidth = useWindowWidth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  // const handleBookmarkChange = (status) => { // 단순히 동작 확인만을 위해 존재하던 녀석임...
  //   // status가 "bookmark"면 북마크 설정, "unbookmark"면 해제, 로컬용
  //   setIsBookmarked(status === "bookmark");
  // };
  const [bookmarkId, setBookmarkId] = useState(null); // 북마크 ID 저장
  const [userId, setUserId] = useState(null);

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

  console.log("Headline ID from useparams:", headline_id);
  console.log("user ID from server:", userId);

  // 북마크 상태 가져오는 함수 (수시로 써야 함)
  const fetchBookmarkStatus = async () => {
    if (!userId) return; // userId가 없으면 함수 실행 중단

    try {
      const response = await fetch(`/api/bookmark/${userId}`, {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include",
        mode: "cors",
      }); // 유저 ID로 북마크 상태 조회

      if (!response.ok) throw new Error("Failed to fetch bookmark status");
      const data = await response.json();

      const bookmark = data.bookmark.find(
        (b) => b.headline.headline_id === parseInt(headline_id) //북마크 배열을 순회하면서 헤드라인 아이디 일치 찾음
      );

      if (bookmark) {
        setIsBookmarked(true);
        setBookmarkId(bookmark.bookmark_id);
      } else {
        setIsBookmarked(false);
        setBookmarkId(null);
      }
    } catch (err) {
      console.error("Error fetching bookmark status:", err);
      setError(err.message);
    }
  };

  // 헤드라인 데이터 및 북마크 상태 가져오기
  useEffect(() => {
    const fetchHeadlineAndBookmark = async () => {
      if (!userId) return; // userId가 없으면 함수 실행 중단
      try {
        //헤드라인 데이터 가져오기
        const headlineResponse = await fetch(
          `/api/headline/${headline_id}/${userId}`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
            credentials: "include",
            mode: "cors",
          }
        );
        if (!headlineResponse.ok)
          throw new Error("Failed to fetch headline data");
        const data = await headlineResponse.json();
        setHeadline(data.headline); // 단일 headline 객체 설정

        // 3. 북마크 상태 조회
        await fetchBookmarkStatus();
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeadlineAndBookmark();
  }, [headline_id, userId]); // userId가 업데이트될 때마다 다시 호출

  // 북마크 등록/삭제 처리
  const handleBookmarkToggle = async () => {
    try {
      if (isBookmarked) {
        if (!bookmarkId) return; // userId가 없으면 함수 실행 중단
        // 북마크 삭제
        const response = await fetch(`/api/bookmark/delete/${bookmarkId}`, {
          method: "POST",
          headers: { Accept: "application/json" },
          credentials: "include",
          mode: "cors",
        });
        const responseData = await response.json();
        if (responseData.statusCode === "ok") {
          console.log("Bookmark deleted");
          setIsBookmarked(false);
          setBookmarkId(null);
        }
      } else {
        // 북마크 등록
        const response = await fetch(`/api/bookmark/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            headline_id: parseInt(headline_id),
          }),
          credentials: "include",
          mode: "cors",
        });
        const responseData = await response.json();
        if (responseData.statusCode === "ok") {
          console.log("Bookmark created");
          setIsBookmarked(true);
          await fetchBookmarkStatus();
        } else {
          throw new Error("Failed to create bookmark");
        }
      }
    } catch (err) {
      console.error("Bookmark toggle error:", err);
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!headline) {
    return <div>No headline found.</div>;
  }

  // // 로컬에서 메인 데이터 가져오기
  // useEffect(() => {
  //   const fetchHeadlines = async () => {
  //     try {
  //       const response = await fetch("/headlines.json");
  //       if (!response.ok) throw new Error("Failed to load data");
  //       const data = await response.json();
  //       console.log("Fetched data:", data);

  //       // JSON 데이터 구조 확인 및 상태 저장
  //       if (data.headline && Array.isArray(data.headline)) {
  //         setHeadline(data.headline); // headline 배열 설정
  //         setUserId(data.userentity.id); // userentity 저장
  //       } else {
  //         throw new Error("Invalid data structure");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching headlines:", err);
  //       setError(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchHeadlines();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <div className="headline">
      <div className="div-3">
        {screenWidth < 1512 && ( //모바일용 화면
          <>
            <div className="frame-for-all-mobile-headline">
              <FrameForMobile
                press={headline.press}
                title={headline.title}
                date={headline.date}
                content={headline.content}
                link={headline.link}
                // 상위에서 관리하는 북마크 상태와 콜백 전달
                isBookmarked={isBookmarked}
                onBookmarkChange={handleBookmarkToggle}
              />
              {/* 모바일용 네비게이터 */}
              <MenuForMobile srcformainicon="https://c.animaapp.com/zuoomGM9/img/icon-9@2x.png" />
            </div>
          </>
        )}

        {screenWidth >= 1512 && ( //PC용 화면
          <>
            <Frame
              press={headline.press}
              title={headline.title}
              date={headline.date}
              content={headline.content}
              link={headline.link}
              // 북마크 상태와 콜백 전달
              isBookmarked={isBookmarked}
              onBookmarkChange={handleBookmarkToggle}
            />
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

export default Web_Headline;
