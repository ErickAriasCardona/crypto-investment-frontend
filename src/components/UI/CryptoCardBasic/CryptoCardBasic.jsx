import React from 'react'
import './CryptoCardBasic.css'

export const CryptoCardBasic = () => {
    return (
        <div className='crypto-card-basic'>
            <p className='id-currency'>1</p>
            <p className='currency-name'>Bitcoin (BTC) </p>
            <p className='currency-price'>$40,000</p>
            <p className='currency-change'>2%</p>
            <p className='currency-chart'>Grafica</p>

        </div>
    )
}
