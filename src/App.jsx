import { useState } from "react";
import { TopMovers } from "./components/pages/TopMovers/TopMovers";
import { CryptoList } from "./components/pages/CryptoList/CryptoList";
// import {CryptoDetails} from "./components/pages/CryptoDetails/CryptoDetails";
import { Header } from "./components/Layouts/Header/Header";
import { Footer } from "./components/Layouts/Footer/Footer";
import "./App.css";

function App() {
  // Estado para controlar qué sección mostrar
  const [activeSection, setActiveSection] = useState("");
  const [selectedCryptoId, setSelectedCryptoId] = useState(null);

  // Función para seleccionar moneda y mostrar detalles
  const handleSelectCrypto = (id) => {
    setSelectedCryptoId(id);
    setActiveSection("details");
  };

  return (
    <div className="App">

      <Header />
      <main>
        <h2>TopMovers</h2>
        <TopMovers onSelectCrypto={handleSelectCrypto} />
        <h2>Crypto List</h2>

        <CryptoList onSelectCrypto={handleSelectCrypto} />

        {/* {activeSection === "details" && (
          <CryptoDetails
            cryptoId={selectedCryptoId}
            goBack={() => setActiveSection("topMovers")}
          />
        )} */}
      </main>

      <Footer />

    </div>
  );
}

export default App;
