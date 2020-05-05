import axios from 'axios';

const setToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
    } else {
        delete axios.defaultsdefaults.headers.common['Authorization'];
    }  

}

export default setToken