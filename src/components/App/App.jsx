import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Layout from "../Layout/Layout";
import Home from "../../pages/Home";
import BookSearch from "../../pages/BookSearch";
import { getBooksBySearch } from "../../utils/api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchIndex, setSearchIndex] = useState(0);
  const [books, setBooks] = useState(null);
  const [totalBooks, setTotalBooks] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const noResultMessage = {
    title: "Nenhum livro encontrado.",
    text: "Verifique a ortografia e tente novamente.",
  };

  const serverErrorMessage = {
    title: "O serviço está fora do ar.",
    text: "Tente novamente em alguns instantes.",
  };

  function resetSearchData() {
    setErrorMessage(null);
    setSearchIndex(0);
    setBooks(null);
    setTotalBooks(0);
  }

  async function handleSubmitSearch(searchText) {
    resetSearchData();
    setIsLoading(true);
    navigate("/book-search");

    try {
      const data = await getBooksBySearch(searchText, searchIndex);
      if (!data) {
        console.log("erro ao receber dados da api");
        return;
      }

      if (data.totalItems === 0) {
        setErrorMessage(noResultMessage);
      }

      setTotalBooks(data.totalItems);
      setBooks(data.items);
      setSearchIndex((prevIndex) => prevIndex + 3);
    } catch (error) {
      if (error.status >= 500 && error.status < 600) {
        setErrorMessage(serverErrorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLoadMore() {
    setErrorMessage(null);
    setIsLoadingMore(true);
    try {
      const data = await getBooksBySearch(searchText, searchIndex);
      if (!data) {
        console.log("erro ao receber dados da api");
        return;
      }

      if (data.totalItems === 0) {
        setErrorMessage(noResultMessage);
      }

      setBooks((prevBooks) => {
        return [...prevBooks, ...data.items];
      });

      setSearchIndex((prevIndex) => prevIndex + 3);
    } catch (error) {
      if (error.status >= 500 && error.status < 600) {
        setErrorMessage(serverErrorMessage);
      }
    } finally {
      setIsLoadingMore(false);
    }
  }

  return (
    <CurrentUserContext.Provider
      value={{
        isLoading,
        isLoadingMore,
        isLoggedIn,
        searchText,
        setSearchText,
        searchIndex,
        books,
        totalBooks,
        errorMessage,
        handleSubmitSearch,
        handleLoadMore,
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
