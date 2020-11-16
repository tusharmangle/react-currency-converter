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
  const formattedValues = Object.values(response.data.results).map(
    (currency) => {
      return { value: currency.id, label: currency.currencyName };
    }
  );
  localStorage.setItem("currencies", JSON.stringify(formattedValues));
  console.log("Formatted Values", formattedValues);

  return formattedValues;
};

export const convertCurrencies = async (from, to) => {
  console.log(from, to);
  const key = `${from.value}_${to.value}`;
  const response = await axios.get(`${url}/convert?q=${key}&apiKey=${API_KEY}`);
  return response.data.results[key].val;
};
