import { ADD_TODO, REMOVE_TODO, REQUEST_POSTS } from '../actionTypes'
import fetch from 'cross-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPosts(cities) {
  return {
    type: REQUEST_POSTS,
    cities
  }
}

export function fetchPosts(cities) {

    return function(cities) {

        dispatch(requestPosts(cities))

        return fetch('http://localhost:5000/cities/all', {
        method: "GET",
        mode: 'cors',
        cache: 'default'
    })
    .then(response => response.json(),
    error => console.log('An error occured.', error)
    )
    .then(result => {this.setState({cities: result,
    isFetching: false})
        this.setState({cities: result.sort((a,b) => a.name.localeCompare(b.name)  )
        })
        this.setState({filtCities: this.state.cities})
    })
}}
