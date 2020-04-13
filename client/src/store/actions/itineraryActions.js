import { FETCH_ITINERARIES } from './actionTypes'

export const fetchItineraries = (city) => dispatch => {
  fetch('http://localhost:5000/itineraries/'+city, {
        method: "GET",
        mode: 'cors',
        cache: 'default'
    })
      .then(res => res.json(),
      error => console.log('Error', error, 'occured'))
      .then(itineraries => {
          dispatch({
          type: FETCH_ITINERARIES,
          payload: itineraries
      })});
}