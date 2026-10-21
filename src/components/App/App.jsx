import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <CurrentUserContext.Provider value={{ isLoggedIn }}>
      <div className="page">
        <Header />
        <Main></Main>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
