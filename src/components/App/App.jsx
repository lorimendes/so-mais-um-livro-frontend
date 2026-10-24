import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Layout from "../Layout/Layout";
import Home from "../../pages/Home";
import BookSearch from "../../pages/BookSearch";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [books, setBooks] = useState([]);

  return (
    <CurrentUserContext.Provider value={{ isLoggedIn, books }}>
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
