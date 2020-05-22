import { MODIFY_COMMENT, FETCH_COMMENTS } from '../actions/actionTypes'

const initialState = {
    items: [],
    item: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case MODIFY_COMMENT:
            return {
                ...state,
                items: action.payload
            }
        case FETCH_COMMENTS:
        return {
            ...state,
            items: action.payload
        }
        default:
            return state;
        }

}