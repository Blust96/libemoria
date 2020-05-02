import React from 'react';

import emptyBooks from '../../empty_books.png';

const EmptyBooks = () => (
    <div id="empty-books">
        <img src={emptyBooks} alt="Visuel de liste vide" />
        <h2>Liste vide</h2>
        <p>Les livres ajoutés s'afficheront ici.</p>
    </div>
);

export default EmptyBooks;