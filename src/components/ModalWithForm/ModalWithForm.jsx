import { useState, useEffect } from "react";
import closeIcon from "../../images/close-icon.svg";

function ModalWithForm({ title, onClose }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleEscClose = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (!title) return;

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [title]);

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
          <input
            id="email-input"
            className="modal-with-form__input"
            type="email"
            name="email"
            placeholder="E-mail"
            required
          />
          <span className="modal-with-form__input-error"></span>
          <input
            id="password-input"
            className="modal-with-form__input"
            type="password"
            name="password"
            placeholder="Senha"
            autoComplete="current-password"
            required
          />
          <span className="modal-with-form__input-error"></span>

          <button className="modal-with-form__button">
            {title === "Login" ? "Entrar" : "Criar conta"}
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
