import * as ActionType from '../ActionType'

const initValue = {
    isLoading: false,
    user: null,
    productDetails: '',
    error: '',
    authMsg: ''
}

export const authReducer = (state = initValue, action) => {
    switch (action.type) {
        case ActionType.EMAIL_LOGIN:
            return {
                ...state,
                isLoading: false,
                error: '',
                auth: action.payload,
            }

        case ActionType.AUTH_ERROR:
            return {
                ...state,
                isLoading: false,
                error: alert(action.payload),
                user: null,
                authMsg: ''
            }
        case ActionType.LOADING_LOGIN:
            return {
                ...state,
                isLoading: true,
                error: '',
                user: null,
                authMsg: ''
            }
        case ActionType.SIGNIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: '',
                user: action.payload,
                authMsg: ''
            }
        case ActionType.SIGNOUT_USER:
            return {
                ...state,
                isLoading: false,
                error: '',
                user: null,
                // authMsg: alert(action.payload),
            }
        case ActionType.UID:
            return {
                ...state,
                isLoading: false,
                error: '',
                user: action.payload,
                authMsg: '',
            }
        default:
            return state
    }
}