import { useState } from "react";
import Header from "../Header/Header";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <CurrentUserContext.Provider value={{ isLoggedIn }}>
      <div className="page">
        <Header />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
