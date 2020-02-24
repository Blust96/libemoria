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

        let books = [];
        res.rows.map(row => {
            books.push(row.doc);
        });

        dispatch({
            type: GET_BOOKS,
            payload: books
        });

    }

    // Set current book
    const setBook = async id => {

        isLoading();
        const res = await getBook(id);

        dispatch({
            type: SET_BOOK,
            payload: res
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

        console.log(props);

        isLoading();
        const res = await updateBook(props);
        const modifiedBook = await getBook(res.id);

        // TODO:
        // Update books array with the modified book
        books.map(book => {
            if(modifiedBook._id === book._id) {
                return modifiedBook;
            }
        });

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