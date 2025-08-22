import { createContext, useState, useContext } from 'react';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
    const [cryptoDetails, setCryptoDetails] = useState(false);
    const [selectedCryptoId, setSelectedCryptoId] = useState(null);
    const [selectedCryptoSymbol, setSelectedCryptoSymbol] = useState(null);

    return (
        <CryptoContext.Provider
            value={{
                cryptoDetails,
                setCryptoDetails,
                selectedCryptoId,
                setSelectedCryptoId,
                selectedCryptoSymbol,
                setSelectedCryptoSymbol
            }}
        >
            {children}
        </CryptoContext.Provider>
    );
};

export const useSection = () => useContext(CryptoContext);