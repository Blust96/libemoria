import React, { Fragment, useContext, useEffect } from 'react';

import LoadingView from '../layout/LoadingView';

import BookContext from '../../context/book/BookContext';

const BookDetails = ({ match }) => {

    // Get books context
    const bookContext = useContext(BookContext);
    const { isLoading, book, setBook } = bookContext;

    useEffect(() => {
        setBook(match.params.id)
    }, []);

    const {
        title,
        author,
        genre
    } = book;

    if (isLoading) 
        return <LoadingView />
    else {
        return (
            <Fragment>
                <h1>{ title }</h1>
                <h2>{ author }</h2>
                <h3>{ genre }</h3>
            </Fragment>
        );
    }

}

export default BookDetails;