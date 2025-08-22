import React, { useEffect, useState } from 'react';
import "./TopMovers.css";
import { CryptoCard } from '../../UI/CryptoCard/CryptoCard';
import { getRandomCryptos, getCryptoHistoryDB } from '../../../api/crypto';

export const TopMovers = () => {
    const [cryptos, setCryptos] = useState([]);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const data = await getRandomCryptos();
                // Obtener el histórico para cada moneda
                const cryptosWithHistory = await Promise.all(
                    data.slice(0, 4).map(async (crypto) => {
                        const history = await getCryptoHistoryDB(crypto.symbol);
                        return { ...crypto, history };
                    })
                );
                setCryptos(cryptosWithHistory);
            } catch (error) {
                console.error('❌ Error fetching cryptos:', error);
                setCryptos([]);
            }
        };

        fetchCryptos();
        const interval = setInterval(fetchCryptos, 15000);
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
                        history={crypto.history}
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