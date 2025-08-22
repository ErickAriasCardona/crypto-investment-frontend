import React, { useEffect, useState } from 'react';
import "./TopMovers.css";
import { CryptoCard } from '../../UI/CryptoCard/CryptoCard';
import { getRandomCryptos, getCryptoHistoryDB, getGainers, getLosers } from '../../../api/crypto';

export const TopMovers = () => {
    const [cryptos, setCryptos] = useState([]);
    const [gainers, setGainers] = useState([]);
    const [losers, setLosers] = useState([]);

    // Random cryptos con histórico
    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const data = await getRandomCryptos();
                const cryptosWithHistory = await Promise.all(
                    data.slice(0, 4).map(async (crypto) => {
                        const history = await getCryptoHistoryDB(crypto.symbol);
                        return { ...crypto, history };
                    })
                );
                setCryptos(cryptosWithHistory);
            } catch (error) {
                console.error('❌ Error fetching random cryptos:', error);
                setCryptos([]);
            }
        };

        fetchCryptos();
        const interval = setInterval(fetchCryptos, 15000);
        return () => clearInterval(interval);
    }, []);

    // Gainers & Losers
    useEffect(() => {
        const fetchData = async () => {
            try {
                const gainersRes = await getGainers();
                const losersRes = await getLosers();

                setGainers(gainersRes?.data || []);
                setLosers(losersRes?.data || []);
            } catch (error) {
                console.error("❌ Error fetching gainers/losers:", error);
                setGainers([]);
                setLosers([]);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='content-top-movers'>
            {/* Random cards */}
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

            {/* Gainers / Losers */}
            <div className='content-gainers-losers'>
                <div className='gainers'>
                    <h3>Top Gainers</h3>
                    <div className='gainers-list'>
                        {gainers.slice(0, 3).map((crypto) => {
                            const percent = parseFloat(crypto.percent_change_24h) || 0;
                            return (
                                <div key={crypto.id}>
                                    <p>{crypto.name} ({crypto.symbol})</p>
                                    <p>${parseFloat(crypto.price_usd).toFixed(2)}</p>
                                    <p style={{ color: percent >= 0 ? "green" : "red" }}>
                                        {percent.toFixed(2)}%
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className='losers'>
                    <h3>Top Losers</h3>
                    <div className='losers-list'>
                        {losers.slice(0, 3).map((crypto) => {
                            const percent = parseFloat(crypto.percent_change_24h) || 0;
                            return (
                                <div key={crypto.id}>
                                    <p>{crypto.name} ({crypto.symbol})</p>
                                    <p>${parseFloat(crypto.price_usd).toFixed(2)}</p>
                                    <p style={{ color: percent >= 0 ? "green" : "red" }}>
                                        {percent.toFixed(2)}%
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
