import { FETCH_CITIES } from '../actions/actionTypes'

const initialState = {
    items: [],
    item: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_CITIES:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
}