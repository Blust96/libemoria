import React from 'react';
import { Link } from 'react-router-dom';

import { Favorite, Bought, Read, Genre } from '../svg';

const BookCard = ({ book: { _id, title, author, genre, cover, favorite, read, bought }, removeBook }) => (
    <article className='container book-card'>
        <Link className='book-card-item book-card-content' to={`/details/${_id}`}>
            {
                cover
                ? <img className='book-cover' src={URL.createObjectURL(cover)} alt={title} />
                : <img className='book-cover' src='/cover_placeholder.png' alt='Cover placeholder' />
            }
            <div>
                <h2 className="book-title">{ title }</h2>
                <p className='book-author'>{ author }</p>
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
        <button className="book-card-item book-delete" onClick={removeBook}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M 10.3125 -0.03125 C 8.589844 -0.03125 7.164063 1.316406 7 3 L 2 3 L 2 5 L 6.96875 5 L 6.96875 5.03125 L 17.03125 5.03125 L 17.03125 5 L 22 5 L 22 3 L 17 3 C 16.84375 1.316406 15.484375 -0.03125 13.8125 -0.03125 Z M 10.3125 2.03125 L 13.8125 2.03125 C 14.320313 2.03125 14.695313 2.429688 14.84375 2.96875 L 9.15625 2.96875 C 9.296875 2.429688 9.6875 2.03125 10.3125 2.03125 Z M 4 6 L 4 22.5 C 4 23.300781 4.699219 24 5.5 24 L 18.59375 24 C 19.394531 24 20.09375 23.300781 20.09375 22.5 L 20.09375 6 Z M 7 9 L 8 9 L 8 22 L 7 22 Z M 10 9 L 11 9 L 11 22 L 10 22 Z M 13 9 L 14 9 L 14 22 L 13 22 Z M 16 9 L 17 9 L 17 22 L 16 22 Z"/>
            </svg>
        </button>
    </article>
);

export default BookCard;