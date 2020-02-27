import React, { useReducer } from 'react';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

import { generateId } from '../../utils';

const AlertState = props => {

    const initialState = [];

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Set an alert
    const setAlert = async (msg, type, timeout = 4000) => {

        const id = generateId();

        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id }
        });

        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);

    }

    const removeAlert = async id => {
        dispatch({ type: REMOVE_ALERT, payload: id })
    }

    return (
        <AlertContext.Provider
            value={{
                alerts: state,
                setAlert,
                removeAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );

}

export default AlertState;