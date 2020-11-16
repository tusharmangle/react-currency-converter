import React, { Component } from "react";
import CountUp from "react-countup";
import { convertCurrencies, getCurruncies } from "./api";
import { FromInput, ToInput } from "./components";
import "./styles/tailwind.css";

class App extends Component {
  state = {
    currencies: [],
    to: "",
    from: "",
    amount: null,
    result: 0,
    converting: false,
  };

  setFrom = (value) => {
    this.setState({ from: value, result: 0 });
  };
  setTo = (value) => {
    this.setState({ to: value, result: 0 });
  };
  alterParams = async () => {
    const fromValue = { from: this.state.from, to: this.state.to }; //concept of value by reference
    this.setState({
      from: fromValue.to,
      to: fromValue.from,
      result: 0,
      amount: 0,
    });
  };

  handleConvertCurrencies = async () => {
    this.setState({ converting: true });
    const { from, to } = this.state;
    const result = await convertCurrencies(from, to);
    this.setState({ result });
    this.setState({ converting: false });
  };

  formattedResult = () => {
    const newResult = this.state.result * this.state.amount;
    return newResult === 0 ? 0 : newResult;
  };

  async componentDidMount() {
    const currencies = await getCurruncies();
    this.setState({ currencies: Object.values(currencies) });
  }
  handleDisable = () => {
    let classname =
      "bg-blue-600 text-white px-8 py-2 rounded tracking-wide text-lg font-semibold uppercase focus:outline-none ";
    const { amount } = this.state;
    return Number(amount) === 0
      ? `${classname} opacity-50 cursor-not-allowed`
      : `${classname}`;
  };

  render() {
    const { currencies, amount, to, from, converting } = this.state;
    return (
      <>
        <div className="flex flex-col  text-center my-12">
          <div className="text-5xl font-bold text-gray-700">
            Curr<span className="text-red-600">converter</span>
          </div>
          <div className="text-gray-700 text-lg">
            Convert currencies across the globe
          </div>
        </div>

        <div className="container mx-auto flex flex-col sm:flex-row flex-wrap items-center">
          <div className="sm:flex-1 my-2">
            <FromInput
              currencies={currencies}
              from={from}
              setFromHandler={this.setFrom}
            ></FromInput>
          </div>
          <div className="flex justify-center my-4">
            <svg
              onClick={() => this.alterParams()}
              className="w-10 h-10 cursor-pointer bg-red-600 p-2 rounded-full text-white fill-current"
              viewBox="0 0 512 512"
              width="512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Solid">
                <path d="m48 192h358.059l-39.03 39.029a24 24 0 0 0 33.942 33.942l80-80a24 24 0 0 0 0-33.942l-80-80a24 24 0 0 0 -33.942 33.942l39.03 39.029h-358.059a24 24 0 0 0 0 48z" />
                <path d="m464 320h-358.059l39.03-39.029a24 24 0 0 0 -33.942-33.942l-80 80a24 24 0 0 0 0 33.942l80 80a24 24 0 0 0 33.942-33.942l-39.03-39.029h358.059a24 24 0 0 0 0-48z" />
              </g>
            </svg>
          </div>
          <div className="sm:flex-1 my-2">
            <ToInput
              to={to}
              setToHandler={this.setTo}
              currencies={currencies}
            ></ToInput>
          </div>
        </div>

        <div className="flex justify-center my-8 px-3">
          <input
            value={amount}
            onChange={(e) => this.setState({ amount: e.target.value })}
            type="number"
            className="w-3/4 sm:w-1/4 bg-white px-5 py-3 border rounded-lg font-semibold text-gray-600 focus:outline-none focus:shadow-outline"
            placeholder="Enter Amount"
          />
        </div>

        <div className="flex justify-center my-4">
          <button
            disabled={Number(amount) === 0}
            onClick={() => this.handleConvertCurrencies()}
            className={this.handleDisable()}
          >
            {converting ? (
              <span className=" animate-ping duration-300">⏳</span>
            ) : (
              "Convert"
            )}
          </button>
        </div>

        <div className="flex justify-center">
          <div className="text-5xl text-gray-700">
            <CountUp
              start={0}
              end={this.formattedResult()}
              duration={0.35}
              separator=","
              decimals={2}
              decimal="."
            ></CountUp>
            {/* {this.formattedResult()} */}
          </div>
        </div>
        <div className="text-center text-gray-700 font-semibold my-8">
          Design & Devloped by{" "}
          <a
            className="font-semibold text-blue-600"
            href="https://tusharmangle.netlify.app"
          >
            Tushar Mangle
          </a>
        </div>
      </>
    );
  }
}

export default App;
