import React, { useEffect, useRef, useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
} from "react-google-maps";
import { connect, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeGetMarker, makeGetPolyline } from "./store/selectors";
import {
  clickMarkerAction,
  pushMarkerItemAction,
  clickPolylineAction,
  pushPolylineItemAction,
} from "./store/actions";
import { useCallback } from "react";

const REACT_APP_GOOGLE_MAPS_API_KEY = "AIzaSyDG6pKMMvNJ2jumRlHiU-n_x14RERkfKrQ";

const GoogleMapWrap = withScriptjs(
  withGoogleMap((props) => {
    const dispatch = useDispatch();
    const { getMarker, getPolyline } = props;
    const { data: getDataMarker, isSelected: getIsSelectedMarker } = getMarker;
    const { data: getDataPolyline, isSelected: getIsSelectedPolyline } =
      getPolyline;
    const polylineRef = useRef();
    const mapRef = useRef();
    const coordinates = { lat: -25, lng: 131 };
    const [center, setCenter] = useState(coordinates);
    const [dataMarker, setDataMarker] = useState(getDataMarker);
    const [dataPolyline, setDataPolyline] = useState(getDataPolyline);

    const handleClickMap = (event) => {
      if (getIsSelectedMarker) {
        setCenter({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        });
        const markerItem = {
          position: {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          },
        };
        dispatch(pushMarkerItemAction(markerItem));
        setDataMarker((prevState) => [...prevState, markerItem]);
      }

      if (getIsSelectedPolyline) {
        const polylineItem = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        dispatch(pushPolylineItemAction(polylineItem));
        setDataPolyline((prevState) => [...prevState, polylineItem]);
        polylineRef.current.getPath().push(event.latLng);
      }
    };

    const handleClickBtnMarker = () => {
      dispatch(clickMarkerAction());
    };

    const handleClickBtnPolyline = () => {
      dispatch(clickPolylineAction());
    };

    return (
      <GoogleMap
        defaultCenter={coordinates}
        center={center}
        defaultZoom={10}
        ref={mapRef}
        onClick={handleClickMap}
      >
        {/* button marker */}
        <button
          className={`btn-marker ${getIsSelectedMarker ? "active" : ""}`}
          onClick={handleClickBtnMarker}
        >
          <i className="fas fa-map-marker"></i>
        </button>
        {getIsSelectedMarker || dataMarker.length === 0
          ? dataMarker.map((marker) => <Marker position={marker.position} />)
          : null}

        {/* button polyline */}
        <button
          className={`btn-polyline ${getIsSelectedPolyline ? "active" : ""}`}
          onClick={handleClickBtnPolyline}
        >
          <img
            src="https://img.icons8.com/ios/452/polyline.png"
            alt="polyline"
          />
        </button>
        {getIsSelectedPolyline ? (
          <Polyline
            ref={polylineRef}
            path={dataPolyline}
            options={{
              strokeColor: "red",
              strokeOpacity: 1,
              strokeWeight: 5,
              draggable: true,
            }}
          />
        ) : null}
      </GoogleMap>
    );
  }),
);

const Map = (props) => {
  const { getMarker, getPolyline } = props;
  return (
    <GoogleMapWrap
      getMarker={getMarker}
      getPolyline={getPolyline}
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: "100%" }} />}
      containerElement={<div style={{ height: "100%" }} />}
      mapElement={<div style={{ height: "100%" }} />}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  getMarker: makeGetMarker(),
  getPolyline: makeGetPolyline(),
});

export default connect(mapStateToProps, null)(Map);
