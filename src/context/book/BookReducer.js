import {
    ADD_BOOK,
    GET_BOOKS,
    SET_BOOK,
    MODIFY_BOOK,
    REMOVE_BOOK,
    IS_LOADING,
} from '../types';

export default (state, action) => {

    switch(action.type) {
        
        case ADD_BOOK:
            return {
                ...state
            };

        case GET_BOOKS:
            return {
                ...state
            };

        case SET_BOOK:
            return {
                ...state
            };

        case MODIFY_BOOK:
            return {
                ...state
            };

        case REMOVE_BOOK:
            return {
                ...state
            };

        case IS_LOADING:
            return {
                ...state,
                isLoading: true
            }

        default: 
            return state;

    }   

};