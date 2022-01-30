import { ACTION_TYPES } from '../actions/dEntityTableauDeBord';

const initialState = {
    obj: null
}

export const dEntityTableauDeBord = (state = initialState, action) => {
          
    switch (action.type) {

        case ACTION_TYPES.FETCH_DATA:
            return{
                ...state,
                obj: action.payload
            }    

        default:
            return state
    }


}