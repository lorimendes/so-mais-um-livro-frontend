import devPhoto from "../../images/about-photo.png";

function About() {
  return (
    <section className="about">
      <div className="about__header">
        <h2 className="about__title">sobre a autora</h2>
        <img
          src={devPhoto}
          alt="foto da desenvolvedora"
          className="about__photo"
        />
      </div>

      <p className="about__description">
        Sou <span className="about__highlighted-name">Lorena Mendes</span>,
        desenvolvedora full-stack.
      </p>

      <p className="about__description">
        Encaro cada projeto como um livro em branco. Em vez de parágrafos,{" "}
        <span className="about__highlighted-text">
          escrevo linhas de código
        </span>
        , usando componentes, lógica e arquitetura limpa para construir
        ferramentas que realmente facilitem a jornada de quem está do outro lado
        da tela.
      </p>

      <div className="about__content">
        <div className="about__content-block">
          <h3 className="about__list-title">gêneros de atuação</h3>
          <ul className="about__list">
            <li className="about__list-item">frontend</li>
            <li className="about__list-item">backend</li>
          </ul>
        </div>

        <div className="about__content-block">
          <h3 className="about__list-title">obras publicadas</h3>
          <ul className="about__list">
            <li className="about__list-item">
              <a
                href="https://github.com/lorimendes/web_project_api_full"
                className="about__link"
              >
                Arount The US
              </a>
            </li>
            <li className="about__list-item">
              <a
                href="https://github.com/lorimendes/so-mais-um-livro-frontend"
                className="about__link"
              >
                só mais um livro
              </a>
            </li>
            <li className="about__list-item">
              <a
                href="https://github.com/lorimendes/controle_de_chamados"
                className="about__link"
              >
                Controle de chamados
              </a>
            </li>
          </ul>
        </div>

        <div className="about__content-block">
          <h3 className="about__list-title">ferramentas de escrita</h3>
          <ul className="about__list">
            <li className="about__list-item">JS</li>
            <li className="about__list-item">React</li>
            <li className="about__list-item">Node.js</li>
            <li className="about__list-item">Express.js</li>
            <li className="about__list-item">PHP</li>
            <li className="about__list-item">MongoDB</li>
            <li className="about__list-item">MySQL</li>
          </ul>
        </div>

        <div className="about__content-block">
          <h3 className="about__list-title">estilo narrativo</h3>
          <ul className="about__list">
            <li className="about__list-item">código limpo</li>
            <li className="about__list-item">MVC</li>
            <li className="about__list-item">API REST</li>
            <li className="about__list-item">metodologia BEM</li>
            <li className="about__list-item">responsividade</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;
