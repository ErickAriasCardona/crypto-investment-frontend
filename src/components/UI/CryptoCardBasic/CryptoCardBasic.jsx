import React, { useEffect, useState, useContext } from 'react'
import './CryptoCardBasic.css'
import { useSection } from '../../../context/CryptoContext/CryptoContext';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { getCryptoHistoryDB } from '../../../api/crypto';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale);

export const CryptoCardBasic = ({ id, name, symbol, price, percentChange, onClick }) => {
    const isPositive = Number(percentChange) > 0;
    const percentColor = isPositive ? "#1c9122ff" : "#d32f2f";
    const { cryptoDetails, selectedCryptoId } = useSection();

    // Verifica si esta carta específica está seleccionada
    const isSelected = cryptoDetails && selectedCryptoId === id;

    const [history, setHistory] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getCryptoHistoryDB(symbol);
                console.log(`📊 Histórico de ${symbol}:`, data);
                setHistory(data);
            } catch (error) {
                console.error(`Error fetching history for ${symbol}:`, error);
                setHistory(null);
            }
        };

        // Ejecutar inmediatamente
        fetchHistory();

        // Configurar el intervalo
        const interval = setInterval(fetchHistory, 15000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, [symbol]);
    // Determinar el color de la línea basado en el histórico
    const firstPrice = history?.[0]?.price;
    const lastPrice = history?.[history.length - 1]?.price;
    const lineColor = firstPrice && lastPrice
        ? (lastPrice > firstPrice ? "#1c9122ff" : "#d32f2f")
        : "#8b949e";

    const data = {
        labels: history?.map(entry => entry.date) || [],
        datasets: [{
            label: 'Precio histórico',
            data: history?.map(entry => entry.price) || [],
            fill: false,
            borderColor: lineColor,
            tension: 0.2,
        }],
    };

    const options = {
        scales: {
            x: { grid: { display: false }, ticks: { display: false } },
            y: { grid: { display: false }, ticks: { display: false } }
        }
    };

    return (
        <div className='crypto-card-basic' onClick={onClick} style={isSelected ? {
            gap: 0,
            justifyContent: 'center'
        } : {}}>
            {!isSelected && (
                <p className='id-currency'>{id}</p>
            )}
            <p className='currency-name'>{name} ({symbol})</p>
            {!isSelected && (
                <>
                    <p className='currency-price'>${Number(price).toFixed(2)}</p>
                    <p className='currency-change' style={{ color: percentColor }}>
                        {percentChange}%
                    </p>
                    <div className="historical-chart-list">
                        <Line data={data} options={options} />
                    </div>
                </>
            )}
        </div>
    )
}