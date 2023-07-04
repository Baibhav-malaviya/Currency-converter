import { useEffect, useState } from "react";
import { BsArrowLeftRight } from "react-icons/bs";

export default function App() {
  return (
    <>
      <AllInOne />
      <CardBox />
    </>
  );
}

function AllInOne() {
  const [data, setData] = useState({});
  const [amount, setAmount] = useState(1);
  const [baseCurr, setBaseCurr] = useState("USD");
  const [targetCurr, setTargetCurr] = useState("INR");

  // console.log(mainData.conversion_rates);
  const optionKeys = Object.keys(data);
  useEffect(
    function () {
      async function fetchApi() {
        try {
          const res = await fetch(
            `https://v6.exchangerate-api.com/v6/e3966fe3a6052bdda5c00bbc/latest/${baseCurr}`
          );
          const data = await res.json();
          setData(data.conversion_rates);
        } catch (err) {}
        // console.log(data);
      }
      fetchApi();
      // document.title = `${baseCurr} to ${targetCurr}`;
      // return function () {
      //   document.title = `Currency convertor`;
      // };
    },
    [amount, baseCurr, targetCurr]
  );
  return (
    <>
      <div className="allInOne">
        <fieldset>
          <legend>Amount</legend>
          <input
            type="text"
            placeholder=" Amount... "
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </fieldset>
        <fieldset>
          <legend>From</legend>
          <select
            value={baseCurr}
            onChange={(e) => setBaseCurr(e.target.value)}
          >
            {optionKeys.map((key) => (
              <option key={key}>{key}</option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <legend>To</legend>
          <select
            value={targetCurr}
            onChange={(e) => setTargetCurr(e.target.value)}
          >
            {optionKeys.map((key) => (
              <option key={key}>{key}</option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <legend>Result</legend>
          <div>{(data[targetCurr] * amount).toFixed(2)}</div>
        </fieldset>
      </div>
    </>
  );
}
function CardBox() {
  return (
    <div className="cardBox">
      <Card From={"USD"} To={"INR"} />
      <Card From={"USD"} To={"EUR"} />
      <Card From={"EUR"} To={"INR"} />
    </div>
  );
}

function Card({ From, To }) {
  const [data, setData] = useState({});
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState(From);
  const [to, setTo] = useState(To);
  function swipe() {
    setFrom(to);
    setTo(from);
  }
  useEffect(function () {
    document.title = `${from} to ${to}`;
    return function () {
      document.title = `Currency convertor`;
    };
  });
  useEffect(
    function () {
      async function fetchApi() {
        try {
          const res = await fetch(
            `https://v6.exchangerate-api.com/v6/e3966fe3a6052bdda5c00bbc/latest/${from}`
          );
          const data = await res.json();
          setData(data.conversion_rates);
        } catch (err) {}
      }
      fetchApi();
    },
    [amount, from, to]
  );
  return (
    <div className="card">
      <div className="border"></div>
      <div className="top">
        <fieldset>
          <legend>Amount</legend>
          <input
            type="text"
            placeholder=" Amount... "
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </fieldset>
        <div className="from">{from}</div>
        <div className="swipe" style={{ cursor: "pointer" }} onClick={swipe}>
          <BsArrowLeftRight />
        </div>
        <div className="to">{to}</div>
      </div>
      <div className="bottom">
        <h1>{(data[to] * amount).toFixed(4)}</h1>
      </div>
    </div>
  );
}
