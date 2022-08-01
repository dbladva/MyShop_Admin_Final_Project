import * as ActionType from '../ActionType'

const initValue = {
    isLoading: false,
    product: [],
    error: '',
}

export const authReducer = (state = initValue, action) => {
    switch (action.type) {
        case ActionType.GET_PRODUCT:
            return {
                ...state,
                isLoading: false,
                error: '',
                product: action.payload,
            }

        case ActionType.ERROR_PRODUCT:
            return {
                ...state,
                product: [],
                isLoading: false,
                error: action.payload
            }

        case ActionType.LOADING_PRODUCT:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        default:
            return state
    }
}