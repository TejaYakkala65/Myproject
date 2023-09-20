export const ADD_USER_INFO = "ADD_USER_INFO";
export const REMOVE_USER_INFO = "REMOVE_USER_INFO";
const userPayload = {}

function UserReducer(state=userPayload, action) {
    switch(action.type) {
        case ADD_USER_INFO :
            return {
                ...state,
                userInfo: action.data
            }
        case REMOVE_USER_INFO :
            return {
                userInfo: userPayload
            }
        default :
            return userPayload
    }
}
export default UserReducer;