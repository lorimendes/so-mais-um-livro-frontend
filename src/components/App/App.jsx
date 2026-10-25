import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Layout from "../Layout/Layout";
import Home from "../../pages/Home";
import BookSearch from "../../pages/BookSearch";
import { getBooksBySearch } from "../../utils/api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState(null);
  const [totalBooks, setTotalBooks] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const noResultMessage = {
    title: "Nenhum livro encontrado.",
    text: "Verifique a ortografia e tente novamente.",
  };

  const serverErrorMessage = {
    title: "O serviço está fora do ar.",
    text: "Tente novamente em alguns instantes.",
  };

  async function handleSubmitSearch(searchText, startIndex) {
    setErrorMessage(null);
    setIsLoading(true);
    setBooks(null);

    try {
      const data = await getBooksBySearch(searchText, startIndex);
      if (!data) {
        console.log("erro ao receber dados da api");
        return;
      }

      if (data.totalItems === 0) {
        setErrorMessage(noResultMessage);
      }

      setTotalBooks(data.totalItems);
      setBooks(data.items);
    } catch (error) {
      if (error.status >= 500 && error.status < 600) {
        setErrorMessage(serverErrorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CurrentUserContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        books,
        totalBooks,
        errorMessage,
        handleSubmitSearch,
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/book-search" element={<BookSearch />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
