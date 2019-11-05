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
    const setBook = async book => {

        isLoading();

        dispatch({
            type: SET_BOOK,
            payload: book
        });

    }

    // Add book
    const addBook = async (books, props) => {

        isLoading();
        const res = await createBook(props);
        const addedBook = await getBook(res.id);

        books = [...books, addedBook];

        dispatch({
            type: ADD_BOOK,
            payload: { books, addedBook }
        });

    }

    // Modify book
    const modifyBook = async (books, props) => {

        isLoading();
        const res = await updateBook(props);
        const modifiedBook = await getBook(res.id);

        // TODO:
        // Update books array with the modified book

        dispatch({
            type: MODIFY_BOOK,
            payload: { books, modifiedBook }
        });

    }

    // Remove book
    const removeBook = async (books, id) => {

        isLoading();
        const res = await deleteBook(id);

        // TODO:
        // Update books array with the deleted book

        dispatch({
            type: REMOVE_BOOK,
            payload: { books }
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