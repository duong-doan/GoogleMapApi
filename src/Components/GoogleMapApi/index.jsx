import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Polyline,
  Polygon,
} from "@react-google-maps/api";
import * as data from "../../data.json";

const REACT_APP_GOOGLE_MAPS_API_KEY = "AIzaSyDYMKCueUCarUM-lUfGqurruHvSz_3QkyM";

const GoogleMapApi = () => {
  const [dataMarker, setDataMarker] = useState(data.default.features);
  const [center, setCenter] = useState({
    lat: 45,
    lng: -75,
  });
  const [selectMaker, setSelectMaker] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const mapRef = useRef();
  const markerRef = useRef();
  const infoWindowRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleClickMap = (e) => {
    const markerItem = {
      properties: {
        PARK_ID: new Date(),
      },
      geometry: {
        type: "Point",
        coordinates: [e.latLng.lng(), e.latLng.lat()],
      },
    };
    setDataMarker((prevState) => [...prevState, markerItem]);
  };

  const handleClickMaker = (park) => {
    setSelectMaker(park);
    setCenter({
      lat: park.geometry.coordinates[1],
      lng: park.geometry.coordinates[0],
    });
    mapRef.current.setZoom(10);
    mapRef.current.panTo({
      lat: park.geometry.coordinates[1],
      lng: park.geometry.coordinates[0],
    });
  };

  const handleClickFindLocation = () => {
    const infoWin = new window.google.maps.InfoWindow();
    window.navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos);
      const positionLocation = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      setCenter(positionLocation);
      infoWin.setPosition(positionLocation);
      infoWin.setContent("your location");
      infoWin.open(mapRef.current);
      new window.google.maps.Marker({
        position: positionLocation,
        map: mapRef.current,
      });
    });
  };

  useEffect(() => {
    const escapeKey = (e) => {
      if (e.key === "Escape") {
        selectMaker(null);
      }
      window.addEventListener("keydown", escapeKey);

      return () => {
        window.removeEventListener("keydown", escapeKey);
      };
    };
  }, []);

  return (
    <div>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          onLoad={onMapLoad}
          onClick={handleClickMap}
          ref={mapRef.current}
        >
          <button
            className="btn-location"
            onClick={handleClickFindLocation}
            style={{ position: "relative" }}
          >
            Find location
          </button>
          {dataMarker.map((park) => (
            <Marker
              key={park.properties.PARK_ID}
              position={{
                lat: park.geometry.coordinates[1],
                lng: park.geometry.coordinates[0],
              }}
              onClick={() => handleClickMaker(park)}
            />
          ))}
          {selectMaker && (
            <InfoWindow
              ref={infoWindowRef}
              position={{
                lat: selectMaker.geometry.coordinates[1],
                lng: selectMaker.geometry.coordinates[0],
              }}
              onCloseClick={() => {
                setSelectMaker(null);
              }}
            >
              <div>
                <h1>{`lat: ${selectMaker.geometry.coordinates[1]}`}</h1>
                <h1>{`lng: ${selectMaker.geometry.coordinates[0]}`}</h1>
              </div>
            </InfoWindow>
          )}

          <Polyline
            path={[
              { lat: 45, lng: -75 },
              { lat: 45, lng: -80 },
            ]}
            options={{
              strokeColor: "red",
              strokeOpacity: 1,
              strokeWeight: 5,
              icons: [
                {
                  icon: {
                    path: 2,
                  },
                  offset: "0",
                },
                {
                  icon: {
                    path: 1,
                  },
                  offset: "100%",
                },
              ],
              draggable: true,
              geodesic: true,
            }}
          />

          <Polygon
            mapRef
            path={[
              { lat: 42, lng: -100.19 },
              { lat: 48, lng: -66.118 },
              { lat: 70, lng: -90.757 },
              { lat: 52, lng: -150.757 },
            ]}
            options={{
              strokeColor: "#000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
              draggable: true,
              geodesic: true,
            }}
          />

          <Polygon
            mapRef
            path={[
              { lat: 16, lng: 108 },
              { lat: 47, lng: 110 },
              { lat: 52, lng: 30 },
            ]}
            options={{
              strokeColor: "#000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
              draggable: true,
              geodesic: false,
            }}
          />
        </GoogleMap>
      )}
    </div>
  );
};

export default GoogleMapApi;
