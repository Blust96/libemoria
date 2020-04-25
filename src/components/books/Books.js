import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../layout/Navbar';
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
        return (
            <div id="background" style={{ backgroundColor: '#fdfdfd' }}>
                <Navbar route={'home'} />
                <EmptyBooks />
            </div>
        )
    else {
        return (
            <div id="background" style={{ backgroundColor: '#fdfdfd' }}>
                <Navbar route={'home'} />
                <Link to='/create' id='create-button'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
                    </svg>
                </Link>
                <div className="container">
                    { books.map(book => (
                        <BookCard key={book._id} book={book} />
                    )) }
                </div>
            </div>
        )
    }

}

export default Books;