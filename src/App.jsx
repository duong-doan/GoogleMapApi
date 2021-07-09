import React from "react";
import GoogleMapApi from "./Components/GoogleMapApi/index";
// import Chart from "./Components/Chart/index";
import MapBox from "./Components/MapBox/index";
// import { ChartStock, ChartColumn } from "./Components/ChartStock";
import { useState } from "react";

const App = () => {
  const [switchMap, setSwitchMap] = useState(false);
  return (
    <div id="container">
      <button
        className="btn-switch"
        onClick={() => {
          setSwitchMap((prev) => !prev);
        }}
      >{`Change view to ${!switchMap ? "Google Map" : "Mapbox"}`}</button>

      {!switchMap ? <MapBox /> : <GoogleMapApi />}
      {/* <Chart />
      <ChartStock />
      <ChartColumn /> */}

      <input type="button" id="routebtn" value="route" />
      <div id="map-canvas"></div>
    </div>
  );
};

export default App;
