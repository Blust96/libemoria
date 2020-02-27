import React,  { Fragment } from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book: { _id, title, author, genre, coverPath, favorite, read, wish } }) => (
    <Fragment>
        <Link to={`/details/${_id}`}>
            { 
                coverPath
                ? (<img src={coverPath} alt={title}></img>)
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