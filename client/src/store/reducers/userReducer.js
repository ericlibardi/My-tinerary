import { POST_USER, LOGIN_USER, GET_USER, GET_GOOGLEUSER, LOGOUT_USER } from '../actions/actionTypes'

const initialState = {
    items: [],
    item: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case POST_USER:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                items: action.payload
            };
        case LOGIN_USER:
            localStorage.setItem("token", action.payload.token)
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
        case LOGOUT_USER:
            localStorage.removeItem("token")
            return {
                ...state,
                items: []
            }
        default:
            return state;
        }

}