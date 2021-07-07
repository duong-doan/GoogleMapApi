import React from "react";
import Chart from "./Components/Chart/index";
import MapBox from "./Components/MapBox/index";
import GoogleMapApi from "./Components/GoogleMapApi/index";
import { ChartStock, ChartColumn } from "./Components/ChartStock";
import "./App.css";

const App = () => {
  return (
    <div id="container">
      <GoogleMapApi />
      <MapBox />
      <Chart />
      <ChartStock />
      <ChartColumn />
    </div>
  );
};

export default App;
