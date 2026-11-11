import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Layout from "../Layout/Layout";
import Home from "../../pages/Home";
import BookSearch from "../../pages/BookSearch";
import { getBooksBySearch } from "../../utils/api";
import mainApi from "../../utils/MainApi";
import { setToken, removeToken, getToken } from "../../utils/token";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchIndex, setSearchIndex] = useState(0);
  const [books, setBooks] = useState(null);
  const [totalBooks, setTotalBooks] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [titlePopup, setTitlePopup] = useState(null);
  const [errorAuth, setErrorAuth] = useState(null);

  const navigate = useNavigate();

  const noResultMessage = {
    title: "Nenhum livro encontrado.",
    text: "Verifique a ortografia e tente novamente.",
  };

  const serverErrorMessage = {
    title: "O serviço está fora do ar.",
    text: "Tente novamente em alguns instantes.",
  };

  async function handleSubmitSearch(searchText) {
    setErrorMessage(null);
    setSearchIndex(0);
    setBooks(null);
    setTotalBooks(0);
    setIsLoading(true);
    navigate("/book-search");

    try {
      const data = await getBooksBySearch(searchText, 0);
      if (!data) {
        setErrorMessage(serverErrorMessage);
        return;
      }

      if (data.totalItems === 0) {
        setErrorMessage(noResultMessage);
        return;
      }

      if (!data.items) {
        setErrorMessage(serverErrorMessage);
        return;
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
        setErrorMessage(serverErrorMessage);
        return;
      }

      if (data.totalItems === 0) {
        setErrorMessage(noResultMessage);
        return;
      }

      if (!data.items) {
        setErrorMessage(serverErrorMessage);
        return;
      }

      setTotalBooks(data.totalItems);
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

  async function handleRegister(name, email, password) {
    setIsLoadingAuth(true);
    try {
      const res = await mainApi.signup(name, email, password);

      if (res) {
        await handleLogin(email, password);
      }
    } catch (error) {
      if (error.status === 409) {
        setErrorAuth("Email já cadastrado");
      } else if (error.status === 400) {
        setErrorAuth("Dados incompletos ou inválidos");
      } else {
        setErrorAuth("Ocorreu um erro no servidor");
      }
    } finally {
      setIsLoadingAuth(false);
    }
  }

  async function handleLogin(email, password) {
    setIsLoadingAuth(true);
    try {
      const res = await mainApi.signin(email, password);

      if (res && res.token) {
        setToken(res.token);
        setIsLoggedIn(true);
        setTitlePopup(null);
        setErrorAuth(null);

        const userData = await mainApi.getUser();
        setCurrentUser(userData);
      }
    } catch (error) {
      if (error.status === 401) {
        setErrorAuth("Email e/ou senha incorretos");
      } else {
        setErrorAuth("Ocorreu um erro no servidor");
      }
    } finally {
      setIsLoadingAuth(false);
    }
  }

  function handleLogout() {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser({});
    setBooks(null);
    setSearchText("");
    navigate("/");
  }

  const checkUserLogged = async () => {
    try {
      const userData = await mainApi.getUser();
      if (userData) {
        setCurrentUser(userData);
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    const token = getToken();

    if (!token) return;

    setIsLoggedIn(true);
    checkUserLogged();
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        isLoading,
        isLoadingMore,
        isLoadingAuth,
        isLoggedIn,
        currentUser,
        searchText,
        setSearchText,
        searchIndex,
        books,
        totalBooks,
        errorMessage,
        errorAuth,
        handleSubmitSearch,
        handleLoadMore,
        handleRegister,
        handleLogin,
        handleLogout,
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              titlePopup={titlePopup}
              onOpenPopup={setTitlePopup}
              onClosePopup={() => {
                setTitlePopup(null);
                setErrorAuth(null);
              }}
            />
          }
        >
          <Route index element={<Home />} />
          <Route
            path="/book-search"
            element={
              <ProtectedRoute>
                <BookSearch />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
