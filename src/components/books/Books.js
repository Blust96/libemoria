import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PWAPrompt from 'react-ios-pwa-prompt'

import { Plus } from '../svg';
import Navbar from '../layout/Navbar';
import LoadingView from '../layout/LoadingView';
import BookGenreFilter from './BookGenreFilter';
import EmptyBooks from './EmptyBooks';
import BookCard from './BookCard';

import BookContext from '../../context/book/BookContext';
import AlertContext from '../../context/alert/AlertContext';

const Books = () => {

    // Get books context
    const bookContext = useContext(BookContext);
    const { isLoading, books, filteredBooks, getBooksList, removeBook } = bookContext;

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
            setAlert("Le livre a bien été supprimé.", 'validation');
        }
    }

    // Render
    return (
        <div id="background" style={{ backgroundColor: '#fdfdfd' }}>
            <Navbar />
            { isLoading ? 
                (
                    <LoadingView />
                ) : (
                    <>
                        <Link to="/create" id="create-button">
                            <Plus />
                        </Link>
                        { books.length > 0 ?
                            (
                                <>
                                <BookGenreFilter />
                                { filteredBooks !== null ? (
                                    <div className="container" id="book-container">
                                        { filteredBooks.map(book => (
                                            <BookCard key={book._id} book={book} removeBook={() => removeBookAlert(book._id)} />
                                        )) }
                                    </div>
                                ) : (
                                    <div className="container" id="book-container">
                                        { books.map(book => (
                                            <BookCard key={book._id} book={book} removeBook={() => removeBookAlert(book._id)} />
                                        )) }
                                    </div>
                                )}
                                </>
                            ) : 
                            (
                                <EmptyBooks />
                            )
                        }
                    </>
                )
            }
            <PWAPrompt 
                promptOnVisit={2} 
                copyTitle="Ajouter à l'écran d'accueil"
                copyBody="Ce site peut être utilisé comme une application. Ajoutez-le à votre écran d'accueil pour l'utiliser en plein écran, et sans connexion."
                copyShareButtonLabel="1) Appuyez sur le bouton 'Partager'"
                copyAddHomeButtonLabel="2) Appuyez sur 'Ajouter à l'écran d'accueil'"
                copyClosePrompt="Annuler"
            />
        </div>
    );

}

export default Books;