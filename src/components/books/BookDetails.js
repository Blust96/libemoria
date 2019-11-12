import React, { Fragment } from 'react';

const BookDetails = ({ match }) => {

    return (
        <Fragment>
            <h1>{ match.params.id }</h1>
        </Fragment>
    );

}

export default BookDetails;