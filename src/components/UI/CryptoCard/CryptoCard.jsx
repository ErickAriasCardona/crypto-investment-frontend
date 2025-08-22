import React from 'react'
import "./CryptoCard.css";
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale);

export const CryptoCard = ({ name, symbol, price, percentChange, history }) => {
  const isPositive = Number(percentChange) > 0;
  const percentColor = isPositive ? "#1c9122ff" : "#d32f2f";

  // Determinar el color de la línea basado en el histórico
  const firstPrice = history[0]?.price;
  const lastPrice = history[history.length - 1]?.price;
  const lineColor = firstPrice && lastPrice 
    ? (lastPrice > firstPrice ? "#1c9122ff" : "#d32f2f")
    : "#8b949e"; // Color por defecto si no hay datos

  const data = {
        labels: history?.map(entry => entry.date) || [],
    datasets: [
      {
        label: 'Precio histórico',
        data: history.map(entry => entry.price),
        fill: false,
        borderColor: lineColor,
        tension: 0.2,
      },
    ],
  };

  const options = {
    scales: {
      x: { grid: { display: false }, ticks: { display: false } },
      y: { grid: { display: false }, ticks: { display: false } }
    }
  };


  return (
    <div className='crypto-card'>
      <h4 className='nameCurrencie'>{name} ({symbol})</h4>
      <p className='priceCurrencie'>${Number(price).toFixed(2)}</p>
      <p className='percent_change24H' style={{ color: percentColor }}>
        {percentChange}%
      </p>
      <div className="historical-chart">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}