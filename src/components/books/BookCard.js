import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book: { _id, title, author, genre } }) => (
    // TODO: Set book in BookState to get data in BookDetails
    <Link to={`/details/${_id}`}>
        <h1>{ title }</h1>
        <h2>{ author }</h2>
        <p>{ genre }</p>
    </Link>
);

export default BookCard;