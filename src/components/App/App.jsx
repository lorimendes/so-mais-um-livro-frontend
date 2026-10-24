import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Layout from "../Layout/Layout";
import Home from "../../pages/Home";
import BookSearch from "../../pages/BookSearch";
import { getBooksBySearch } from "../../utils/api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);

  async function handleSubmitSearch(searchText, startIndex) {
    setIsLoading(true);
    try {
      const data = await getBooksBySearch(searchText, startIndex);

      if (!data) {
        console.log("erro ao receber dados da api");
        return;
      }

      console.log(data);
      setTotalBooks(data.totalItems);
      setBooks(data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CurrentUserContext.Provider
      value={{ isLoading, isLoggedIn, books, totalBooks, handleSubmitSearch }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/book-search"
            element={<BookSearch onSubmit={getBooksBySearch} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
