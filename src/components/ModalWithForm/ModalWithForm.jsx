import { useEffect, useContext } from "react";
import closeIcon from "../../images/close-icon.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormValidation from "../../hooks/useFormValidation";

function ModalWithForm({ title, onClose }) {
  const { handleLogin, handleRegister, isLoadingAuth, errorAuth } =
    useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, cleanForm } =
    useFormValidation();

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, password } = values;
    if (title === "Login") {
      handleLogin(email, password);
    } else {
      handleRegister(name, email, password);
    }
  };

  const handleEscClose = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    cleanForm();
    if (!title) return;

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [title, cleanForm]);

  const handleOutClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <section
      className={`modal-with-form ${title ? "modal-with-form_opened" : ""}`}
      onClick={handleOutClick}
    >
      <div className="modal-with-form__container">
        <h2 className="modal-with-form__title">{title}</h2>
        <form className="modal-with-form__form" onSubmit={handleSubmit}>
          {title !== "Login" && (
            <>
              <input
                id="name-input"
                className="modal-with-form__input"
                type="text"
                name="name"
                placeholder="Nome"
                minLength={2}
                required
                value={values.name || ""}
                onChange={handleChange}
              />
              <span className="modal-with-form__input-error">
                {errors.name}
              </span>
            </>
          )}
          <input
            id="email-input"
            className="modal-with-form__input"
            type="email"
            name="email"
            placeholder="E-mail"
            value={values.email || ""}
            autoComplete="username"
            onChange={handleChange}
            required
          />
          <span className="modal-with-form__input-error">{errors.email}</span>
          <input
            id="password-input"
            className="modal-with-form__input"
            type="password"
            name="password"
            placeholder="Senha"
            minLength={8}
            value={values.password || ""}
            autoComplete="current-password"
            onChange={handleChange}
            required
          />
          <span className="modal-with-form__input-error">
            {errors.password}
          </span>

          {errorAuth && (
            <div className="modal-with-form__error-container">
              <p>{errorAuth}</p>
            </div>
          )}

          <button
            className="modal-with-form__button"
            disabled={!isValid || isLoadingAuth}
          >
            {isLoadingAuth
              ? "Aguarde..."
              : title === "Login"
                ? "Entrar"
                : "Criar conta"}
          </button>
        </form>
        <button
          className="modal-with-form__close-button"
          type="button"
          onClick={onClose}
        >
          <img
            src={closeIcon}
            alt="Botão de fechar modal"
            className="modal-with-form__close-icon"
          />
        </button>
      </div>
    </section>
  );
}

export default ModalWithForm;
