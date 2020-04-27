import React from 'react';
import { Link } from 'react-router-dom';

import { Favorite, Bought, Read, Genre } from '../svg';

const BookCard = ({ book: { _id, title, author, genre, cover, favorite, read, bought }, removeBook }) => (
    <article className="book-card-container">
        <div className='book-card book-card-item'>
            <Link to={`/details/${_id}`}>
                {
                    cover
                    ? <img className='book-cover' src={URL.createObjectURL(cover)} alt={title} />
                    : <img className='book-cover' src='/cover_placeholder.png' alt='Cover placeholder' />
                }
                <div>
                    <h2 className="book-title">{ title }</h2>
                    <p><span className='book-author'>{ author }</span></p>
                    <div>
                        <div className='book-badges'>
                            { favorite ? <Favorite favorite={favorite} /> : '' }
                            { read ? <Read /> : '' }
                            { bought ? <Bought /> : '' }
                        </div>
                        <div className='book-genre'>
                            <Genre genre={genre} />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
        <div className="book-card-item book-delete" onClick={removeBook}>

        </div>
    </article>
);

export default BookCard;