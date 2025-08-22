import React, { useEffect, useState } from 'react'
import "./CryptoDetails.css";
import { useSection } from '../../../context/CryptoContext/CryptoContext';
import { getCryptoDetails } from '../../../api/crypto';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { getCryptoHistoryDB } from '../../../api/crypto';
import { color } from 'chart.js/helpers';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale);

export const CryptoDetails = () => {
  const { selectedCryptoSymbol, setCryptoDetails } = useSection();
  const [cryptoData, setCryptoData] = useState(null);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getCryptoHistoryDB(selectedCryptoSymbol);
        console.log(`📊 Histórico detallado de ${selectedCryptoSymbol}:`, data);
        setHistory(data);
      } catch (error) {
        console.error(`Error fetching history for ${selectedCryptoSymbol}:`, error);
        setHistory(null);
      }
    };

    if (selectedCryptoSymbol) {
      fetchHistory();
    }
  }, [selectedCryptoSymbol]);

  // Determinar el color de la línea basado en el histórico
  const firstPrice = history?.[0]?.price;
  const lastPrice = history?.[history.length - 1]?.price;
  const lineColor = firstPrice && lastPrice
    ? (lastPrice > firstPrice ? "#1c9122ff" : "#d32f2f")
    : "#8b949e";

  const data = {
    labels: history?.map(entry => {
        const date = new Date(entry.date);
        return date.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }) || [],
    datasets: [{
        label: 'Precio histórico',
        data: history?.map(entry => entry.price) || [],
        fill: false,
        borderColor: lineColor,
        tension: 0.2,
    }],
};

  const options = {
    maintainAspectRatio: false, // Esto permite que el gráfico se ajuste al contenedor
    responsive: true,
    scales: {
      x: { grid: { display: true }, ticks: { display: true, color: 'black' } },
      y: { grid: { display: false }, ticks: { display: true,  color: 'black'} }
    }
  };

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      try {
        const data = await getCryptoDetails(selectedCryptoSymbol);
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching crypto details:", error);
      }
    };

    if (selectedCryptoSymbol) {
      fetchCryptoDetails();
    }
  }, [selectedCryptoSymbol]);


  const handleClose = () => {
    setCryptoDetails(false);
  };

  return (
    <div className="container-crypto-details">

      <div className="historical-chart-detail">
        <Line data={data} options={options} />
      </div>

      <div className="details-currency">
        <div className='detail-item'>
          <p>Price</p>
          <p className='detail-value'>
            ${cryptoData ? Number(cryptoData.quote.USD.price).toFixed(2) : "0.00"}
          </p>
        </div>
        <div className='detail-item'>
          <p>%</p>
          <p className='detail-value'>
            {cryptoData ? Number(cryptoData.quote.USD.percent_change_24h).toFixed(2) : "0"}%
          </p>
        </div>
        <div className='detail-item'>
          <p>Volume</p>
          <p className='detail-value'>
            {cryptoData ? Number(cryptoData.quote.USD.volume_change_24h).toFixed(2) : "0.00"}
          </p>

        </div>
        <button className='close-CryptoDetails' onClick={handleClose}>X</button>
      </div>
    </div>
  )
}