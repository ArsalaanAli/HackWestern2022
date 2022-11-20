import "./Frontend.css";
import { useEffect } from "react";
import StockData from "../AllStocks.json";
import TopStocks from "../TopStocks.json";

import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  styled,
  TextField,
} from "@mui/material";
import { useState } from "react";

const style = {
  margin: "1em",
  width: "80%",
  bgcolor: "background.paper",
};

function Frontend() {
  const MAX_STOCKS = 5;
  const [curStocks, setCurStocks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [stockInfo, setStockInfo] = useState({});

  useEffect(() => {
    const fetchData = async (stockName) => {
      console.log("fetching");
      const data = fetch("http://localhost:5000/getSentiment", {
        method: "POST",
        body: JSON.stringify({ Stock_Name: stockName }),
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response;
        });

      console.log(data);
      return data;
    };
    curStocks.forEach(async (stock) => {
      const data = await fetchData(stock);
      console.log(data);
      stockInfo[stock] = data;
      setStockInfo(stockInfo);
    });
  }, [curStocks]);

  const searchStocks = () => {
    const tempStocks = Object.keys(StockData).filter((stock) => {
      return stock
        .toLocaleLowerCase()
        .includes(searchInput.toLocaleLowerCase());
    });
    setCurStocks(tempStocks.slice(0, MAX_STOCKS));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const Card = (props) => {
    const [open, setOpen] = useState(false);
    const stockSentiment = stockInfo[props.stockName];
    console.log(stockSentiment + "sentimentsPassed Though");
    const handleClick = () => {
      setOpen(!open);
    };
    const looper = [0, 1, 2];
    if (stockSentiment == undefined) {
      console.log("not drop");
      return (
        <div>
          <ListItemButton onClick={handleClick}>
            <ListItemText
              primary={props.stockName + " | " + props.stockShortName}
            />
          </ListItemButton>
        </div>
      );
    } else {
      console.log("drop");

      return (
        <div>
          <ListItemButton onClick={handleClick}>
            <ListItemText
              primary={props.stockName + " | " + props.stockShortName}
            />
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {/* <blockquote>{props.summary}</blockquote> */}
            <ul>
              {looper.map(function (index, index2) {
                return (
                  <li key={index2}>
                    <a href={stockSentiment.links[index]}>
                      {stockSentiment.Bullet_Points[index]}
                    </a>
                  </li>
                );
                //console.log(props.comments[0])
                //console.log(index);
                //console.log(index2);
              })}
            </ul>
          </Collapse>
        </div>
      );
      // }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Stocker</h1>
        <div className={"SearchBar"}>
          <p className={"FieldLabel"}>Input stock name:</p>

          <TextField
            fullWidth
            label="E.g., Meta Platform Inc "
            variant="outlined"
            onChange={handleChange}
          />
          <button onClick={searchStocks}>SEARCH</button>
        </div>
        <List className={"ItemsList"} sx={style} component="nav">
          {/*name of stock, short name of stock, rating(0-4*/}{" "}
          <div className="cardsHolder">
            {curStocks.map((stock) => {
              return (
                <Card stockName={stock} stockShortName={StockData[stock]} />
              );
            })}
          </div>
        </List>
      </header>
    </div>
  );
}

export default Frontend;
