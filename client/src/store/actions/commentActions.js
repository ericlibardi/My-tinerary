import { MODIFY_COMMENT } from './actionTypes';
import axios from 'axios';

export const modifyComment = (comment, itinerary, user, city, action) => async dispatch => {
  const config = {headers: {
    'Content-Type': 'application/json',
  }}
  
  const body = JSON.stringify({comment, itinerary, user, city})
  
  //const response = await axios.post('http://localhost:5000/users/itineraries', body, config)
  

}