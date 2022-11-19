import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import StockData from "../sample.json";

function App() {
  return (
    <div className="App">
      <h1>Stocktiment Analysis {StockData["AAPL"]}</h1>
    </div>
  );
}

export default App;
