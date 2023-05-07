import React from "react";
import Logo from "./robinhood.svg";
import SearchIcon from "@material-ui/icons/Search";
import "./Header.css";

function Header() {
  return (
    <div className="header__wrapper">
      <div className="header__logo">
        <img src={Logo} width={25} alt="Robhinhood Logo" />
      </div>
      <div className="header__search">
        <div className="header__searchContainer">
          <SearchIcon></SearchIcon>
          <input placeholder="Search" type="text"  />
        </div>
      </div>
      <div className="header__menuItems">
        <a href="/">Free Stocks</a>
        <a href="/">Portfolio</a>
        <a href="/">Cash</a>
        <a href="/">Messages</a>
        <a href="/">Account</a>
      </div>
      <div className="avatar">
      <img onClick={() => window.open("https://portfolio-b9fec.web.app/")}
        className="nav__avatar"
        src="https://portfolio-b9fec.web.app/assets/pj-d3f6f7d9.png"
        alt="Prabhansh Jain Avatar"
      />
      </div>
    </div>
  );
}

export default Header;
