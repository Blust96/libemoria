import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Plus } from '../svg';
import Navbar from '../layout/Navbar';
import LoadingView from '../layout/LoadingView';
import EmptyBooks from './EmptyBooks';
import BookCard from './BookCard';

import BookContext from '../../context/book/BookContext';
import AlertContext from '../../context/alert/AlertContext';

const Books = () => {

    // Get books context
    const bookContext = useContext(BookContext);
    const { isLoading, books, getBooksList, removeBook } = bookContext;

    // Get alerts context
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    

    useEffect(() => {
        getBooksList();
    }, []);

    // Remove book confirmation alert
    const removeBookAlert = async id => {
        if(window.confirm("Êtes-vous sûr de vouloir supprimer ce livre ?")) { 
            await removeBook(id);
            setAlert('Le livre a bien été supprimé.', 'validation');
        }
    }

    // Render
    if (isLoading) 
        return <LoadingView />
    else if (books.length === 0)
        return (
            <div id="background" style={{ backgroundColor: '#fdfdfd' }}>
                <Navbar />
                <EmptyBooks />
            </div>
        )
    else {
        return (
            <div id="background" style={{ backgroundColor: '#fdfdfd' }}>
                <Navbar />
                <Link to='/create' id='create-button'>
                    <Plus />
                </Link>
                <div className="container" id="book-container">
                    { books.map(book => (
                        <BookCard key={book._id} book={book} removeBook={() => removeBookAlert(book._id)} />
                    )) }
                </div>
            </div>
        )
    }

}

export default Books;