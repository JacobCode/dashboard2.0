import {
    UPDATE_USER_INFO,
    ADD_WEBSITE,
    ADD_SERVER,
    ADD_BUG,
    DELETE_WEBSITE,
    DELETE_SERVER,
    DELETE_BUG,
    ADD_BOOKMARK,
    DELETE_BOOKMARK,
    ADD_NOTIFICATION,
    DELETE_NOTIFICATION
} from './types';

// User Info
export const updateUserInfo = (user_info) => dispatch => {
    console.log(user_info);
    dispatch({
        type: UPDATE_USER_INFO,
        payload: user_info
    })
}

// Add Tasks
export const addBug = (arr) => dispatch => {
    dispatch({
        type: ADD_BUG,
        payload: arr
    })
}
export const addServer = (arr) => dispatch => {
    dispatch({
        type: ADD_SERVER,
        payload: arr
    })
}
export const addWebsite = (arr) => dispatch => {
    dispatch({
        type: ADD_WEBSITE,
        payload: arr
    })
}

// Manage Bookmarks
export const addBookmark = (bookmarks) => dispatch => {
    dispatch({
        type: ADD_BOOKMARK,
        payload: bookmarks
    })
    console.log(bookmarks);
}
export const deleteBookmark = (bookmarks) => dispatch => {
    console.log(bookmarks);
    // dispatch({
    //     type: DELETE_BOOKMARK,
    //     payload: bookmarks
    // })
}

// Manage Notifications
export const addNotification = (notifications) => dispatch => {
    console.log(notifications);
    dispatch({
        type: ADD_NOTIFICATION,
        payload: notifications
    })
}
export const deleteNotification = (notifications) => dispatch => {
    console.log(notifications);
    dispatch({
        type: DELETE_NOTIFICATION,
        payload: notifications
    })
}

// Delete Tasks
export const deleteBug = tasks => dispatch => {
    console.log(tasks);
    dispatch({
        type: DELETE_BUG,
        payload: tasks
    })
}
export const deleteWebsite = tasks => dispatch => {
    dispatch({
        type: DELETE_WEBSITE,
        payload: tasks
    })
}
export const deleteServer = tasks => dispatch => {
    dispatch({
        type: DELETE_SERVER,
        payload: tasks
    })
}