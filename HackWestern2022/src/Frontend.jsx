import "./Frontend.css";
import { useEffect } from "react";
import StockData from "../AllStocks.json";
import TopStocks from "../TopStocks.json";
import Stalker from "./stalker.png";

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
  CircularProgress,
  Modal,
  Backdrop,
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
  const [isLoading, setIsLoading] = useState(false);
  const review = [
    "This stock is likely a very bad choice",
    "This stock might be a bad choice",
    "This stock is neutral",
    "This stock might be a good choice",
    "This stock is an excellent choice",
  ];
  const reviewColors = ["bad", "slightBad", "neutral", "slightGood", "good"];

  console.log(isLoading);

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
      setIsLoading(false);
    });
  }, [curStocks]);

  const searchStocks = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const tempStocks = Object.keys(StockData).filter((stock) => {
      return stock
        .toLocaleLowerCase()
        .includes(searchInput.toLocaleLowerCase());
    });
    if (tempStocks.length === 0) {
      setIsLoading(false);
      return;
    }
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
      return (
        <>
          <div>
            <ListItemButton onClick={handleClick}>
              <ListItemText
                primary={props.stockName + " | " + props.stockShortName}
              />
            </ListItemButton>
          </div>
        </>
      );
    } else {
      return (
        <div>
          <ListItemButton onClick={handleClick}>
            <ListItemText
              primary={props.stockName + " | " + props.stockShortName}
            />
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {/* <blockquote>{props.summary}</blockquote> */}
            <div
              className={"review " + reviewColors[stockSentiment["ovr_rating"]]}
            >
              {review[stockSentiment["ovr_rating"]]}
            </div>
            <ul>
              {looper.map(function (index, index2) {
                return (
                  <li key={index2}>
                    <a
                      className="bulletPoint"
                      href={stockSentiment.links[index]}
                    >
                      {stockSentiment.Bullet_Points[index]}...
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
        <img src={Stalker} className="logoPicture" />
        <h1>Stocker</h1>
        <div className={"SearchBar"}>
          <p className={"FieldLabel"}>Input stock name:</p>

          <TextField
            fullWidth
            label="E.g., Meta Platform Inc "
            variant="outlined"
            onChange={handleChange}
          />
        </div>
        <button onClick={searchStocks} className="searchButton">
          SEARCH
        </button>
        {isLoading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
            onClick={() => {}}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : null}{" "}
        {/* Loading modal */}
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
