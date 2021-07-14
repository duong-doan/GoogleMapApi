import { createSelector } from "reselect";
import { get } from "lodash";
import { initState } from "./reducer";

const selectGoogleMap = (state) => get(state, "googleMap") || initState;

const makeGetMarker = () =>
  createSelector(selectGoogleMap, (selectGoogleMap) =>
    get(selectGoogleMap, "marker"),
  );

const makeGetPolyline = () =>
  createSelector(selectGoogleMap, (selectGoogleMap) =>
    get(selectGoogleMap, "polyline"),
  );

export { makeGetMarker, makeGetPolyline };
