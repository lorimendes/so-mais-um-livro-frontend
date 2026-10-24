import infoIcon from "../../images/info-circle.svg";

function NoResults() {
  return (
    <div className="no-results">
      <img src={infoIcon} alt="Informação" className="no-results__icon" />
      <p className="no-results__text">
        Fizemos uma busca em todo o acervo, mas não achamos resultados.
      </p>
      <p>Verifique a ortografia e tente novamente.</p>
    </div>
  );
}

export default NoResults;
