import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book: { _id, title, author, genre, cover, favorite, read, wish } }) => (
    <article className='book-card'>
        <Link to={`/details/${_id}`}>
            {
                cover
                ? <img className='book-cover' src={URL.createObjectURL(cover)} alt={title} />
                : <img className='book-cover' src='/cover_placeholder.png' alt='Cover placeholder' />
            }
            <div>
                <h2>{ title }</h2>
                <p><span className='book-genre'>{ genre }</span></p>
                <p><span className='book-author'>{ author }</span></p>
                <div className='book-badges'>
                    { favorite ? (<div style={{ width: '25px', height: '25px', backgroundColor: '#000' }}></div>) : '' }
                    { read ? (<div style={{ width: '25px', height: '25px', backgroundColor: '#000' }}></div>) : '' }
                    { wish ? (<div style={{ width: '25px', height: '25px', backgroundColor: '#000' }}></div>) : '' }
                </div>
            </div>
        </Link>
    </article>
);

export default BookCard;