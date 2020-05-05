import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itineraryReducer from "./itineraryReducer";
import userReducer from "./userReducer"
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({cities: citiesReducer,
    itineraries: itineraryReducer,
    user: userReducer,
    login: loginReducer
});

export default rootReducer;