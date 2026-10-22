import githubLogo from "../../images/github-svgrepo-com.svg";
import linkedinLogo from "../../images/linkedin-svgrepo-com.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">@ 2026 só mais um livro</p>
      <div className="footer__links">
        <Link className="nav__link" to="/">
          Início
        </Link>
        <a
          href="https://www.linkedin.com/in/lorenamendes0/"
          className="footer__link"
          target="_blank"
        >
          <img
            src={linkedinLogo}
            alt="Logo do LinkedIn"
            className="footer__image"
          />
        </a>
        <a
          href="https://github.com/lorimendes"
          className="footer__link"
          target="_blank"
        >
          <img
            src={githubLogo}
            alt="Logo do Github"
            className="footer__image"
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
