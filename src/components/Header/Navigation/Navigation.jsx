import { Link } from "react-router-dom";
import menuButton from "../../../images/burger-menu.svg";
import closeButton from "../../../images/close-button.svg";

function Navigation({
  onMenuButtonClick,
  isMobileNavigation,
  isMobileMenuOpened,
}) {
  return (
    <nav className="nav">
      <ul
        className={`${isMobileNavigation ? "nav__container_ismobile" : "nav__container"} ${isMobileNavigation && isMobileMenuOpened ? "nav__container_mobile-menu_opened" : ""}`}
      >
        <li className="nav__item">
          <Link className="nav__link" to="/">
            Início
          </Link>
        </li>
        <li className="nav__item">
          <Link className="nav__link" to="/minha-lista">
            Minha lista
          </Link>
        </li>
        <li className="nav__item">
          <button className="nav__button">Sair</button>
        </li>
      </ul>
      <button
        className={`${isMobileNavigation ? "nav__menu-button_ismobile" : "nav__button nav__menu-button"}`}
        onClick={onMenuButtonClick}
      >
        <img
          src={isMobileMenuOpened ? closeButton : menuButton}
          alt="Botão de menu"
        />
      </button>
    </nav>
  );
}

export default Navigation;
