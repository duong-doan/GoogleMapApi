import * as types from "./constants";

export const initState = {
  marker: {
    data: [],
    isSelected: false,
  },
  polyline: {
    data: [],
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
    //   marker
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

    //   polyline
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

    //   polygon

    case types.CLICK_POLYGON_ACTION:
      const togglePolygon = state.polygon.isSelected;
      return {
        ...state,
        polygon: {
          ...state.polygon,
          isSelected: !togglePolygon,
        },
      };

    case types.PUSH_POLYGON_ITEM:
      return {
        ...state,
        polygon: {
          ...state.polygon,
          data: [...state.polygon.data, action.payload],
        },
      };

    //   square

    case types.CLICK_SQUARE_ACTION:
      const toggleSquare = state.square.isSelected;
      return {
        ...state,
        square: {
          ...state.square,
          isSelected: !toggleSquare,
        },
      };

    case types.PUSH_SQUARE_ITEM:
      return {
        ...state,
        square: {
          ...state.square,
          data: [...state.square.data, action.payload],
        },
      };

    default:
      return state;
  }
};

export default reducerGoogleMap;
