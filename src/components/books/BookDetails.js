import React, { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../layout/Navbar';
import LoadingView from '../layout/LoadingView';

import BookContext from '../../context/book/BookContext';

const BookDetails = () => {

    // Get books context
    const bookContext = useContext(BookContext);
    const { isLoading, book, setBook } = bookContext;

    // Get params
    const params = useParams();

    useEffect(() => {
        setBook(params.id)
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
                <Navbar route={'details'} props={{ id: params.id, title }}/>
                <h1>{ title }</h1>
                <h2>{ author }</h2>
                <h3>{ genre }</h3>
            </Fragment>
        );
    }

}

export default BookDetails;