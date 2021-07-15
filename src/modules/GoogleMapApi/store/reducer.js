import * as types from "./constants";

export const initState = {
  data: [
    { name: "marker", data: [], isSelected: false },
    { name: "polyline", data: [], isSelected: false },
    { name: "polygon", data: [], isSelected: false },
    { name: "square", data: [], isSelected: false },
  ],
};

const reducerGoogleMap = (state = initState, action) => {
  switch (action.type) {
    //   marker
    case types.CLICK_MARKER_ACTION:
      const cloneDataMarker = [...state.data];
      cloneDataMarker.filter((type) => {
        const toggle = type.isSelected;
        if (type.name === action.payload) {
          type.isSelected = !toggle;
        } else {
          type.isSelected = false;
        }
      });

      return {
        ...state,
        data: cloneDataMarker,
      };

    case types.PUSH_MARKER_ITEM:
      const filterDataMarker = [...state.data];
      filterDataMarker.filter((item) => {
        if (item.name === action.payload.name) {
          item.data.push(action.payload.data);
        }
      });
      return {
        ...state,
        data: filterDataMarker,
      };

    //   polyline
    case types.CLICK_POLYLINE_ACTION:
      const cloneDataPolyline = [...state.data];
      cloneDataPolyline.filter((type) => {
        const toggle = type.isSelected;
        if (type.name === action.payload) {
          type.isSelected = !toggle;
        } else {
          type.isSelected = false;
        }
      });
      return {
        ...state,
        data: cloneDataPolyline,
      };

    case types.PUSH_POLYLINE_ITEM:
      const filterDataPolyline = [...state.data];
      filterDataPolyline.filter((item) => {
        if (item.name === action.payload.name) {
          item.data.push(action.payload.data);
        }
      });
      return {
        ...state,
        data: filterDataPolyline,
      };

    //   polygon

    case types.CLICK_POLYGON_ACTION:
      const cloneDataPolygon = [...state.data];
      cloneDataPolygon.filter((type) => {
        const toggle = type.isSelected;
        if (type.name === action.payload) {
          type.isSelected = !toggle;
        } else {
          type.isSelected = false;
        }
      });
      return {
        ...state,
        data: cloneDataPolygon,
      };

    case types.PUSH_POLYGON_ITEM:
      const filterDataPolygon = [...state.data];
      const itemPolygon = {
        id: state.data[2].data.length,
        arrPolygon: action.payload.data,
      };
      const dataItemPolygon = filterDataPolygon.find(
        (item) => item.name === action.payload.name,
      );
      dataItemPolygon.data.push(itemPolygon);
      return {
        ...state,
        data: filterDataPolygon,
      };

    //   square
    case types.CLICK_SQUARE_ACTION:
      const toggleSquare = !state.square.isSelected;
      return {
        ...state,
        square: {
          ...state.square,
          isSelected: toggleSquare,
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
