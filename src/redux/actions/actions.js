import {
    UPDATE_USER_INFO,
} from './types';

export const updateUserInfo = (user_info) => dispatch => {
    console.log(user_info);
    dispatch({
        type: UPDATE_USER_INFO,
        payload: user_info
    })
}