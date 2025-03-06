/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useReducer } from "react";
import "./style.css";

export const MenuForMobile = ({
    srcformainicon = "https://c.animaapp.com/WStZlVhZ/img/icon-12@2x.png",
    srcforbookmarkicon ="https://c.animaapp.com/nzh65NNa/img/bookmark-3@2x.png",
    srcforsearchicon="https://c.animaapp.com/WStZlVhZ/img/icon-13@2x.png",
    srcforprofileicon="https://c.animaapp.com/nzh65NNa/img/icon-18@2x.png",
    activeTab = "main",
    
}) => {
  
  const [userId, setUserId] = useState(null);

  useEffect(() => {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        console.log("Loaded userId from localStorage:", storedUserId);
        setUserId(storedUserId);
      } else {
        console.error("userId가 localStorage에 없습니다.");
      }
    }, []);
  return (
    <div className="navigation-bottom-for-all-mobile">
            <div className="tab-bar-buttons-for-all-mobile">
              <Link className="tab-for-all-mobile" to="/">
                <img
                  className="mobile-navigator-icon-for-all-mobile"
                  src={srcformainicon}
                />

                <div className=
                {`navigator-label-for-all-mobile ${activeTab === "main" ? "clicked-for-all-mobile" : ""
                }`}>Home</div>
              </Link>

              <Link className="tab-for-all-mobile" to={`/bookmark/${userId}`}>
                <img
                  className="mobile-navigator-icon-for-all-mobile"
                  src={srcforbookmarkicon}
                />
                <div className=
                {`navigator-label-for-all-mobile ${activeTab === "bookmark" ? "clicked-for-all-mobile" : ""
                }`}>Bookmark</div>
              </Link>

              <Link className="tab-for-all-mobile" to={`/search/${userId}`}>
                <img
                  className="mobile-navigator-icon-for-all-mobile"
                  src={srcforsearchicon}
                />

                <div className=
                {`navigator-label-for-all-mobile ${activeTab === "search" ? "clicked-for-all-mobile" : ""
                }`}>Search</div>
              </Link>

              <Link className="tab-for-all-mobile" to={`/profile/${userId}`}>
                <img
                  className="mobile-navigator-icon-for-all-mobile"
                  src={srcforprofileicon}
                />

                <div className=
                {`navigator-label-for-all-mobile ${activeTab === "profile" ? "clicked-for-all-mobile" : ""
                }`}>Profile</div>
              </Link>
            </div>
          </div>
  );
};

MenuForMobile.propTypes = {
    srcformainicon: PropTypes.string,
    srcforbookmarkicon: PropTypes.string,
    srcforsearchicon: PropTypes.string,
    srcforprofileicon: PropTypes.string,
  };

export default MenuForMobile;