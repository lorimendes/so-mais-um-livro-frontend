import infoIcon from "../../images/info-circle.svg";

function searchFeedback({ message }) {
  return (
    <div className="search-feedback">
      <img src={infoIcon} alt="Informação" className="search-feedback__icon" />
      <p>{message.title}</p>
      <p className="search-feedback__text">{message.text}</p>
    </div>
  );
}

export default searchFeedback;
