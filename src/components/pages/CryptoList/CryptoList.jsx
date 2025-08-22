import React, { useEffect, useState, useContext } from 'react'
import "./CryptoList.css";
import { CryptoCardBasic } from '../../UI/CryptoCardBasic/CryptoCardBasic';
import { getAllCryptos } from '../../../api/crypto';
import { useSection } from '../../../context/CryptoContext/CryptoContext';
import { CryptoDetails } from '../CryptoDetails/CryptoDetails';



export const CryptoList = () => {
    const [cryptos, setCryptos] = useState([]);
    const [error, setError] = useState(null);
    const { cryptoDetails, setCryptoDetails, selectedCryptoId, setSelectedCryptoId, selectedCryptoSymbol, setSelectedCryptoSymbol } = useSection();

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await getAllCryptos();
                if (response && response.success && Array.isArray(response.data)) {
                    setCryptos(response.data);
                } else {
                    throw new Error('Invalid data format received');
                }
            } catch (err) {
                console.error('Error fetching cryptos:', err);
                setError(err.message);
                setCryptos([]);
            }
        };
        fetchCryptos();
        const interval = setInterval(fetchCryptos, 90000);
        return () => clearInterval(interval);
    }, []);

    const handleCryptoDetails = (id, symbol) => {
        console.log("Selected Crypto ID:", id);
        console.log("Selected Crypto Symbol:", symbol);
        setSelectedCryptoSymbol(symbol);
        setSelectedCryptoId(id);
        setCryptoDetails(true);
    };
    if (error) {
        return <div>Error loading cryptocurrencies: {error}</div>;
    }

    return (
        <div className="crypto-list">
            {cryptos.map((crypto) => (
                <div key={crypto.id} className="crypto-item">
                    <CryptoCardBasic
                        id={crypto.id}
                        name={crypto.name}
                        symbol={crypto.symbol}
                        slug={crypto.slug}
                        price={crypto.last_price}
                        percentChange={crypto.percent_change_24h}
                        volume={crypto.volume_24h}
                        lastUpdated={crypto.last_updated}
                        onClick={() => handleCryptoDetails(crypto.id, crypto.symbol)} // Aquí pasamos también el symbol
                    />
                    {cryptoDetails && selectedCryptoId === crypto.id && (
                        <CryptoDetails />
                    )}
                </div>
            ))}
        </div>
    )
}