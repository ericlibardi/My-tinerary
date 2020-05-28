import { MODIFY_REPLY, FETCH_REPLIES } from '../actions/actionTypes'

const initialState = {
    items: [],
    item: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case MODIFY_REPLY:
            return {
                ...state,
                items: action.payload
            }
        case FETCH_REPLIES:
        return {
            ...state,
            items: action.payload
        }
        default:
            return state;
        }

}