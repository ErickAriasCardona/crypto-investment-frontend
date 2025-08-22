import React, { useEffect, useState } from 'react'
import './Header.css';
import { getAllCryptos } from '../../../api/crypto';
import { useSection } from '../../../context/CryptoContext/CryptoContext';

export const Header = () => {
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const { setSelectedCryptoId, setCryptoDetails, setSelectedCryptoSymbol } = useSection();
  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await getAllCryptos();
        setCryptos(response.data || []);
      } catch (error) {
        console.error('Error fetching cryptos:', error);
      }
    };
    fetchCryptos();
  }, []);

  useEffect(() => {
    const filtered = cryptos.filter(crypto =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCryptos(filtered);
  }, [searchTerm, cryptos]);

  const handleCryptoClick = (crypto) => {
    setSelectedCryptoId(crypto.id);
    setSelectedCryptoSymbol(crypto.symbol);
    setCryptoDetails(true);
    setSearchTerm('');

    // Scroll hacia la carta seleccionada
    const element = document.getElementById(`crypto-${crypto.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className='header'>
      <h1>Crypto Investment</h1>
      <div className='cryptocurrency-search-engine'>
        <input
          type="text"
          placeholder="Buscar por nombre o símbolo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <div className="search-results">
            {filteredCryptos.map(crypto => (
              <div
                key={crypto.id}
                className="search-result-item"
                onClick={() => handleCryptoClick(crypto)}
              >
                <span className='result-crypto-name'>{crypto.name}</span>
                <span className='result-crypto-symbol'>({crypto.symbol})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}