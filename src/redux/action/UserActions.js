import { ADD_USER_INFO, REMOVE_USER_INFO } from "../reducer/UserReducer"

export const addUserInfo = (data) => {
    return {
        type: ADD_USER_INFO,
        data
    }
}

export const removeUserInfo = () => {
    return {
        type: REMOVE_USER_INFO,
    }
}

