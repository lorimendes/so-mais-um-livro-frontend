import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function Layout({ onClosePopup, titlePopup, onOpenPopup }) {
  return (
    <div className="page">
      <Header onOpenPopup={onOpenPopup} />
      <main className="main">
        <Outlet />
        <ModalWithForm onClose={onClosePopup} title={titlePopup} />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
