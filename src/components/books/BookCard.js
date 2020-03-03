import React,  { Fragment } from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book: { _id, title, author, genre, cover, favorite, read, wish } }) => (
    <Fragment>
        <Link to={`/details/${_id}`}>
            {
                cover
                ? <img src={URL.createObjectURL(cover)} alt={title} />
                : (<div style={{ width: '80px', height: '140px', backgroundColor: '#000' }}></div>)
            }
            <h2>{ title }</h2>
            <p className='bookGenre'>{ genre }</p>
            <h3>{ author }</h3>
            <div className='badges'>
                { favorite ? (<div style={{ width: '25px', height: '25px', backgroundColor: '#000' }}></div>) : '' }
                { read ? (<div style={{ width: '25px', height: '25px', backgroundColor: '#000' }}></div>) : '' }
                { wish ? (<div style={{ width: '25px', height: '25px', backgroundColor: '#000' }}></div>) : '' }
            </div>
        </Link>
    </Fragment>
);

export default BookCard;