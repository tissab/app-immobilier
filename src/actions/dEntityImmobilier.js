import api from './api';

export const ACTION_TYPES = {
    CREATE_IMMOBILIER: 'CREATE_IMMOBILIER',
    UPDATE_IMMOBILIER: 'UPDATE_IMMOBILIER', 
    FETCH_BY_ID_IMMOBILIER: 'FETCH_BY_ID_IMMOBILIER',
    DELETE_IMMOBILIER: 'DELETE_IMMOBILIER',
    FETCH_ALL_IMMOBILIER: 'FETCH_ALL_IMMOBILIER',
    RESET_IMMOBILIER: 'RESET_IMMOBILIER',
}

export const fetchall = (url) => dispatch => {
    document.getElementById('loading').style.display = 'block'
    api.dEntityAPI().fetchAll(url)
       .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_IMMOBILIER,
                payload: response.data
            })
            document.getElementById('loading').style.display = 'none'
        })
       .catch(err => {
            console.log(err.response);
       })   
}

export const fetchById = (url,id) => dispatch => {
    document.getElementById('loading').style.display = 'block'
    api.dEntityAPI().fetchById(url,id)
    .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_BY_ID_IMMOBILIER,
                payload: response.data
            })
            document.getElementById('loading').style.display = 'none'
        }
    )
    .catch(err => console.log(err))   
}

export const create = (url,formData, onSuccess) => dispatch => {
    document.getElementById('loading').style.display = 'block';

    api.dEntityAPI().create(url,formData)
        .then(() => {
            onSuccess();
            document.getElementById('loading').style.display = 'none';
        })
        .catch(err => console.log(err))
}

export const update = (url,id, formData, onSuccess) => dispatch => {
    document.getElementById('loading').style.display = 'block';
  
    api.dEntityAPI().update(url,id,formData)
        .then(() => {
            onSuccess();
            document.getElementById('loading').style.display = 'none';
        })
        .catch(err => console.log(err))
}

export const Delete = (url,id) => dispatch =>{
    document.getElementById('loading').style.display = 'block'
    api.dEntityAPI().delete(url,id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.DELETE_IMMOBILIER,
                payload: id
            })
            document.getElementById('loading').style.display = 'none'
        })
        .catch(err => console.log(err))
}

export const reset = () => dispatch => {
    dispatch({
        type: ACTION_TYPES.RESET_IMMOBILIER
    })
} 
