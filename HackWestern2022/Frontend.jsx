import logo from './logo.svg';
import './Frontend.css';
import {
    Collapse,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton, ListItemIcon,
    ListItemText,
    OutlinedInput,
    styled,
    TextField
} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {useState} from "react";
import {faLink} from "@fortawesome/free-solid-svg-icons";


const style = {
    width: "80%",
    bgcolor: 'background.paper',
};


function Frontend() {


    const stockResults = [
        {
            "stockName" : "Apple Inc",
            "stockShortName" : "AAPL",
            "rating" : 3,
            "summary" : "This is a good investment",
            "comments" : [ "Comment 1", "Comment 2", "Comment 3" ],
            "links" : ["https://uwaterloo.ca", "https://uwo.ca", "https://uwindsor.ca"]
        },
        {
            "stockName" : "Samsung Corp",
            "stockShortName" : "SMSG",
            "rating" : 4,
            "summary" : "This is a really good investment",
            "comments" : [ "Commentadsf 1", "Commentasdf 2", "Commentasdf 3" ],
            "links" : ["https://uwaterloo.ca", "https://uwo.ca", "https://uwindsor.ca"]
        }
    ]

    const Card = (props) => {
        const [open, setOpen] = useState(false);

        const handleClick = () => {
            setOpen(!open);
        };
        const looper = [0,1,2];
        return(<div>
            <ListItemButton onClick={handleClick}>
            <ListItemText primary={props.stockName + " | " + props.stockShortName } />
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <blockquote>
                {props.summary}
            </blockquote>
            <ul>
                {looper.map(function(index,index2){
                    return <li key={index2}><a href={(props.links)[index]}>{(props.comments)[index]}</a></li>;
                    //console.log(props.comments[0])
                    //console.log(index);
                    //console.log(index2);
                })}
            </ul>
        </Collapse>
        </div>);
    }

  return (
    <div className="App">
      <header className="App-header">
          <h1>Stocktiment Analysis</h1>
          <div className={"SearchBar"}>
              <p className={"FieldLabel"}>Input stock name:</p>
              <TextField fullWidth label="E.g., Meta Platform Inc " variant="outlined" />
          </div>
          <List className={"ItemsList"} sx={style} component="nav">
              {/*name of stock, short name of stock, rating(0-4*/}
              <div>
              {stockResults.map((props) => (
                  <Card stockName={props.stockName} stockShortName={props.stockShortName} rating={props.rating} summary={props.summary} comments={props.comments} links={props.links}/>
              ))}
              </div>
              {/*<Card stockName="Apple Inc." stockShortName={"AAPL"} rating={0} summary={"Lorem ipsum this is a test."}/>*/}
              <Divider />
              {/*<Card stockName="Samsung Corps" stockShortName={"SMSG"} rating={2} summary={"Amd ipsum this is a test."}/>*/}
              <Divider />
              <ListItem>
                  <ListItemText primary="Drafts" />
              </ListItem>
              <Divider />
              <ListItem>
                  <ListItemText primary="Trash" />
              </ListItem>
              <Divider />
              <ListItem>
                  <ListItemText primary="Spam" />
              </ListItem>
          </List>
      </header>
        <body>

        </body>
    </div>
  );
}

export default Frontend;
