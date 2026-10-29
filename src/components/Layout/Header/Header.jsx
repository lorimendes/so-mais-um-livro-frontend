import logo from "../../../images/logo.png";
import Navigation from "./Navigation/Navigation";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header({ onOpenPopup }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const handleMenuButton = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img
            src={logo}
            alt="Logo só mais um livro"
            className="header__logo"
          />
        </Link>
        <Navigation
          onMenuButtonClick={handleMenuButton}
          isMobileMenuOpened={isMobileMenuOpened}
          onOpenPopup={onOpenPopup}
        />
      </div>
      <div className="header__line"></div>
      <Navigation
        isMobileNavigation={true}
        isMobileMenuOpened={isMobileMenuOpened}
      />
      <div
        className={`${isMobileMenuOpened ? "header__line header__line_ismobile" : ""}`}
      ></div>
    </header>
  );
}

export default Header;
