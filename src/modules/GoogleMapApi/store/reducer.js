import * as types from "./constants";

export const initState = {
  marker: {
    data: [],
    isSelected: false,
  },
  polyline: {
    data: [
      { lat: -25, lng: 131 },
      { lat: -25, lng: 130 },
      { lat: -25, lng: 130 },
      { lat: -24, lng: 130 },
    ],
    isSelected: false,
  },
  polygon: {
    data: [],
    isSelected: false,
  },
  square: {
    data: [],
    isSelected: false,
  },
};

const reducerGoogleMap = (state = initState, action) => {
  switch (action.type) {
    case types.CLICK_MARKER_ACTION:
      const toggleMarker = state.marker.isSelected;
      return {
        ...state,
        marker: {
          ...state.marker,
          isSelected: !toggleMarker,
        },
      };

    case types.PUSH_MARKER_ITEM:
      return {
        ...state,
        marker: {
          ...state.marker,
          data: [...state.marker.data, action.payload],
        },
      };

    case types.CLICK_POLYLINE_ACTION:
      const togglePolyline = state.polyline.isSelected;
      return {
        ...state,
        polyline: {
          ...state.polyline,
          isSelected: !togglePolyline,
        },
      };

    case types.PUSH_POLYLINE_ITEM:
      return {
        ...state,
        polyline: {
          ...state.polyline,
          data: [...state.polyline.data, action.payload],
        },
      };

    default:
      return state;
  }
};

export default reducerGoogleMap;
