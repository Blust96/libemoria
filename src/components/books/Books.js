import React, { useContext } from 'react';

import LoadingView from '../layout/LoadingView';
import EmptyBooks from './EmptyBooks';
import BooksList from './BooksList';

import BookContext from '../../context/book/BookContext';

const Books = () => {

    // Get books context
    const bookContext = useContext(BookContext);
    const { isLoading, books } = bookContext;

    // Render
    if (isLoading) 
        return <LoadingView />
    else if (books.length === 0)
        return <EmptyBooks />
    else {
        return (
            <BooksList />
        )
    }

}

export default Books;