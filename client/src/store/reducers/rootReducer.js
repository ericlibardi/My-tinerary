import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itineraryReducer from "./itineraryReducer";
import userReducer from "./userReducer"
import commentReducer from "./commentReducer"

const rootReducer = combineReducers({cities: citiesReducer,
    itineraries: itineraryReducer,
    user: userReducer,
    comments: commentReducer
});

export default rootReducer;