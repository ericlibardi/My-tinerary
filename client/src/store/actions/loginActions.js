import { STORE_TOKEN } from './actionTypes';
import jwt_decode from 'jwt-decode'

export const storeUser = (token) => async dispatch => {
  try{
  //const serializedState = JSON.stringify(token)
  const decodedToken = jwt_decode(token)
  localStorage.setItem('TOKEN', token)
  dispatch({
    type: STORE_TOKEN,
    payload: decodedToken
  });
  }
  catch{

  }
}

