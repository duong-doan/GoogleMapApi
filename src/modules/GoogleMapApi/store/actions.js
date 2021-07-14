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
