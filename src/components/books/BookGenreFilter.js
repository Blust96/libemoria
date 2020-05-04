import React, { useContext } from 'react';

import BookContext from '../../context/book/BookContext';

import { Reset } from '../svg';

const BookGenreFilter = () => {

    // Get books context
    const bookContext = useContext(BookContext);
    const { genresFilter, updateGenresFilter, resetGenresFilter } = bookContext;

    // Toggle filter
    const toggleGenreFilter = genre => {
        updateGenresFilter(genre);
    }

    // Check if filter is active
    const isFilterActive = genre => {
        return genresFilter.includes(genre) ? 'active' : '';
    }

    return (
        <ul id="genre-filters-container">
            <li className='active' onClick={() => resetGenresFilter()}><Reset /></li>
            <div id="genre-filters">
                <li className={isFilterActive('science_fiction')} onClick={() => updateGenresFilter('science_fiction')}>Science-fiction</li>
                <li className={isFilterActive('policier')} onClick={() => updateGenresFilter('policier')}>Policier</li>
                <li className={isFilterActive('thriller')} onClick={() => updateGenresFilter('thriller')}>Thriller</li>
                <li className={isFilterActive('passion')} onClick={() => updateGenresFilter('passion')}>Passion</li>
            </div>
        </ul>
    )

}

export default BookGenreFilter;