import { combineReducers } from "redux";
import reducerGoogleMap from "../modules/GoogleMapApi/store/reducer";

const rootReducer = combineReducers({
  googleMap: reducerGoogleMap,
});

export default rootReducer;
