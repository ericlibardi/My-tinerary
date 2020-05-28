import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itineraryReducer from "./itineraryReducer";
import userReducer from "./userReducer"
import commentReducer from "./commentReducer"
import replyReducer from "./replyReducer"

const rootReducer = combineReducers({cities: citiesReducer,
    itineraries: itineraryReducer,
    user: userReducer,
    comments: commentReducer,
    replies: replyReducer
});

export default rootReducer;