import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../layout/Navbar';
import LoadingView from '../layout/LoadingView';
import { Bought, Read, Genre } from '../svg';

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
        bought
    } = book;

    if (isLoading) 
        return <LoadingView />
    else {
        return (
            <div id="background" style={ 
                cover 
                ? { backgroundImage: `linear-gradient(rgba(167, 62, 208, 0.2), white), url(${URL.createObjectURL(cover)})` } 
                : { backgroundColor: '#edc0ff' } }>
                <Navbar route={'details'} props={{ id: params.id, book, toggleFavorite }}/>
                <section className="content-section">
                    <div className="container">
                        <div className="book-header">
                            <div>
                                <h2 className="book-title">{ title }</h2>
                                <p className='book-author'>{ author }</p>
                            </div>
                            <div className='book-genre'>
                                <Genre genre={genre} />
                            </div>
                        </div>
                        <div className="book-infos">
                            <div className='book-badges'>
                                <Read read={read} />
                                <Bought bought={bought} />
                            </div>
                            <p className='book-isbn'>{ isbn ? `ISBN : ${isbn}` : '' }</p>
                        </div>
                        {
                            description 
                            ? (
                                <>
                                    <h3>Description</h3>
                                    <p className='book-description'>{ description }</p>
                                </>
                            )
                            : ''
                        }
                        
                    </div>
                </section>
            </div>
        );
    }

}

export default BookDetails;