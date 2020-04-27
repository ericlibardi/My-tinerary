import { POST_USER } from './actionTypes';
import axios from 'axios';

/* export const createUser = (user) => dispatch => {
  fetch('http://localhost:5000/users/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
  })
  .then(res => res.json())
  .then(user => dispatch({
    type: POST_USER,
    payload: user
  }))
  
} */


export const createUser = (email, password, image) => async dispatch => {
  const config = {headers: {
    'Content-Type': 'application/json'
  }}

  const body = JSON.stringify({email, password, image})
  console.log(body)

  try{
    const response = await axios.post('http://localhost:5000/users/register', body, config)
    
    dispatch ({
      type: POST_USER,
      payload: response.data
    })
  
}
  catch(err) {
    console.error(err);
  }
}
