import * as ActionType from '../ActionType'

const initValue = {
    isLoading: false,
    user: null,
    error: '',
}

export const authReducer = (state = initValue, action) => {
    switch (action.type) {
        case ActionType.GET_PRODUCT:
            return {
                ...state,
                isLoading: false,
                error: '',
                user: action.payload,
  
            }
        default:
            return state
    }
}