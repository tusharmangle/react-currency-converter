import axios from "axios";

const url = "https://free.currencyconverterapi.com/api/v6";
const API_KEY = process.env.REACT_APP_API_KEY;

export const getCurruncies = async () => {
  const currencies = localStorage.getItem("currencies");
  if (currencies) {
    const response = JSON.parse(currencies);
    return response;
  }
  const response = await axios.get(`${url}/currencies?apiKey=${API_KEY}`);
  localStorage.setItem("currencies", JSON.stringify(response.data.results));
  return response.data.results;
};

export const convertCurrencies = async (from, to) => {
  const key = `${from}_${to}`;
  const response = await axios.get(`${url}/convert?q=${key}&apiKey=${API_KEY}`);
  return response.data.results[key].val;
};
