export const ACTION_TYPES = {
    CREATE_USER: 'CREATE_USER'
}

export const fetchall = (url) => dispatch => {
    api.dEntityAPI().fetchAll(url)
       .then(response => {
           response.data &&
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_USER,
                payload: response.data
            })
        })
        .catch(err => {
            console.log(err.response.status);
            dispatch({
                type: ACTION_TYPES.STATUS_USER,
                payload: err.response.status
            })
       })   
}