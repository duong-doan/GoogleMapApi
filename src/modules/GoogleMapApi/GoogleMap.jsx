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

const REACT_APP_GOOGLE_MAPS_API_KEY = "AIzaSyDG6pKMMvNJ2jumRlHiU-n_x14RERkfKrQ";

const mapStateToProps = createStructuredSelector({
  getMarker: makeGetMarker(),
  getPolyline: makeGetPolyline(),
  getPolygon: makeGetPolygon(),
  getSquare: makeGetSquare(),
});

const GoogleMapWrap = connect(
  mapStateToProps,
  null,
)(
  withScriptjs(
    withGoogleMap((props) => {
      const dispatch = useDispatch();
      const { getMarker, getPolyline, getPolygon, getSquare } = props;
      const { data: getDataMarker } = getMarker;
      const { data: getDataPolyline } = getPolyline;
      const { data: getDataPolygon } = getPolygon;

      const mapRef = useRef();
      const polylineRef = useRef();
      const polygonRef = useRef();
      const coordinates = { lat: 25.774, lng: -80.19 };
      const [center, setCenter] = useState(coordinates);
      const [dataMarker, setDataMarker] = useState(getDataMarker);
      const [isSelectedMarker, setIsSelectedMarker] = useState(
        getMarker.isSelected,
      );

      const [dataPolyline, setDataPolyline] = useState(getDataPolyline);
      const [isSelectedPolyline, setIsSelectedPolyline] = useState(
        getPolyline.isSelected,
      );

      const [dataPolygon, setDataPolygon] = useState(getDataPolygon);
      const [isSelectedPolygon, setIsSelectedPolygon] = useState(
        getPolygon.isSelected,
      );

      useEffect(() => {
        if (
          getMarker.isSelected ||
          getPolyline.isSelected ||
          getPolygon.isSelected
        ) {
          setIsSelectedMarker(getMarker.isSelected);
          setIsSelectedPolyline(getPolyline.isSelected);
          setIsSelectedPolygon(getPolygon.isSelected);
        }
      }, [getMarker.isSelected, getPolyline.isSelected, getPolygon.isSelected]);

      const handleClickMap = (event) => {
        if (isSelectedMarker) {
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
          dispatch(pushMarkerItemAction("marker", markerItem));
          setDataMarker((prevState) => [...prevState, markerItem]);
        }

        if (isSelectedPolyline) {
          const polylineItem = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
          dispatch(pushPolylineItemAction("polyline", polylineItem));
          setDataPolyline((prevState) => [...prevState, polylineItem]);
          polylineRef.current.getPath().push(event.latLng);
        }

        if (isSelectedPolygon) {
          polygonRef.current.getPath().push(event.latLng);
          console.log(polygonRef.current.getPath());
          window.addEventListener("dblclick", () => {
            const arrayItemPolygon = polygonRef.current.getPath().getArray();
            dispatch(pushPolygonItemAction("polygon", arrayItemPolygon));
          });
          // setDataPolyline((prevState) => [...prevState, itemPolygon]);
        }
      };

      const handleClickBtnMarker = () => {
        dispatch(clickMarkerAction("marker"));
        setIsSelectedMarker(getMarker.isSelected);
      };

      const handleClickBtnPolyline = () => {
        dispatch(clickPolylineAction("polyline"));
        setIsSelectedPolyline(getPolyline.isSelected);
      };

      const handleClickBtnPolygon = () => {
        dispatch(clickPolygonAction("polygon"));
        setIsSelectedPolygon(getPolygon.isSelected);
      };

      // const handleClickBtnSquare = () => {
      //   dispatch(clickSquareAction());
      //   if (!getIsSelectedSquare) {
      //     const drawingManager = new window.google.maps.drawing.DrawingManager({
      //       drawingControlOptions: {
      //         position: window.google.maps.ControlPosition.TOP_CENTER,
      //         drawingModes: [window.google.maps.drawing.OverlayType.RECTANGLE],
      //       },
      //     });

      //     drawingManager.setMap(
      //       mapRef.current.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
      //     );

      //     new window.google.maps.event.addListener(
      //       drawingManager,
      //       "overlaycomplete",
      //       function (event) {
      //         event.overlay.set("editable", true);
      //         event.overlay.set("draggable", true);
      //         event.overlay
      //           .getPath()
      //           .getArray()
      //           .map((position) => {
      //             console.log(position);
      //           });
      //       },
      //     );
      //   }
      // };

      return (
        <GoogleMap
          defaultCenter={coordinates}
          center={center}
          defaultZoom={10}
          ref={mapRef}
          onClick={handleClickMap}
        >
          <button
            className={`btn-marker ${isSelectedMarker ? "active" : ""}`}
            onClick={handleClickBtnMarker}
          >
            <i className="fas fa-map-marker"></i>
          </button>

          {isSelectedMarker && dataMarker.length !== 0
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
            className={`btn-polyline ${isSelectedPolyline ? "active" : ""}`}
            onClick={handleClickBtnPolyline}
          >
            <img
              src="https://img.icons8.com/ios/452/polyline.png"
              alt="polyline"
            />
          </button>
          {isSelectedPolyline ? (
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
            className={`btn-polygon ${isSelectedPolygon ? "active" : ""}`}
          >
            <img
              src="https://cdn0.iconfinder.com/data/icons/mobile-development-icons/256/Hatch_polygon.png"
              alt="polygon"
            />
          </button>

          {isSelectedPolygon ? (
            <Polygon
              ref={polygonRef}
              // path={getDataPolygon}
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

          {/* button square
        <button
          onClick={handleClickBtnSquare}
          className={`btn-square ${getIsSelectedSquare ? "active" : ""}`}
        >
          <i className="fas fa-vector-square"></i>
        </button>
        <button id="CoordsButton">Coordinates</button> */}
        </GoogleMap>
      );
    }),
  ),
);

const Map = (props) => {
  // const { getMarker, getPolyline, getPolygon, getSquare } = props;
  // useEffect(() => {}, [getMarker, getPolyline]);
  return (
    <GoogleMapWrap
      // getPolygon={getPolygon}
      // getMarker={getMarker}
      // getPolyline={getPolyline}
      // getSquare={getSquare}
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: "100%" }} />}
      containerElement={<div style={{ height: "100%" }} />}
      mapElement={<div style={{ height: "100%" }} />}
    />
  );
};

export default Map;
