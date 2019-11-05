import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const EmptyBooks = () => (
    <Fragment>
        <p>You have 0 books yet !</p>
        <Link to="/create">Just create one</Link>
    </Fragment>
);

export default EmptyBooks;