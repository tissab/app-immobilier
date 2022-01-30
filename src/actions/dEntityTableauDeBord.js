import api from './api';

export const ACTION_TYPES = {
    FETCH_DATA: 'FETCH_DATA',
}


export const fetchData = (url) => dispatch => {
    document.getElementById('loading').style.display = 'block'
    api.dEntityAPI().fetchAll(url)
       .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_DATA,
                payload: response.data
            })
            document.getElementById('loading').style.display = 'none'
        })
       .catch(err => {
            console.log(err.response);
       })   
} 