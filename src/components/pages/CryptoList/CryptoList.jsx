import React from 'react'
import "./CryptoList.css";
import { CryptoCardBasic } from '../../UI/CryptoCardBasic/CryptoCardBasic';

export const CryptoList = () => {
    return (
        <div className="crypto-list">
            <CryptoCardBasic />
            <CryptoCardBasic />
            <CryptoCardBasic />
            <CryptoCardBasic />
        </div>
    )
}
