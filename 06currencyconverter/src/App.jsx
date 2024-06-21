import React, { useState } from 'react';
import { InputBox } from './components'; // Adjust the path based on your project structure
import useCurrencyapp from './hooks/useCurrencyapp'; // Adjust the path based on your project structure

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyapp(from);
  const options = Object.keys(currencyInfo.data);

  const currencyListItems = options.map(currency => ({
    id: currency,
    content: `${currency}: ${currencyInfo.data[currency]}`,
  }));
  console.log(currencyListItems);

  const swap = () => {
    console.log(`Before swap: amount = ${amount}, convertedAmount = ${convertedAmount}`);

    // Swap currencies
    setFrom(prevFrom => {
      setTo(prevFrom);
      return to;
    });
    
    // Swap amounts
    setAmount(prevAmount => {
      setConvertedAmount(prevAmount);
      return convertedAmount;
    });

    console.log(`After swap: amount = ${convertedAmount}, convertedAmount = ${amount}`);
  };

  const convert = (e) => {
    e.preventDefault();
    console.log(currencyInfo.data[to]);
    console.log(to);
    console.log(amount);
    setConvertedAmount(amount * currencyInfo.data[to]);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/4497591/pexels-photo-4497591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form onSubmit={convert}>
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
                type="button" // Ensure it's type button to prevent form submission
              >
                Swap
              </button>
            </div>
            <div className="w-full mb-1">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectedCurrency={to}
                amountDisabled // This disables input for the "To" amount
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
