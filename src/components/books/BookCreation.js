import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Prompt, useHistory } from 'react-router-dom';

import { isISBN } from '../../utils';

import Navbar from '../layout/Navbar';

import BookContext from '../../context/book/BookContext';
import AlertContext from '../../context/alert/AlertContext';

const BookCreation = () => {

    // Get books context
    const bookContext = useContext(BookContext);
    const { book, addBook } = bookContext;

    // Get alerts context
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    // React hook form declarations
    const { register, handleSubmit, errors } = useForm();

    // Get routes history
    const history = useHistory();

    // Boolean to check if form have been submitted
    const [submitted, setSubmitted] = useState(false);

    // Boolean to check if navigation should be blocked
    const [isBlocking, setIsBlocking] = useState(false);

    // Set preview cover
    const [bookCover, setBookCover] = useState(null);
    // Input file event
    const [fileEvent, setFileEvent] = useState(null);

    // Checking book after creation
    useEffect(() => {
        submitted && history.push(`/details/${book._id}`);
    }, [book]);

    // onSubmit function
    const onSubmit = values => {
        addBook(values);
        setIsBlocking(false);
        setSubmitted(true);
    }

    // onCoverChange function
    const onCoverChange = event => {
        event.persist();
        setBookCover(event.target.files[0]);
        setFileEvent(event);
    }

    // Reset current cover input value
    const resetBookCover = () => {
        if(fileEvent) {
            fileEvent.target.value = '';
            setBookCover(null);
        }
    }

    return (
        <Fragment>
            <Navbar route={'create'} />
            <section className="content-section">
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)} onChange={event => { setIsBlocking(event.target.value.length > 0) }} autocomplete="off">
                        {/* Couverture */}
                        <div className="book-input-cover">
                            <input type="file" accept="image/*" capture name="cover" id="cover" ref={register} onChange={event => onCoverChange(event)} />
                            <label htmlFor="cover" class="cover-button update-cover-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M 9.28125 3 C 8.179688 3 7.230469 3.808594 7.007813 4.929688 L 6.8125 6 L 4.351563 6 C 3.050781 6 2 7.050781 2 8.339844 L 2 18.671875 C 2 19.960938 3.050781 21 4.339844 21 L 19.660156 21 C 20.949219 21 22 19.960938 22 18.671875 L 22 8.328125 C 22 7.039063 20.949219 6 19.660156 6 L 17.1875 6 L 16.988281 4.929688 C 16.769531 3.808594 15.820313 3 14.71875 3 Z M 11.96875 9 C 14.511719 9 16.570313 11.011719 16.570313 13.5 C 16.570313 15.988281 14.511719 18 11.96875 18 C 9.429688 18 7.367188 15.988281 7.367188 13.5 C 7.367188 11.011719 9.429688 9 11.96875 9 Z M 11.96875 11 C 10.53125 11 9.367188 12.121094 9.367188 13.5 C 9.367188 14.878906 10.53125 16 11.96875 16 C 13.402344 16 14.570313 14.878906 14.570313 13.5 C 14.570313 12.121094 13.402344 11 11.96875 11 Z"/>
                                </svg>
                            </label>
                            {
                                bookCover
                                ? <img className='book-cover' src={URL.createObjectURL(bookCover)} alt='Cover' />
                                : <img className='book-cover' src='/cover_placeholder.png' alt='Cover placeholder' />
                            }
                            <button className="cover-button delete-cover-button" type="button" onClick={resetBookCover}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M 10.3125 -0.03125 C 8.589844 -0.03125 7.164063 1.316406 7 3 L 2 3 L 2 5 L 6.96875 5 L 6.96875 5.03125 L 17.03125 5.03125 L 17.03125 5 L 22 5 L 22 3 L 17 3 C 16.84375 1.316406 15.484375 -0.03125 13.8125 -0.03125 Z M 10.3125 2.03125 L 13.8125 2.03125 C 14.320313 2.03125 14.695313 2.429688 14.84375 2.96875 L 9.15625 2.96875 C 9.296875 2.429688 9.6875 2.03125 10.3125 2.03125 Z M 4 6 L 4 22.5 C 4 23.300781 4.699219 24 5.5 24 L 18.59375 24 C 19.394531 24 20.09375 23.300781 20.09375 22.5 L 20.09375 6 Z M 7 9 L 8 9 L 8 22 L 7 22 Z M 10 9 L 11 9 L 11 22 L 10 22 Z M 13 9 L 14 9 L 14 22 L 13 22 Z M 16 9 L 17 9 L 17 22 L 16 22 Z"/>
                               </svg>
                            </button>
                        </div>
                        {/* Titre */}
                        <div className={errors.title ? "book-input book-input-error" : "book-input"}>
                            <input name="title" id="title" placeholder="ex. Le Petit Prince" ref={register({ required: true })} />
                            <label htmlFor="title">
                                {errors.title ? 'Titre du livre - Requis' : 'Titre du livre'}
                            </label>
                        </div>
                        {/* Auteur */}
                        <div className={errors.author ? "book-input book-input-error" : "book-input"}>
                            <input name="author" id="author" placeholder="ex. Antoine de Saint-Exupéry" ref={register({ required: true })} />
                            <label htmlFor="author">
                                {errors.author ? 'Auteur du livre - Requis' : 'Auteur du livre'}
                            </label>
                        </div>
                        {/* Genre */}
                        <div className="book-input book-input-genre">
                                <select name="genre" id="genre" placeholder="Genre" ref={register} >
                                    <option value="science_fiction">Science-fiction</option>
                                    <option value="policier">Policier</option>
                                    <option value="thriller">Thriller</option>
                                    <option value="manga">Manga</option>
                                </select>
                                <label htmlFor="genre">Genre</label>
                            </div>
                        {/* ISBN */}
                        <div className={errors.isbn ? "book-input book-input-error" : "book-input"}>
                            <input name="isbn" id="isbn" placeholder="ex. 2070612759" ref={register({ validate: value => isISBN(value) })} />
                            <label htmlFor="isbn">
                                {errors.isbn ? 'ISBN incorrect' : 'ISBN'}
                            </label>
                        </div>
                        {/* Description */}
                        <div className="book-input">
                            <textarea name="description" id="description" placeholder="ex. Le premier soir, je me suis donc endormi sur le sable à mille milles de toute terre habitée. J'étais bien plus isolé qu'un naufragé..." ref={register} ></textarea>
                            <label htmlFor="description">
                                Description
                            </label>
                        </div>
                        <h3>Etats</h3>
                        <div class="book-state">
                            {/* Favoris */}
                            <div>
                                <label htmlFor="favorite">Favoris</label>
                                <input type="checkbox" name="favorite" id="favorite" ref={register} />
                            </div>
                            {/* Lu */}
                            <div>
                                <label htmlFor="read">Lu</label>
                                <input type="checkbox" name="read" id="read" ref={register} />
                            </div>
                            {/* Envie */}
                            <div>
                                <label htmlFor="wish">Envie</label>
                                <input type="checkbox" name="wish" id="wish" ref={register} />
                            </div>
                        </div>
                        <input className="button" type="submit" value="Créer" />
                    </form>
                </div>
            </section>
            <Prompt
                when={isBlocking}
                message={() => "Voulez-vous abandonner la saisie du livre ?"}
            />
        </Fragment>
    );
};

export default BookCreation;