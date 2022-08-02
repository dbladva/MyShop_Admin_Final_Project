import * as ActionType from '../ActionType'

const initValue = {
    isLoading: false,
    product: [],
    productDetails: '',
    error: '',
}

export const productReducer = (state = initValue, action) => {
    switch (action.type) {
        case ActionType.GET_PRODUCT:
            return {
                ...state,
                isLoading: false,
                error: '',
                product: action.payload,
            }
            case ActionType.GET_PRODUCT_DETAIL:
            return {
                ...state,
                isLoading: false,
                error: '',
                product: [],
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