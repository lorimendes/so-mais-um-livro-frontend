import { useState, useContext } from "react";
import searchIcon from "../../images/search-button.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SearchForm() {
  const { searchText, setSearchText, handleSubmitSearch } =
    useContext(CurrentUserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSubmitSearch(searchText);
  };

  return (
    <section className="search-form">
      <h1 className="search-form__title">
        Encontre
        <span className="search-form__highlight"> só mais um livro </span>
        pra sua lista
      </h1>
      <h2 className="search-form__subtitle">
        Pesquise entre milhões de obras e guarde pra ler depois
      </h2>
      <p className="search-form__text">(porque sempre cabe mais um)</p>
      <form action="" className="search-form__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search-text"
          className="search-form__input"
          placeholder="Busque por título..."
          minLength="2"
          maxLength="100"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          required
        />
        <button className="search-form__button">
          <img
            src={searchIcon}
            alt="Botão de pesquisa"
            className="search-form__icon"
          />
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
