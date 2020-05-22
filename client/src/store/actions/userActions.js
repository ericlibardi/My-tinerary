import { POST_USER, LOGIN_USER, GET_USER, GET_USER_ERROR, GET_GOOGLEUSER, LOGOUT_USER } from './actionTypes';
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import setToken from '../../utils/setToken';

export const loginUser = (email, password) => async dispatch => {
  const config = {headers: {
    'Content-Type': 'application/json'
  }}
  const body = JSON.stringify({email, password})
  console.log(body)

  try{
    const response = await axios.post('http://localhost:5000/users/login', body, config)
    dispatch ({
      type: LOGIN_USER,
      payload: response.data
    })
    dispatch (getUser())
  }
  catch(err){
    console.error(err);
  }
}


export const createUser = (username, email, password, image) => async dispatch => {
  const config = {headers: {
    'Content-Type': 'application/json'
  }}
  const body = JSON.stringify({username, email, password, image})
  console.log(body)

  try{
    const response = await axios.post('http://localhost:5000/users/register', body, config)
    dispatch ({
      type: POST_USER,
      payload: response.data
    })
    dispatch (getUser())
}
  catch(err) {
    console.error(err);
  }
}

export const getUser = () => async dispatch => {
  
  if (localStorage.token) {
    setToken(localStorage.token)
}
  try{
    const res = await axios.get('http://localhost:5000/users')
        dispatch({
          type: GET_USER,
          payload: res.data
      });
    }
  catch(err){
    console.log("load user")
    dispatch({
      type: GET_USER_ERROR
    })
  }
}

export const userLogedin = () => async dispatch => {
  try{
    const token = localStorage.getItem('token')
    const decodedToken = jwt_decode(token)
    dispatch({
      type: GET_GOOGLEUSER,
      payload: decodedToken
    })
  }
  catch{

  }
}

export const logoutUser = (userEmail) => async dispatch => {
  const config = {headers: {
    'Content-Type': 'application/json',
  }}
  const body = JSON.stringify({userEmail})
  try{ 
  dispatch({type: LOGOUT_USER})
  await axios.post('http://localhost:5000/users/logout', body, config).then(
    console.log("user loged out")
  )
  }
  catch (err){
    console.log(err)
  }
}

export const favItineraries = (itinerary) => async dispatch => {
  const config = {headers: {
    'Content-Type': 'application/json',
    'Authorization':  `bearer ${localStorage.token}`
  }}
  const body = JSON.stringify({itinerary})
  const response = await axios.post('http://localhost:5000/users/itineraries', body, config)
  console.log(response.data)
  dispatch (getUser())

}