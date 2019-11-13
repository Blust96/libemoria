import React, { useContext, useEffect } from 'react';

import LoadingView from '../layout/LoadingView';
import EmptyBooks from './EmptyBooks';
import BookCard from './BookCard';

import BookContext from '../../context/book/BookContext';

const Books = () => {

    // Get books context
    const bookContext = useContext(BookContext);
    const { isLoading, books, getBooksList } = bookContext;

    useEffect(() => {
        getBooksList()
    }, []);

    // Render
    if (isLoading) 
        return <LoadingView />
    else if (books.length === 0)
        return <EmptyBooks />
    else {
        return (
            books.map(book => (
                <BookCard key={book._id} book={book} />
            ))
        )
    }

}

export default Books;