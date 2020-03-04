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

    return (
        <Fragment>
            <Navbar route={'create'} />
            <form onSubmit={handleSubmit(onSubmit)} onChange={event => { setIsBlocking(event.target.value.length > 0) }}>
                {/* Titre */}
                <label htmlFor="title">Titre du livre</label>
                {errors.title && "Requis"}
                <input name="title" placeholder="Titre du livre" ref={register({ required: true })} />
                {/* Auteur */}
                <label htmlFor="author">Auteur du livre</label>
                {errors.author && "Requis"}
                <input name="author" placeholder="Auteur du livre" ref={register({ required: true })} />
                {/* Genre */}
                <label htmlFor="genre">Genre</label>
                <select name="genre" placeholder="Genre" ref={register}>
                    <option value="science_fiction">Science-fiction</option>
                    <option value="policier">Policier</option>
                    <option value="thriller">Thriller</option>
                    <option value="manga">Manga</option>
                </select>
                {/* ISBN */}
                <label htmlFor="isbn">ISBN</label>
                <input name="isbn" placeholder="ISBN" ref={register({ validate: value => isISBN(value) })} />
                {errors.isbn && "Veuillez renseigner un ISBN correct"}
                {/* Description */}
                <label htmlFor="description">Description</label>
                <input name="description" placeholder="Description" ref={register} />
                {/* Couverture */}
                <label htmlFor="cover">Couverture du livre</label>
                <input type="file" accept="image/*" capture name="cover" ref={register} />
                {/* Favoris */}
                <label htmlFor="favorite">Favoris</label>
                <input type="checkbox" name="favorite" ref={register} />
                {/* Lu */}
                <label htmlFor="read">Lu</label>
                <input type="checkbox" name="read" ref={register} />
                {/* Envie */}
                <label htmlFor="wish">Envie</label>
                <input type="checkbox" name="wish" ref={register} />
                <input type="submit" />
            </form>
            <Prompt
                when={isBlocking}
                message={() => "Voulez-vous abandonner la saisie du livre ?"}
            />
        </Fragment>
    );
};

export default BookCreation;