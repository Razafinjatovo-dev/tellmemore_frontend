import React from "react";
import TellMeMoreLogo from "../assets/logoTellMeMore.svg";

const Header = () => {
  return (
    <div className="HeaderContainer">
      <div className="Header">
        <img alt="Logo" src={TellMeMoreLogo} />
      </div>
    </div>
  );
};

export default Header;
