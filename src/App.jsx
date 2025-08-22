import { useState } from "react";
import "./App.css";
import { CryptoProvider } from "./context/CryptoContext/CryptoContext";
import { Header } from "./components/Layouts/Header/Header";
import { TopMovers } from "./components/pages/TopMovers/TopMovers";
import { CryptoList } from "./components/pages/CryptoList/CryptoList";
import { CryptoDetails } from "./components/pages/CryptoDetails/CryptoDetails";
import { Footer } from "./components/Layouts/Footer/Footer";

function App() {
  return (
    <CryptoProvider>
      <div className="App">
        <Header />
        <main>
          <h2>Top Movers</h2>
          <TopMovers />
          <h2>Crypto List</h2>
          <CryptoList />
        </main>
        <Footer />
      </div>
    </CryptoProvider>
  );
}

export default App;