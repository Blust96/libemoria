import React, { useReducer } from 'react';
import BookContext from './BookContext';
import BookReducer from './BookReducer';
import {
    ADD_BOOK,
    GET_BOOKS,
    SET_BOOK,
    MODIFY_BOOK,
    REMOVE_BOOK,
    TOGGLE_FAVORITE,
    RESET_COVER,
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
        const books = await getBooks();

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
    const addBook = async book => {

        isLoading();

        if(book.isbn) book.isbn = book.isbn.trim();
        if(book.cover.length > 0) {
            book.cover = book.cover[0];
            book._attachments = {
                [book.cover.name]: {
                    content_type: book.cover.type,
                    data: book.cover
                }
            }
        }

        const res = await createBook(book);
        const addedBook = await getBook(res.id);

        dispatch({
            type: ADD_BOOK,
            payload: addedBook
        });

    }

    // Modify book
    const modifyBook = async props => {

        isLoading();

        if(props.isbn) props.isbn = props.isbn.trim();
        if(props.cover.length > 0) {
            props.cover = props.cover[0];
            props._attachments = {
                [props.cover.name]: {
                    content_type: props.cover.type,
                    data: props.cover
                }
            }
        } else if(!state.book.cover)
            props._attachments = null;

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
            payload: id
        });

    }

    // Toggle favorite value of a book
    const toggleFavorite = async book => {

        book.favorite = !book.favorite;

        isLoading();
        const res = await updateBook(book);
        const modifiedBook = await getBook(res.id);

        dispatch({
            type: TOGGLE_FAVORITE,
            payload: modifiedBook
        });

    }

    // Reset cover
    const resetCover = () => {
        isLoading();
        dispatch({ type: RESET_COVER });
    }

    // Set app state to loading
    const isLoading = () => dispatch({ type: IS_LOADING });

    return (
        <BookContext.Provider
            value={{
                books: state.books,
                book: state.book,
                isLoading: state.isLoading,
                getBooksList,
                setBook,
                addBook,
                modifyBook,
                removeBook,
                toggleFavorite,
                resetCover
            }}
        >
            {props.children}
        </BookContext.Provider>
    );

}

export default BookState;