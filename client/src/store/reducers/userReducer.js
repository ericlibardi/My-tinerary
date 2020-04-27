import { POST_USER } from '../actions/actionTypes'

const initialState = {
    items: [],
    item: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case POST_USER:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
        }

}