import NoResults from "../NoResults/NoResults";

function SearchResults({ books }) {
  return (
    <>
      {!books ? (
        <NoResults />
      ) : (
        <ul className="search-results">
          <li>{/* Componentes Book aqui */}</li>
        </ul>
      )}
    </>
  );
}

export default SearchResults;
