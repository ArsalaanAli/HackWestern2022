import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import StockData from "../AllStocks.json";
import TopStocks from "../TopStocks.json";

function App() {
  const MAX_STOCKS = 5;
  const [curStocks, setCurStocks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [stockInfo, setStockInfo] = useState({});

  useEffect(() => {
    const fetchData = async (stockName) => {
      console.log("fetching");
      const data = await fetch(
        "https://94aac77b-2c55-492f-bca2-8fb32d5ff3c3.mock.pstmn.io/getSentiment3.0",
        {
          method: "GET",
          props: {},
        }
      );

      const parsedData = JSON.parse(await data.text());
      console.log(parsedData);
      setStockInfo();
    };
    Promise.all([
      curStocks.map((name) => {
        fetchData(name);
      }),
    ]);
  }, [curStocks]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const SentimentGraphic = (props) => {
    return (
      <div className="sentimentContainer">
        <div
          className={
            "sentimentGraphic" + (props.sentiment === 1 ? " veryBad" : "")
          }
        ></div>
        <div
          className={"sentimentGraphic" + (props.sentiment === 2 ? " bad" : "")}
        ></div>
        <div
          className={
            "sentimentGraphic" + (props.sentiment === 3 ? " neutral" : "")
          }
        ></div>
        <div
          className={
            "sentimentGraphic" + (props.sentiment === 4 ? " good" : "")
          }
        ></div>
        <div
          className={
            "sentimentGraphic" + (props.sentiment === 5 ? " veryGood" : "")
          }
        ></div>
      </div>
    );
  };

  const StockContainer = (props) => {
    console.log(stockInfo);
    return (
      <div className="widgetBox">
        <div>
          {props.stockName} | {props.stockSymbol}
        </div>
        <div>{<SentimentGraphic sentiment={props.stockSentiment} />}</div>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Stocktiment Analysis</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search here"
          onChange={handleChange}
          value={searchInput}
        />
        <button onClick={searchStocks}>Search</button>
        {JSON.stringify(stockInfo)}
      </div>
      <div className="resultsHolder">
        {curStocks.map((stock) => (
          <StockContainer
            stockName={stock}
            stockSymbol={StockData[stock]}
            stockSentiment={stockInfo?.[stock]?.["ovr_rating"]}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
