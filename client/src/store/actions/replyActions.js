import { MODIFY_REPLY, FETCH_REPLIES } from './actionTypes';
import axios from 'axios';

export const modifyReply = (reply, comment, action) => async dispatch => {
    const config = {headers: {
      'Content-Type': 'application/json',
      'Authorization':  `bearer ${localStorage.token}`
    }}
    if (action === "add") {
    const body = JSON.stringify({reply, comment})
    const response = await axios.post('http://localhost:5000/replies/create', body, config)
    dispatch({
      type: MODIFY_REPLY,
      payload: response.data
    })
    } else if (action === "delete" ) {
      const body = JSON.stringify({reply})
      const response = await axios.post('http://localhost:5000/replies/delete', body, config)
      dispatch({
        type: MODIFY_REPLY,
        payload: response.data
      })
    }
  }
  
  export const fetchReplies = () => async dispatch => {
    const response = await axios.get('http://localhost:5000/replies/get' )
    
    dispatch({
      type: FETCH_REPLIES,
      payload: response.data
    })
  }