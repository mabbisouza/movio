import "./App.css";
import Shows from "./pages/shows";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import Header from "./components/header";
// import CardPage from "./pages/cards";
import { FavProvider } from "./context/FavContext";
import FavoritePage from "./pages/favorites";
import Search from "./pages/search";
import ShowIdPage from "./pages/shows/[id]";

function App() {
  return (
    <>
    <FavProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Shows />} />
          <Route path="/search" element={<Search />} />
          <Route path="/shows/:id" element={<ShowIdPage />}></Route>
          <Route path="/meusfavoritos" element={<FavoritePage/>} />
        </Routes>
      </BrowserRouter>
      </FavProvider>
    </>
  );
}

export default App;
