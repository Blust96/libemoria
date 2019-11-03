import React, { useReducer } from 'react';
import BookContext from './BookContext';
import BookReducer from './BookReducer';
import {
    ADD_BOOK,
    GET_BOOKS,
    SET_BOOK,
    MODIFY_BOOK,
    REMOVE_BOOK,
    IS_LOADING,
} from '../types';
import { getBooks, getBook, createBook, updateBook, deleteBook } from '../../api/book';

const BookState = props => {

    const initialState = {
        books: [],
        book: {},
        isLoading: false
    };
    
    const [state, dispatch] = useReducer(BookReducer, initialState);

    // Get all books
    const getBooksList = async () => {

        isLoading();
        const res = await getBooks();

        dispatch({
            type: GET_BOOKS,
            payload: res.rows
        });

    }

    // Set current book
    const setBook = async props => {

        isLoading();

        dispatch({
            type: SET_BOOK,
            payload: props
        });

    }

    // Add book
    const addBook = async props => {

        isLoading();
        const res = await createBook(props);
        const addedBook = await getBook(res.id);

        dispatch({
            type: ADD_BOOK,
            payload: addedBook
        });

    }

    // Modify book
    const modifyBook = async props => {

        isLoading();
        const res = await updateBook(props);
        const modifiedBook = await getBook(res.id);

        dispatch({
            type: MODIFY_BOOK,
            payload: modifiedBook
        });

    }

    // Remove book
    const removeBook = async id => {

        isLoading();
        const res = await deleteBook(id);

        dispatch({
            type: REMOVE_BOOK,
            payload: { id: res._id }
        })

    }

    // Set app state to loading
    const isLoading = () => dispatch({ type: IS_LOADING });

    return(
        <BookContext.Provider
            value={{
                books: state.books,
                book: state.book,
                isLoading: state.isLoading,
                getBooksList,
                setBook,
                addBook,
                modifyBook,
                removeBook
            }}
        >
            {props.children}
        </BookContext.Provider>
    )

}

export default BookState;