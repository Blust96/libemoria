import React, { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../layout/Navbar';
import LoadingView from '../layout/LoadingView';

import BookContext from '../../context/book/BookContext';

const BookDetails = () => {

    // Get books context
    const bookContext = useContext(BookContext);
    const { isLoading, toggleFavorite, book, setBook } = bookContext;

    // Get params
    const params = useParams();

    useEffect(() => {
        setBook(params.id)
    }, []);

    const {
        title,
        author,
        genre,
        isbn,
        description,
        cover,
        favorite,
        read,
        wish
    } = book;

    if (isLoading) 
        return <LoadingView />
    else {
        return (
            <Fragment>
                <Navbar route={'details'} props={{ id: params.id, title, book, toggleFavorite }}/>
                <div>
                    <p><span className='book-genre'>{ genre }</span></p>
                    {
                        cover
                        ? <img className='book-cover' src={URL.createObjectURL(cover)} alt={title} />
                        : <img className='book-cover' src='/cover_placeholder.png' alt='Cover placeholder' />
                    }
                    <div className='book-badges'>
                        { favorite ? (<div style={{ width: '25px', height: '25px', backgroundColor: '#000' }}></div>) : '' }
                        { read ? (<div style={{ width: '25px', height: '25px', backgroundColor: '#000' }}></div>) : '' }
                        { wish ? (<div style={{ width: '25px', height: '25px', backgroundColor: '#000' }}></div>) : '' }
                    </div>
                </div>
                <div>
                    <p><span className='book-author'>{ author }</span></p>
                    <p><span className='book-isbn'>{ isbn }</span></p>
                </div>
                <p><span className='book-description'>{ description }</span></p>
            </Fragment>
        );
    }

}

export default BookDetails;