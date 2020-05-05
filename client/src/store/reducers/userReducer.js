import { POST_USER, LOGIN_USER, GET_USER, GET_GOOGLEUSER } from '../actions/actionTypes'

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
        case LOGIN_USER:
            return {
                ...state,
                items: action.payload
            };
        case GET_GOOGLEUSER:
            return {
                ...state,
                items: action.payload
            }
        case GET_USER:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
        }

}