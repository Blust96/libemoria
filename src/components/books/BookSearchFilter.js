import React, { useContext, useRef, useEffect } from 'react';

import BookContext from '../../context/book/BookContext';

import { Search } from '../svg';

const BookSearchFilter = () => {

    // Get books context
    const bookContext = useContext(BookContext);
    const { searchFilter, updateSearchFilter, resetSearchFilter } = bookContext;

    const input = useRef('');

    useEffect(() => {
        input.current.value = searchFilter;
    });

    const onChange = e => {
        updateSearchFilter(e.target.value);
    };

    return (
        <div id="search-filter">
            <Search />
            <input
                ref={input}
                type='text'
                placeholder="Filtrer par titre, auteur ou ISBN"
                onChange={onChange}
            />
            {
                searchFilter !== ''
                ? (
                    <button type="button" onClick={() => resetSearchFilter()}>
                        x
                    </button>
                ) : null
            }
        </div>
    )

}

export default BookSearchFilter;