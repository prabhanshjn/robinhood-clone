import React, { useState, useEffect } from "react";
import StatsRow from "./StatsRow.js";
import { db } from "./firebase";
import {useDispatch, useSelector} from "react-redux"
import "./Stats.css";

const BASE_URL = "https://finnhub.io/api/v1/quote/";
const TOKEN = "chbjqi9r01qmso50u040chbjqi9r01qmso50u04g";

function Stats() {
  const dispatch = useDispatch()

  const setCurrentStock = (stock) => {
dispatch({
  type: "SET_CURRENT_STOCK",
  data: stock
})
  }
  const getCurrentStock = useSelector((state) => {
  return state.stock.currentSymbol
})
  const [stockData, setStockData] = useState([]);
  const [mystockData, setmyStocks] = useState([]);

  const getMyStocks = () => {
    db.collection("myStocks").onSnapshot((snapshot) => {
      let promises = [];
      let tempData = [];
      snapshot.docs.map((doc) => {
        promises.push(
          getStocksData(doc.data().ticker).then((res) => {
            tempData.push({
              id: doc.id,
              data: doc.data(),
              info: res.data,
            });
          })
        );
        return tempData;
      });
      Promise.all(promises).then(() => {
        setmyStocks(tempData);
      });
    });
  };

  useEffect(getMyStocks, []);

  const getStocksData =  (stock) => {

    return new Promise((resolve) => {
      fetch(`${BASE_URL}?symbol=${stock}&token=${TOKEN}`,{
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
 

  useEffect(() => {
    let tempStocksData = [];
    const stocksList = [
      "AAPL",
      "MSFT",
      "TSLA",
      "IXCI",
      "DASH",
      "GOOGL",
      "ABNB",
      "AMZN",
    ];
    let promises = [];
    stocksList.map((stock) => {
      promises.push(
        getStocksData(stock).then((res) => {
          tempStocksData.push({
            name: stock,
            ...res.data,
          });
        })
      );
      return tempStocksData;
    });

    Promise.all(promises).then(() => {
      setStockData(tempStocksData);
    });
  }, []);

  return (
    <div className="stats">
      <div className="stats__container">
        <div className="stats__header">
          <p>Stocks</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {mystockData.map((stock) => (
              <StatsRow
                key={stock.data.ticker}
                name={stock.data.ticker}
                openPrice={stock.info.o}
                shares={stock.data.shares}
                price={stock.info.c}
              />
            ))}
          </div>
        </div>
        <div className="stats__header stats__lists">
          <p>Watch List</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {stockData.map((stock) => (
              <StatsRow
                key={stock.name}
                name={stock.name}
                openPrice={stock.o}
                price={stock.c}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
