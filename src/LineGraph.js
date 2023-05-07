import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "./LineGraph.css";
import {useSelector} from "react-redux"




function LineGraph() {
 


  const getCurrentStock = useSelector((state) => {
    return state.stock.currentSymbol
  })
  
  const [graphData, setGraphData] = useState([]);
  const [isGraphLoaded, setIsGraphLoaded] = useState(false)
  const [graphColor, setGraphColor] = useState("#c53b3b")

  console.log(getCurrentStock)

  useEffect(() => {
    if(getCurrentStock !== ""){
      console.log("entered", getCurrentStock)
      getStockDataAV().then((res) => {
        if(res.success){
          createGraphData(res.data["Time Series (5min)"])
        }
      })
    }
      },[getCurrentStock])

  const getStockDataAV = () => {
    return new Promise((resolve) => {
      fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${getCurrentStock}&interval=5min&apikey=YVIR1PRXR2C0PUVX`,{
        method:"GET"
      }).then((res) => res.json()).then((finalResponse) => {
        console.log(finalResponse)
        return resolve({
          success: true,
          data: finalResponse
        })
      }).catch((err) => {
        console.log(err)
        return resolve({
          success: false
        })
      })
    })
  }

  const createGraphData = (data) => {
  
    const candleStickData = [];
    for(const date  in data){
      const dataPoint = data[date];
      candleStickData.push({x: new Date(date), y: parseFloat(dataPoint['4. close'])})
    }
    console.log(candleStickData[0].y ,candleStickData[candleStickData.length-1].y)
    if((candleStickData[0].y - candleStickData[candleStickData.length-1].y) < 0){
     
      setGraphColor("#c53b3b")
    }else{
      setGraphColor("#5AC53B")
    }

  
   setGraphData(candleStickData)
   setIsGraphLoaded(true)
  };




  return (
    <div className="Linegraph">
      {isGraphLoaded && graphData !== [] && (

        <Line
        data={{
          datasets: [
            {
              type: "line",
              data: graphData,
              backgroundColor: "black",
              borderColor: graphColor,
              borderWidth: 2,
              pointBorderColor: "rgba(0,0,0,0)",
              pointBackgroundColor: "rgba(0,0,0,0)",
              pointHoverBackgroundColor: graphColor,
              pointHoverBorderColor: "#000000",
              pointHoverBorderWidth: 4,
              pointHoverRadius: 6,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  format: "MM/DD/YY",
                  tooltipFormat: "ll",
                },
                ticks: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
      )}
      
    </div>
  );
}

export default LineGraph;
