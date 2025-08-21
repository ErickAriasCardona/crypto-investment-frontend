import React from 'react'
import "./CryptoCard.css";
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale);


export const CryptoCard = ({ name, symbol, price, percentChange }) => {
  const isPositive = Number(percentChange) > 0;
  const percentColor = isPositive ? "#1c9122ff" : "#d32f2f";

  const data = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Precio histórico',
        data: [2000, 2100, 2050, 2200, 2150, 2250, 2300],
        fill: false,
        // borderColor: percentColor,
        borderColor: percentColor,

        tension: 0.01,
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