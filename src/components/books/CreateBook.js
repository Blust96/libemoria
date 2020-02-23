import React, { Fragment, useContext } from 'react';
import { useForm } from 'react-hook-form';

import BookContext from '../../context/book/BookContext';

const CreateBook = () => {

    // Get books context
    const bookContext = useContext(BookContext);
    const { books, addBook } = bookContext;

    // React hook form declarations
    const { register, handleSubmit, errors } = useForm();

    // onSubmit function
    const onSubmit = values => {
        addBook(books, values);
    }

    return <Fragment>
        <h1>Créer un livre !</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="title">Titre du livre</label>
            <input name="title" placeholder="Titre du livre" ref={register({ required: true })} />
            <label htmlFor="author">Auteur du livre</label>
            <input name="author" placeholder="Auteur du livre" ref={register({ required: true })} />
            <label htmlFor="genre">Genre</label>
            <select name="genre" placeholder="Genre" ref={register({ required: true })}>
                <option value="science_fiction">Science-fiction</option>
                <option value="policier">Policier</option>
                <option value="thriller">Thriller</option>
                <option value="manga">Manga</option>
            </select>
            <label htmlFor="isbn">ISBN</label>
            <input name="isbn" placeholder="ISBN" ref={register} /> { /* register({ pattern: /^(97(8|9))?\d{9}(\d|X)$/i }) */ }
            <label htmlFor="description">Description</label>
            <input name="description" placeholder="Description" ref={register} />
            <label htmlFor="coverPath">Couverture du livre</label>
            <input name="coverPath" placeholder="Couverture" ref={register} />
            <label htmlFor="favorite">Favoris</label>
            <input type="checkbox" name="favorite" ref={register} />
            <label htmlFor="read">Lu</label>
            <input type="checkbox" name="read" ref={register} />
            <label htmlFor="wish">Envie</label>
            <input type="checkbox" name="wish" ref={register} />
            <input type="submit" />
        </form>
    </Fragment>
};

export default CreateBook;