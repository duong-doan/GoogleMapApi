import React, { useRef, useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
  Polygon,
} from "react-google-maps";
import { connect, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  makeGetMarker,
  makeGetPolyline,
  makeGetPolygon,
  makeGetSquare,
} from "./store/selectors";
import {
  clickMarkerAction,
  pushMarkerItemAction,
  clickPolylineAction,
  pushPolylineItemAction,
  clickPolygonAction,
  pushPolygonItemAction,
  clickSquareAction,
  pushSquareItemAction,
} from "./store/actions";
import { useEffect } from "react";
import { configure } from "@testing-library/react";

const REACT_APP_GOOGLE_MAPS_API_KEY = "AIzaSyDG6pKMMvNJ2jumRlHiU-n_x14RERkfKrQ";

const GoogleMapWrap = withScriptjs(
  withGoogleMap((props) => {
    const dispatch = useDispatch();
    const { getMarker, getPolyline, getPolygon, getSquare } = props;
    const { data: getDataMarker, isSelected: getIsSelectedMarker } = getMarker;
    const { data: getDataPolyline, isSelected: getIsSelectedPolyline } =
      getPolyline;
    const { data: getDataPolygon, isSelected: getIsSelectedPolygon } =
      getPolygon;
    const { data: getDataSquare, isSelected: getIsSelectedSquare } = getSquare;
    const mapRef = useRef();
    const polylineRef = useRef();
    const polygonRef = useRef();
    const coordinates = { lat: 25.774, lng: -80.19 };
    const [center, setCenter] = useState(coordinates);
    const [dataMarker, setDataMarker] = useState(getDataMarker);
    const [dataPolyline, setDataPolyline] = useState(getDataPolyline);
    const [dataPolygon, setDataPolygon] = useState(getDataPolygon);

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

      if (getIsSelectedPolygon) {
        const point = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        dispatch(pushPolygonItemAction(point));
        setDataPolygon((prevState) => [...prevState, point]);
        polygonRef.current.getPath().push(event.latLng);

        // new window.google.maps.drawing.DrawingManager({
        //   drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
        //   drawingControl: true,
        //   drawingControlOptions: {
        //     position: window.google.maps.ControlPosition.TOP_CENTER,
        //     drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
        //   },
        //   polygonOptions: {
        //     editable: true,
        //     draggable: true,
        //   },
        // }).setMap(
        //   mapRef.current.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
        // );
      }
    };

    const handleClickBtnMarker = () => {
      dispatch(clickMarkerAction());
    };

    const handleClickBtnPolyline = () => {
      dispatch(clickPolylineAction());
    };

    const handleClickBtnPolygon = () => {
      dispatch(clickPolygonAction());
    };

    const handleClickBtnSquare = () => {
      dispatch(clickSquareAction());
      const drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [window.google.maps.drawing.OverlayType.RECTANGLE],
        },
      });

      drawingManager.setMap(
        mapRef.current.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
      );

      new window.google.maps.event.addListener(
        drawingManager,
        "overlaycomplete",
        function (event) {
          event.overlay.set("editable", true);
          event.overlay.set("draggable", true);
          console.log(event.overlay);
        },
      );
    };

    return (
      <GoogleMap
        defaultCenter={coordinates}
        center={center}
        defaultZoom={10}
        ref={mapRef}
        onClick={handleClickMap}
      >
        <button
          className={`btn-marker ${getIsSelectedMarker ? "active" : ""}`}
          onClick={handleClickBtnMarker}
        >
          <i className="fas fa-map-marker"></i>
        </button>
        {getIsSelectedMarker || dataMarker.length === 0
          ? dataMarker.map((marker) => (
              <Marker
                position={marker.position}
                options={{
                  draggable: true,
                }}
              />
            ))
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
              editable: true,
            }}
          />
        ) : null}

        {/* button polygon */}
        <button
          onClick={handleClickBtnPolygon}
          className={`btn-polygon ${getIsSelectedPolygon ? "active" : ""}`}
        >
          <img
            src="https://cdn0.iconfinder.com/data/icons/mobile-development-icons/256/Hatch_polygon.png"
            alt="polygon"
          />
        </button>
        {getIsSelectedPolygon ? (
          <Polygon
            ref={polygonRef}
            path={dataPolygon}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
              editable: true,
              draggable: true,
            }}
          />
        ) : null}

        {/* button square */}
        <button
          onClick={handleClickBtnSquare}
          className={`btn-square ${getIsSelectedSquare ? "active" : ""}`}
        >
          <i className="fas fa-vector-square"></i>
        </button>
      </GoogleMap>
    );
  }),
);

const Map = (props) => {
  const { getMarker, getPolyline, getPolygon, getSquare } = props;
  return (
    <GoogleMapWrap
      getPolygon={getPolygon}
      getMarker={getMarker}
      getPolyline={getPolyline}
      getSquare={getSquare}
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
  getPolygon: makeGetPolygon(),
  getSquare: makeGetSquare(),
});

export default connect(mapStateToProps, null)(Map);
