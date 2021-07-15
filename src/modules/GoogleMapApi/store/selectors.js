import { createSelector } from "reselect";
import { get } from "lodash";
import { initState } from "./reducer";

const selectGoogleMap = (state) => get(state, "googleMap") || initState;

const makeGetMarker = () =>
  createSelector(selectGoogleMap, (selectGoogleMap) =>
    selectGoogleMap.data.find((item) => item.name === "marker"),
  );

const makeGetPolyline = () =>
  createSelector(selectGoogleMap, (selectGoogleMap) =>
    selectGoogleMap.data.find((item) => item.name === "polyline"),
  );

const makeGetPolygon = () =>
  createSelector(selectGoogleMap, (selectGoogleMap) =>
    selectGoogleMap.data.find((item) => item.name === "polygon"),
  );

const makeGetSquare = () =>
  createSelector(selectGoogleMap, (selectGoogleMap) =>
    selectGoogleMap.data.find((item) => item.name === "square"),
  );

export { makeGetMarker, makeGetPolyline, makeGetPolygon, makeGetSquare };
