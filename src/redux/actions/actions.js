import { ACTION_TYPE } from './types';

export const callActionType = () => dispatch => {
    console.log('CALL ACTION TYPE')
    dispatch({
        type: ACTION_TYPE,
        payload: { name: 'Jacob Carver', age: 19 }
    })
}