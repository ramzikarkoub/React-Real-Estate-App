import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./Layout.css";
import SearchBar from "../searchBar/SearchBar";

const Layout = () => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main">
        <div className="outlet">
          <Outlet />
        </div>
        <SearchBar />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
