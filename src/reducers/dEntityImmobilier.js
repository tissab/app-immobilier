import { ACTION_TYPES } from '../actions/dEntityImmobilier';

const initialState = {
    list: [],
    obj: null
}

export const dEntityImmobilier = (state = initialState, action) => {
          
    switch (action.type) {
        case ACTION_TYPES.CREATE_IMMOBILIER:
            return{
                ...state,
                list: [...action.payload]
            }    
        
        case ACTION_TYPES.FETCH_ALL_IMMOBILIER:
            return{
                ...state,
                list: [...action.payload]
            }    

        case ACTION_TYPES.FETCH_BY_ID_IMMOBILIER:
            return{
                ...state,
                obj: action.payload
            }

        case ACTION_TYPES.UPDATE_IMMOBILIER:
            return{
                ...state,
                list: state.list.map(x => x.CourrierArrive_id === action.payload ? action.payload.data : x)
            }

        case ACTION_TYPES.DELETE_IMMOBILIER:
            return{
                ...state,
                list: state.list.filter(x => x.CourrierArrive_id !== action.payload )
            }

        case ACTION_TYPES.RESET_IMMOBILIER:
            return{
                ...state,
                obj: null
            }
                    
        default:
            return state
    }


}