import { FETCH_CITIES } from './actionTypes'

export const fetchCities = () => dispatch => {
  fetch('http://localhost:5000/cities/all', {
        method: "GET",
        mode: 'cors',
        cache: 'default'
    })
      .then(res => res.json(),
      error => console.log('Error', error, 'occured'))
      .then(cities => {
        dispatch({
          type: FETCH_CITIES,
          payload: cities.sort((a,b) => a.name.localeCompare(b.name))
      })});
}
