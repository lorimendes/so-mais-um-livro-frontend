function BookCard({ book }) {
  return (
    <>
      {book && (
        <div className="book-card">
          {book.volumeInfo?.imageLinks?.thumbnail && (
            <img
              src={book.volumeInfo?.imageLinks?.thumbnail}
              alt={`Capa do livro: ${book.volumeInfo?.title}`}
              className="book-card__cover"
            />
          )}
          <div className="book-card__line"></div>
          <div className="book-card__content">
            <div className="book-card__header">
              <h3 className="book-card__title">{book.volumeInfo.title}</h3>
              <ul className="book-card__info-list">
                {book.volumeInfo?.authors?.map((item) => {
                  return <li className="book-card__authors">{item}</li>;
                })}
              </ul>
            </div>
            <p className="book-card__description">
              {book.volumeInfo?.description}
            </p>
            <ul className="book-card__info-list">
              {book.volumeInfo?.categories?.map((item) => {
                return <li className="book-card__category-item">{item}</li>;
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default BookCard;
