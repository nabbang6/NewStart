import React from "react";
import BookmarkTab from "./BookmarkTab";
import HomeTab from "./HomeTab";
import ProfileTab from "./ProfileTab";
import SearchTab from "./SearchTab";
import "./style.css";

export const MenuForPC = ({
  HomeTabActivated,
  BookmarkTabActivated,
  SearchTabActivated,
  ProfileTabActivated,
  IsActivated,
  className,
}) => {
  return (
    <div className={`for-pc-menu-frame ${className}`}>
      <div className="for-pc-menu-frame-overlap-group">
        <div className="for-pc-menu-frame-div">
          <HomeTab
            stateProp="default"
            activated={IsActivated}
            srcforactivate={HomeTabActivated}
          />
          <BookmarkTab
            stateProp="default"
            activated={IsActivated}
            srcforactivate={BookmarkTabActivated}
          />
          <SearchTab
            stateProp="default"
            activated={IsActivated}
            srcforactivate={SearchTabActivated}
          />
          <ProfileTab
            stateProp="default"
            activated={IsActivated}
            srcforactivate={ProfileTabActivated}
          />
        </div>

        <div className="for-pc-menu-frame-title">NEWSTART</div>
      </div>
    </div>
  );
};

export default MenuForPC;
