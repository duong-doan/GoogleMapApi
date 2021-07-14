import React from "react";
// import GoogleMapApi from "./Components/GoogleMapApi/index";
// import Chart from "./Components/Chart/index";
// import MapBox from "./Components/MapBox/index";
// import { ChartStock, ChartColumn } from "./Components/ChartStock";
// import { useState } from "react";
import GoogleMap from "./modules/GoogleMapApi/GoogleMap";

const App = () => {
  // const [switchMap, setSwitchMap] = useState(false);
  return (
    <div id="container" style={{ width: "100vw", height: "100vh" }}>
      {/* <button
        className="btn-switch"
        onClick={() => {
          setSwitchMap((prev) => !prev);
        }}
      >{`Change view to ${!switchMap ? "Google Map" : "Mapbox"}`}</button>

      {!switchMap ? <MapBox /> : } */}
      {/* <Chart />
      <ChartStock />
    <ChartColumn /> */}

      {/* <input type="button" id="routebtn" value="route" />
      <div id="map-canvas"></div> */}
      <GoogleMap />
    </div>
  );
};

export default App;
