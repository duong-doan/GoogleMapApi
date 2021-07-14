import * as types from "./constants";

// marker
export const clickMarkerAction = () => {
  return {
    type: types.CLICK_MARKER_ACTION,
  };
};

export const pushMarkerItemAction = (data) => {
  return {
    type: types.PUSH_MARKER_ITEM,
    payload: data,
  };
};

// polyline
export const clickPolylineAction = () => {
  return {
    type: types.CLICK_POLYLINE_ACTION,
  };
};

export const pushPolylineItemAction = (data) => {
  return {
    type: types.PUSH_POLYLINE_ITEM,
    payload: data,
  };
};

// polygon

export const clickPolygonAction = () => {
  return {
    type: types.CLICK_POLYGON_ACTION,
  };
};

export const pushPolygonItemAction = (data) => {
  return {
    type: types.PUSH_POLYGON_ITEM,
    payload: data,
  };
};

// square

export const clickSquareAction = () => {
  return {
    type: types.CLICK_SQUARE_ACTION,
  };
};

export const pushSquareItemAction = (data) => {
  return {
    type: types.PUSH_SQUARE_ITEM,
    payload: data,
  };
};
