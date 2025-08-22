import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getCryptos = async () => {
  const res = await axios.get(`${API_URL}/cryptos`);
  return res.data;
};

export const getCryptoDetails = async (symbol) => {
  const res = await axios.get(`${API_URL}/cryptos/${symbol}`);
  return res.data;
};

export const getPriceHistory = async (id) => {
  const res = await axios.get(`${API_URL}/prices/${id}`);
  return res.data;
};

// Nueva función para obtener cryptos random
export const getRandomCryptos = async () => {
  const res = await axios.get(`${API_URL}/cryptos/random`);
  return res.data;
};

export const getCryptoHistoryCoingecko = async (slug) => {
  const res = await axios.get(`${API_URL}/cryptos/history-coingecko/${slug}`);
  return res.data;
};

// Nueva función para obtener cryptos 
export const getAllCryptos = async () => {
  const res = await axios.get(`${API_URL}/cryptos/AllCryptocurrencies`);
  return res.data;
};

export const getCryptoHistoryDB = async (symbol) => {
  const res = await axios.get(`${API_URL}/cryptos/history-db/${symbol}`);
  return res.data;
};
