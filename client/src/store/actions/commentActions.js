import { MODIFY_COMMENT, FETCH_COMMENTS } from './actionTypes';
import axios from 'axios';

export const modifyComment = (comment, itinerary, action) => async dispatch => {
  const config = {headers: {
    'Content-Type': 'application/json',
    'Authorization':  `bearer ${localStorage.token}`
  }}
  if (action === "create") {
    const body = JSON.stringify({comment, itinerary})
    const response = await axios.post('http://localhost:5000/comments/create', body, config)
    dispatch({
      type: MODIFY_COMMENT,
      payload: response.data
    })
  } else if (action === "delete") {
    const body = JSON.stringify({comment})
    const response = await axios.post('http://localhost:5000/comments/delete', body, config)
    dispatch({
      type: MODIFY_COMMENT,
      payload: response.data
    })

  } else if (action === "edit") {
    const body = JSON.stringify({comment, itinerary})
    const response = await axios.post('http://localhost:5000/comments/edit', body, config)
    dispatch({
      type: MODIFY_COMMENT,
      payload: response.data
    })
  }
  
}

export const fetchComments = () => async dispatch => {
  const response = await axios.get('http://localhost:5000/comments/get' )
  
  dispatch({
    type: FETCH_COMMENTS,
    payload: response.data
  })
}