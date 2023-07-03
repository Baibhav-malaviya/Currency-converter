import { useEffect, useState } from "react";

export default function App() {
  return <AllInOne />;
}

function AllInOne() {
  const [amount, setAmount] = useState(1);
  const [baseCurr, setBaseCurr] = useState("USD");
  const [targetCurr, setTargetCurr] = useState("INR");
  const [mainData, setMainData] = useState({});
  const [optionData, setOptionData] = useState({});
  // console.log(mainData.conversion_rates);
  const optionKeys = Object.keys(optionData);
  useEffect(
    function () {
      async function fetchApi() {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/e3966fe3a6052bdda5c00bbc/latest/${baseCurr}`
        );
        const data = await res.json();
        // console.log(data);
        setMainData(data);
        setOptionData(data.conversion_rates);
      }
      fetchApi();
    },
    [amount, baseCurr, targetCurr]
  );
  return (
    <>
      <div className="allInOne">
        <input
          type="text"
          placeholder="Amount . ."
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <select value={baseCurr} onChange={(e) => setBaseCurr(e.target.value)}>
          {optionKeys.map((key) => (
            <option>{key}</option>
          ))}
        </select>
        <select
          value={targetCurr}
          onChange={(e) => setTargetCurr(e.target.value)}
        >
          {optionKeys.map((key) => (
            <option>{key}</option>
          ))}
        </select>
        <div>{(optionData[targetCurr] * amount).toFixed(2)}</div>
      </div>
    </>
  );
}
