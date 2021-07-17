import * as types from "./constants";

export const initState = {
  data: [
    {
      name: "marker",
      data: [],
      isSelected: false,
    },
    {
      name: "polyline",
      data: [],
      isSelected: false,
    },
    {
      name: "polygon",
      data: [],
      isSelected: false,
    },
    {
      name: "square",
      data: [],
      isSelected: false,
    },
  ],
  filters: {
    active: (itemArray, name) =>
      itemArray.name === name
        ? (itemArray.isSelected = !itemArray.isSelected)
        : (itemArray.isSelected = false),
  },
};

const reducerGoogleMap = (state = initState, action) => {
  switch (action.type) {
    //   marker
    case types.CLICK_MARKER_ACTION:
      const cloneDataMarker = [...state.data];
      cloneDataMarker.filter((item) => {
        state.filters.active(item, action.payload);
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
      cloneDataPolyline.filter((item) => {
        state.filters.active(item, action.payload);
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
      cloneDataPolygon.filter((item) => {
        state.filters.active(item, action.payload);
      });
      return {
        ...state,
        data: cloneDataPolygon,
      };

    case types.PUSH_POLYGON_ITEM:
      const filterDataPolygon = [...state.data];
      filterDataPolygon.filter((item) => {
        if (item.name === action.payload.name) {
          const polygonItem = {
            id: item.data.length,
            arrPolygon: action.payload.data,
          };
          item.data.push(polygonItem);
        }
      });
      console.log(filterDataPolygon);
      return {
        ...state,
        data: filterDataPolygon,
      };

    //   square
    case types.CLICK_SQUARE_ACTION:
      const cloneDataSquare = [...state.data];
      cloneDataSquare.filter((item) => {
        state.filters.active(item, action.payload);
      });
      return {
        ...state,
        data: cloneDataSquare,
      };

    case types.PUSH_SQUARE_ITEM:
      const filterDataSquare = [...state.data];
      filterDataSquare.filter((item) => {
        if (item.name === action.payload.name) {
          const SquareItem = {
            id: item.data.length,
            arrSquare: action.payload.data,
          };
          item.data.push(SquareItem);
        }
      });
      console.log("reducer", filterDataSquare);
      return {
        ...state,
        data: filterDataSquare,
      };

    default:
      return state;
  }
};

export default reducerGoogleMap;
