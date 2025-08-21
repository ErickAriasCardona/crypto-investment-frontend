import React, { useEffect, useState } from 'react';
import "./TopMovers.css";
import { CryptoCard } from '../../UI/CryptoCard/CryptoCard';
import { getRandomCryptos } from '../../../api/crypto';

export const TopMovers = () => {
    const [cryptos, setCryptos] = useState([]);

    useEffect(() => {
        const fetchCryptos = async () => {
            const data = await getRandomCryptos();
            setCryptos(data);
        };
        fetchCryptos();
        const interval = setInterval(fetchCryptos, 15000); // Cambiado a 15 segundos
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='content-top-movers'>
            <div className='random-crypto-currencies'>
                {cryptos.slice(0, 4).map((crypto, idx) => (
                    <CryptoCard
                        key={crypto.id || idx}
                        name={crypto.name}
                        symbol={crypto.symbol}
                        price={crypto.last_price}
                        percentChange={crypto.percent_change_24h}
                    />
                ))}
            </div>
            <div className='content-gainers-losers'>
                <div className='gainers'>
                    Gainers
                </div>
                <div className='losers'>
                    Losers
                </div>
            </div>
            <div></div>
        </div>
    )
}