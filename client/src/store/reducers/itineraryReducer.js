import { FETCH_ITINERARIES } from '../actions/actionTypes'

const initialState = {
    items: [],
    item: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_ITINERARIES:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
        }

}