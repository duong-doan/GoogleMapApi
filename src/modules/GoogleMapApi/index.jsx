import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Polyline,
  Polygon,
  DirectionsRenderer,
} from "@react-google-maps/api";
import SearchPlace from "../../Components/SearchPlace";
import * as data from "../../data.json";

const REACT_APP_GOOGLE_MAPS_API_KEY = "AIzaSyDG6pKMMvNJ2jumRlHiU-n_x14RERkfKrQ";

const GoogleMapApi = () => {
  const libraries = ["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [dataMarker, setDataMarker] = useState(data.default.features);
  const [center, setCenter] = useState({
    lat: 45,
    lng: -75,
  });
  const [selectMaker, setSelectMaker] = useState(null);
  const [directions, setDirections] = useState(null);
  const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
  };

  let directionsService;
  let destination = { lat: 41.756795, lng: -78.954298 };

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    directionsService = new window.google.maps.DirectionsService();
    changeDirection(center, destination);
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

  const changeDirection = (origin, destination) => {
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          //changing the state of directions to the result of direction service
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      },
    );
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
          mapTypeId="satellite"
        >
          <button
            className="btn-location"
            onClick={handleClickFindLocation}
            style={{ position: "relative" }}
          >
            <i className="fas fa-search-location"></i>
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
              position={{
                lat: selectMaker.geometry.coordinates[1] + 0.01,
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

          <SearchPlace />

          {directions !== null && (
            <DirectionsRenderer directions={directions} />
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
