import * as types from "./constants";

// marker
export const clickMarkerAction = (name) => {
  return {
    type: types.CLICK_MARKER_ACTION,
    payload: name,
  };
};

export const pushMarkerItemAction = (name, data) => {
  return {
    type: types.PUSH_MARKER_ITEM,
    payload: {
      name,
      data,
    },
  };
};

// polyline
export const clickPolylineAction = (name) => {
  return {
    type: types.CLICK_POLYLINE_ACTION,
    payload: name,
  };
};

export const pushPolylineItemAction = (name, data) => {
  return {
    type: types.PUSH_POLYLINE_ITEM,
    payload: { name, data },
  };
};

// polygon

export const clickPolygonAction = (name) => {
  return {
    type: types.CLICK_POLYGON_ACTION,
    payload: name,
  };
};

export const pushPolygonItemAction = (name, data) => {
  return {
    type: types.PUSH_POLYGON_ITEM,
    payload: { name, data },
  };
};

// square

export const clickSquareAction = (name) => {
  return {
    type: types.CLICK_SQUARE_ACTION,
    payload: name,
  };
};

export const pushSquareItemAction = (name, data) => {
  return {
    type: types.PUSH_SQUARE_ITEM,
    payload: { name, data },
  };
};
