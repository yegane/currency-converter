import { useState, useEffect } from "react";
import CurrencySelect from "./CurrencySelect";

const ConverterForm = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("IRR");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);

  const handleSwapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getExchangeRate = async () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = `http://api.navasan.tech/latest/?api_key=${API_KEY}`;

    try {
      const resonse = await fetch(API_URL);
      if (!resonse.ok) throw Error("Something went wrong!");
      const data = await resonse.json();

      //   const fromRate = Number(data[fromCurrency.toLowerCase()]?.value);
      //   const toRate = Number(data[toCurrency.toLowerCase()]?.value);

      const fromRate =
        fromCurrency === "IRR"
          ? 1
          : Number(data[fromCurrency.toLowerCase()]?.value);

      const toRate =
        toCurrency === "IRR"
          ? 1
          : Number(data[toCurrency.toLowerCase()]?.value);

      if (
        !Number.isFinite(fromRate) ||
        !Number.isFinite(toRate) ||
        fromRate <= 0 ||
        toRate <= 0
      ) {
        throw new Error("Exchange rate not found");
      }

      const convertedAmount = (Number(amount) * fromRate) / toRate;

      setResult(convertedAmount.toFixed(2));

      console.log("Converted amount:", convertedAmount);
      console.log(fromRate, toRate);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (amount !== "" && Number(amount) > 0) {
      getExchangeRate();
    }
  }, [fromCurrency, toCurrency]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    getExchangeRate();
  };
  return (
    <form className="converter-form" onSubmit={handleFormSubmit}>
      <div className="form">
        <label className="form-label">Enter Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="form-input"
        />
      </div>
      <div className="form currency-section">
        <div className="form-section">
          <label className="form-label">From</label>
          <CurrencySelect
            selectedCurrency={fromCurrency}
            handleCurrency={(e) => setFromCurrency(e.target.value)}
          />
        </div>

        <div className="swap-icon" onClick={handleSwapCurrency}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          >
            <path d="m5.75 8.25-3 3 3 3m7.5-3h-10.5m7.5-9.5l3 3-3 3m-7.5-3h10.5" />
          </svg>
        </div>

        <div className="form-section">
          <label className="form-label">To</label>
          <CurrencySelect
            selectedCurrency={toCurrency}
            handleCurrency={(e) => setToCurrency(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="submit">
        exchange
      </button>
      <p className="exchange-result">
        {result !== null
          ? `${amount} ${fromCurrency} = ${result} ${toCurrency}`
          : "Enter an amount and select currencies"}{" "}
      </p>
    </form>
  );
};

export default ConverterForm;
