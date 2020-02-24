import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const EmptyBooks = () => (
    <Fragment>
        <p>Vous n'avez pas encore de livre !</p>
        <Link to='/create'>Se laisser guider</Link>
    </Fragment>
);

export default EmptyBooks;