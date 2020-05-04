import {
    ADD_BOOK,
    GET_BOOKS,
    SET_BOOK,
    MODIFY_BOOK,
    REMOVE_BOOK,
    TOGGLE_FAVORITE,
    RESET_COVER,
    FILTER_BOOKS,
    UPDATE_SEARCH_FILTER,
    RESET_SEARCH_FILTER,
    UPDATE_GENRES_FILTER,
    RESET_GENRES_FILTER,
    CLEAR_FILTERS,
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
                book: {...state.book, favorite: action.payload.favorite},
                isLoading: false
            };

        case RESET_COVER:
            return {
                ...state,
                book: {...state.book, cover: null},
                isLoading: false
            }

        case FILTER_BOOKS:
            return {
                ...state,
                filteredBooks: state.books.filter(book => {
                    const searchRegex = RegExp(`${state.searchFilter}`, 'gi');
                    return (
                        state.genresFilter.length > 0
                        ? (
                            state.genresFilter.includes(book.genre) 
                            && (book.title.match(searchRegex) || book.author.match(searchRegex) || book.isbn.match(searchRegex))
                        ) : book.title.match(searchRegex) || book.author.match(searchRegex) || book.isbn.match(searchRegex)
                    );
                })
            }

        case UPDATE_SEARCH_FILTER:
            return {
                ...state,
                searchFilter: action.payload,
            }

        case RESET_SEARCH_FILTER:
            return {
                ...state,
                searchFilter: '',
            }

        case UPDATE_GENRES_FILTER:
            return {
                ...state,
                genresFilter: state.genresFilter.includes(action.payload) 
                    ? state.genresFilter.filter(genre => genre !== action.payload)
                    : [...state.genresFilter, action.payload]
            }

        case RESET_GENRES_FILTER:
            return {
                ...state,
                genresFilter: []
            }

        case CLEAR_FILTERS:
            return {
                ...state,
                filteredBooks: null
            }

        case IS_LOADING:
            return {
                ...state,
                isLoading: true
            };

        default: 
            return state;

    }   

};