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

        case GET_BOOKS:
            return {
                ...state,
                books: action.payload,
                isLoading: false
            };
        
        case ADD_BOOK:
            return {
                ...state,
                books: action.payload.books,
                book: action.payload.addedBook,
                isLoading: false
            };

        case SET_BOOK:
            return {
                ...state,
                book: action.payload,
                isLoading: false
            };

        case MODIFY_BOOK:
            return {
                ...state,
                books: action.payload.books,
                book: action.payload.modifiedBook,
                isLoading: false
            };

        case REMOVE_BOOK:
            return {
                ...state,
                books: action.payload.books,
                isLoading: false
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