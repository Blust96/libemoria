import {
    ADD_BOOK,
    GET_BOOKS,
    SET_BOOK,
    MODIFY_BOOK,
    REMOVE_BOOK,
    TOGGLE_FAVORITE,
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
                books: [action.payload, ...state.books],
                book: action.payload,
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
                books: state.books.map(book =>
                    book._id === action.payload._id ? action.payload : book
                ),
                book: action.payload,
                isLoading: false
            };

        case REMOVE_BOOK:
            return {
                ...state,
                books: state.books.filter(
                    book => book._id !== action.payload
                ),
                isLoading: false
            };

        case TOGGLE_FAVORITE:
            return {
                ...state,
                books: state.books.map(book =>
                    book._id === action.payload._id ? action.payload : book
                ),
                book: action.payload,
                isLoading: false
            };

        case IS_LOADING:
            return {
                ...state,
                isLoading: true
            };

        default: 
            return state;

    }   

};