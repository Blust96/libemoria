import React, { Fragment } from 'react';

const BookCard = ({ book: { title, author, genre } }) => (
    <Fragment>
        <h1>{ title }</h1>
        <h2>{ author }</h2>
        <p>{ genre }</p>
    </Fragment>
);

export default BookCard;