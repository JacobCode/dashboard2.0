import {
    UPDATE_USER_INFO,
    ADD_TASK,
    DELETE_TASK,
    ADD_BOOKMARK,
    DELETE_BOOKMARK
} from './types';

export const updateUserInfo = (user_info) => dispatch => {
    console.log(user_info);
    dispatch({
        type: UPDATE_USER_INFO,
        payload: user_info
    })
}

export const addTask = (param) => dispatch => {
    console.log(param);
}

export const deleteTask = (tasks) => dispatch => {
    dispatch({
        type: DELETE_TASK,
        payload: tasks
    })
}

export const addBookmark = (bookmarks) => dispatch => {
    dispatch({
        type: ADD_BOOKMARK,
        payload: bookmarks
    })
    console.log(bookmarks);
}

export const deleteBookmark = (initial, id) => dispatch => {
    console.log(initial);
    console.log(id);
    // dispatch({
    //     type: DELETE_BOOKMARK,
    //     payload: bookmarks
    // })
}