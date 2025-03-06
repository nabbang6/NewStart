import React, { useEffect, useState } from "react";
import Headline from "../Headline";

export const PoliticsM = ({ headlines }) => {
  return (
    <div>
      {headlines.map((headline, index) => (
        <Headline
          headline_id={headline.headline_id} // 고유 ID 사용
          stateProp="default"
          text={(index + 1).toString().padStart(2, "0")} // 번호 포맷
          title={headline.title} // API에서 가져온 제목
          category={headline.category} // API에서 가져온 카테고리
          press={headline.press} // API에서 가져온 언론사
        />
      ))}
    </div>
  );
};

export default PoliticsM;
