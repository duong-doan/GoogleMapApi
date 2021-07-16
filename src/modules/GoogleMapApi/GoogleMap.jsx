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
      const coordinates = { lat: 25.774, lng: -80.19 };
      const [center, setCenter] = useState(coordinates);
      const [isShowDel, setIsShowDel] = useState(false);

      const [dataMarker, setDataMarker] = useState(getDataMarker);
      const [isSelectedMarker, setIsSelectedMarker] = useState(
        getMarker.isSelected,
      );

      const [dataPolyline, setDataPolyline] = useState(getDataPolyline);
      const [isSelectedPolyline, setIsSelectedPolyline] = useState(
        getPolyline.isSelected,
      );

      const [dataPolygon, setDataPolygon] = useState(getPolygon.data);
      const [isSelectedPolygon, setIsSelectedPolygon] = useState(
        getPolygon.isSelected,
      );

      const [dataSquare, setDataSquare] = useState(getSquare.data);
      const [isSelectedSquare, setIsSelectedSquare] = useState(
        getSquare.isSelected,
      );
      console.log(dataPolygon);

      //------ select shape and switch shape----
      let drawingManager = new window.google.maps.drawing.DrawingManager();
      let selectedShape;
      const setSelection = (shape) => {
        clearSelection();
        selectedShape = shape;
        if (selectedShape) {
          setIsShowDel(true);
        }
        shape.setOptions({
          fillColor: "#7a3a4d",
          draggable: true,
          editable: true,
        });
      };
      const clearSelection = () => {
        if (selectedShape) {
          selectedShape.setOptions({
            editable: false,
            draggable: false,
            fillColor: "#333",
          });
          selectedShape = null;
        }
      };
      // --------------------------------------------------------------

      //--------- update status switch button------
      useEffect(() => {
        setIsSelectedMarker(getMarker.isSelected);
        setIsSelectedPolyline(getPolyline.isSelected);
        setIsSelectedPolygon(getPolygon.isSelected);
        setIsSelectedSquare(getSquare.isSelected);
      }, [
        getMarker.isSelected,
        getPolyline.isSelected,
        getPolygon.isSelected,
        getSquare.isSelected,
      ]);
      // ----------------------------------------------------------------

      // -------click mouse choose positions in google map-----
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
      };
      // ----------------------------------------------------------------

      // ------------click single button-----------------
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

      const handleClickBtnSquare = () => {
        dispatch(clickSquareAction("square"));
        setIsSelectedSquare(getSquare.isSelected);
      };
      // -----------------------------------------------------------------

      //------------update button polygon using tool draw in gg map---------
      useEffect(() => {
        window.google.maps.event.addDomListener(
          document.querySelector(".btn-polygon"),
          "click",
          () => {
            if (!isSelectedPolygon) {
              drawingManager.setOptions({
                drawingControlOptions: {
                  position: window.google.maps.ControlPosition.TOP_CENTER,
                  drawingModes: [
                    window.google.maps.drawing.OverlayType.POLYGON,
                  ],
                },
              });
              drawingManager.setDrawingMode(
                window.google.maps.drawing.OverlayType.POLYGON,
              );
              drawingManager.setOptions({
                drawingControl: false,
              });
              drawingManager.setMap(
                mapRef.current.context
                  .__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
              );

              // function implement when after drawing complete
              window.google.maps.event.addListener(
                drawingManager,
                "overlaycomplete",
                function (event) {
                  if (event.type === "polygon") {
                    // get coordinate and dispatch
                    drawingManager.setMap(null);
                    drawingManager.setDrawingMode(null);

                    const coordinatesPolygonItem = event.overlay
                      .getPath()
                      .getArray();

                    dispatch(
                      pushPolygonItemAction("polygon", coordinatesPolygonItem),
                    );
                    if (coordinatesPolygonItem) {
                      const polygonItem = {
                        id: dataPolygon.length,
                        arrPolygon: coordinatesPolygonItem,
                      };
                      setDataPolygon((prevState) => [
                        ...prevState,
                        polygonItem,
                      ]);
                      console.log("view", dataPolygon);
                    }

                    // make a new shape
                    var newShape = event.overlay;
                    newShape.type = event.type;
                    newShape.setMap(null);
                    new window.google.maps.event.addListener(
                      newShape,
                      "click",
                      () => {
                        setSelection(newShape);
                      },
                    );
                  }
                },
              );
            }
          },
        );

        // --------------click button delete shape---------------
        // window.google.maps.event.addDomListener(
        //   document.querySelector(".delete-button"),
        //   "click",
        //   () => {
        //     if (selectedShape) {
        //       selectedShape.setMap(null);
        //     }
        //   },
        // );
      }, []);

      // -------------update button square using tool draw in gg map-------
      useEffect(() => {
        window.google.maps.event.addDomListener(
          document.querySelector(".btn-square"),
          "click",
          () => {
            if (!isSelectedSquare) {
              drawingManager.setOptions({
                drawingControlOptions: {
                  position: window.google.maps.ControlPosition.TOP_CENTER,
                  drawingModes: [
                    window.google.maps.drawing.OverlayType.RECTANGLE,
                  ],
                },
              });
              drawingManager.setDrawingMode(
                window.google.maps.drawing.OverlayType.RECTANGLE,
              );
              drawingManager.setOptions({
                drawingControl: false,
              });
              drawingManager.setMap(
                mapRef.current.context
                  .__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
              );

              window.google.maps.event.addListener(
                drawingManager,
                "overlaycomplete",
                function (event) {
                  if (event.type === "rectangle") {
                    drawingManager.setMap(null);
                    drawingManager.setDrawingMode(null);
                    var newShape = event.overlay;
                    newShape.type = event.type;
                    newShape.setMap(null);

                    const SW = event.overlay.getBounds().getSouthWest();
                    const NE = event.overlay.getBounds().getNorthEast();
                    const pointSW = {
                      lat: SW.lat(),
                      lng: SW.lng(),
                    };
                    const pointNE = {
                      lat: NE.lat(),
                      lng: NE.lng(),
                    };
                    const getPointSE = new window.google.maps.LatLng(
                      SW.lat(),
                      NE.lng(),
                    );
                    const pointSE = {
                      lat: getPointSE.lat(),
                      lng: getPointSE.lng(),
                    };
                    const getPointNW = new window.google.maps.LatLng(
                      NE.lat(),
                      SW.lng(),
                    );
                    const pointNW = {
                      lat: getPointNW.lat(),
                      lng: getPointNW.lng(),
                    };
                    const coordinatesShape = [
                      pointNW,
                      pointSW,
                      pointSE,
                      pointNE,
                    ];
                    dispatch(pushSquareItemAction("square", coordinatesShape));
                    const squareItem = {
                      id: dataSquare.length,
                      arrSquare: coordinatesShape,
                    };
                    setDataSquare((prevState) => [...prevState, squareItem]);
                    new window.google.maps.event.addListener(
                      newShape,
                      "click",
                      () => {
                        setSelection(newShape);
                      },
                    );
                  }
                },
              );
            }
          },
        );

        // --------------click button delete shape---------------
        // window.google.maps.event.addDomListener(
        //   document.querySelector(".delete-button"),
        //   "click",
        //   () => {
        //     if (selectedShape) {
        //       selectedShape.setMap(null);
        //     }
        //   },
        // );
      }, []);
      // --------------------------------------------------------

      //----------- switch button drawing gg map---------
      useEffect(() => {
        const handleClickBtnNotUseTools = (classEl) => {
          return window.google.maps.event.addDomListener(
            document.querySelector(`.${classEl}`),
            "click",
            () => {
              drawingManager.setMap(null);
            },
          );
        };

        const handleClickBtnNotCheck = (classEl, data) => {
          return window.google.maps.event.addDomListener(
            document.querySelector(`.${classEl}`),
            "click",
            () => {
              if (data.isSelected) {
                drawingManager.setMap(null);
                drawingManager.setDrawingMode(null);
              }
            },
          );
        };

        handleClickBtnNotUseTools("btn-marker");
        handleClickBtnNotUseTools("btn-polyline");
        handleClickBtnNotCheck("btn-polygon", getPolygon);
        handleClickBtnNotCheck("btn-square", getSquare);
        handleClickBtnNotCheck("btn-marker", getMarker);
        handleClickBtnNotCheck("btn-polyline", getDataPolyline);
      });
      // --------------------------------------------------------

      return (
        <GoogleMap
          defaultCenter={coordinates}
          center={center}
          defaultZoom={10}
          ref={mapRef}
          onClick={handleClickMap}
        >
          {/* ------------------button marker------------------ */}
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

          {/* ------------------button polyline--------------------- */}
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

          {/* ------------------button polygon--------------------- */}
          <button
            onClick={handleClickBtnPolygon}
            className={`btn-polygon ${isSelectedPolygon ? "active" : ""}`}
          >
            <img
              src="https://cdn0.iconfinder.com/data/icons/mobile-development-icons/256/Hatch_polygon.png"
              alt="polygon"
            />
          </button>
          {isSelectedPolygon
            ? dataPolygon.map((polygon) => {
                return (
                  <Polygon
                    id={polygon.id}
                    path={polygon.arrPolygon}
                    options={{
                      strokeColor: "#FF0000",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: "#46c097fd",
                      fillOpacity: 0.35,
                      editable: true,
                      draggable: true,
                    }}
                  />
                );
              })
            : null}

          {/* ------------------button box--------------------- */}
          <button
            onClick={handleClickBtnSquare}
            className={`btn-square ${isSelectedSquare ? "active" : ""}`}
          >
            <i className="fas fa-vector-square"></i>
          </button>

          {isSelectedSquare && dataSquare.length !== 0
            ? dataSquare.map((square) => (
                <Polygon
                  id={square.id}
                  path={square.arrSquare}
                  options={{
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#46c097fd",
                    fillOpacity: 0.35,
                    editable: true,
                    draggable: true,
                  }}
                />
              ))
            : null}

          {/* ------------------button delete--------------------- */}
          {/* <button className={`delete-button ${isShowDel ? "" : "hidden"}`}>
            Delete Shape
          </button> */}
        </GoogleMap>
      );
    }),
  ),
);

const Map = () => {
  return (
    <GoogleMapWrap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: "100%" }} />}
      containerElement={<div style={{ height: "100%" }} />}
      mapElement={<div style={{ height: "100%" }} />}
    />
  );
};

export default Map;
