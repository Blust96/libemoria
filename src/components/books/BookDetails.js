import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {

    let { id } = useParams();

    return (
        <Fragment>
            <h1>{ id }</h1>
        </Fragment>
    );

}

export default BookDetails;