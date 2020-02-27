import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (state, action) => {

    switch(action) {

        case SET_ALERT:
            return [action.payload, ...state.alerts];
        
        case REMOVE_ALERT:
            return state.alerts.filter(alert => alert.id !== action.payload);

        default:
            return state;

    }

}