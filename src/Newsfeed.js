import React, { useEffect, useState } from "react";
import "./Newsfeed.css";
import LineGraph from "./LineGraph.js";
import Timeline from "./Timeline.js";
import Chip from '@material-ui/core/Chip';
import { Avatar } from "@material-ui/core";
import {useSelector} from "react-redux"


const popularTopics = [
  "Technology",
  "Top Movies",
  "Upcoming Earnings",
  "Crypto",
  "Cannabis",
  "Healthcare Supplies",
  "Index ETFs",
  "Technology",
  "China",
  "Pharma",
];

function Newsfeed() {

  const [isStockPositive, setIsStockPositive] = useState("#c53b3b")

  const currentStockData = useSelector((state) => {
    return state.stock.symbolData
  })

useEffect(() => {
  if(currentStockData !== null){
if(currentStockData.price - currentStockData.openPrice > 0){
  setIsStockPositive("#5AC53B")
}else{
  setIsStockPositive("#c53b3b")
}
  }
},[currentStockData])

if(currentStockData !== null){
  return (
    <div className="newsfeed">
      <div className="newsfeed__container"></div>
      <div className="newsfeed__chartSection">
        <div className="newsfeed__portfolio">
          <h1>{currentStockData? currentStockData.name: ""} ${currentStockData.price}</h1>
          <p style={{color: isStockPositive}}>{currentStockData.price - currentStockData.openPrice > 0 ? "+" : "-"}${Math.abs(Math.round((currentStockData.price - currentStockData.openPrice) * 100)/100)} (+0.04%) Today</p>
        </div>
        <div className="newsfeed__chart">
          <LineGraph />
          <Timeline />
        </div>
      </div>
      <div className="newsfeed__buying__section">
        <h2> Buying Power</h2>
        <h2> $2586.11</h2>
      </div>
      <div className="newsfeed__market__secFztion">
        <div className="newsfeed__market__box">
          <p>Markets Closed</p>
          {/* <h1>🎅Merry Christmas🎅</h1> */}
          <p id="buymecoffee">
            <a
              href="https://portfolio-b9fec.web.app/"
              target="_blank"
              rel="noreferrer"
            >
              Support me
            </a>
          </p>
        </div>
      </div>
      <div className="newsfeed__popularlists__section">
        <div className="newsfeed__popularlists__intro">
          <h1>Popular lists</h1>
          <p>Show More</p>
        </div>
        <div className="newsfeed_popularlists_badges">
          {popularTopics.map((topic) => (
            <Chip
              className="topic__badge"
              variant="outlined"
              label={topic}
              avatar={
                <Avatar
                  src={`https://avatars.dicebear.com/api/human/${topic}.svg`}
                />
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

return(
  <>Loading</>
)

}

export default Newsfeed;
