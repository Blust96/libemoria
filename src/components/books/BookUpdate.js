import React, { Fragment, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Navbar from '../layout/Navbar';
import LoadingView from '../layout/LoadingView';

import BookContext from '../../context/book/BookContext';

const BookUpdate = () => {

    // Get books context
    const bookContext = useContext(BookContext);
    const { isLoading, book, setBook, modifyBook } = bookContext;

    // React hook form declarations
    const { register, handleSubmit, errors } = useForm();

    // onSubmit function
    const onSubmit = values => {
        modifyBook({ ...book, ...values });
    }

    // Get params
    const params = useParams();

    useEffect(() => {
        setBook(params.id)
    }, []);

    const {
        title,
        author,
        genre,
        isbn,
        description,
        coverPath,
        favorite,
        read,
        wish
    } = book;

    if (isLoading) 
        return <LoadingView />
    else {
        return (
            <Fragment>
                <Navbar route={'update'} props={{ id: params.id, title }}/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="title">Titre du livre</label>
                    <input name="title" placeholder="Titre du livre" ref={register({ required: true })} defaultValue={title} />
                    <label htmlFor="author">Auteur du livre</label>
                    <input name="author" placeholder="Auteur du livre" ref={register({ required: true })} defaultValue={author} />
                    <label htmlFor="genre">Genre</label>
                    <select name="genre" placeholder="Genre" ref={register({ required: true })} defaultValue={genre} >
                        <option value="science_fiction">Science-fiction</option>
                        <option value="policier">Policier</option>
                        <option value="thriller">Thriller</option>
                        <option value="manga">Manga</option>
                    </select>
                    <label htmlFor="isbn">ISBN</label>
                    <input name="isbn" placeholder="ISBN" ref={register} defaultValue={isbn} /> { /* register({ pattern: /^(97(8|9))?\d{9}(\d|X)$/i }) */ }
                    <label htmlFor="description">Description</label>
                    <input name="description" placeholder="Description" ref={register} defaultValue={description} />
                    <label htmlFor="coverPath">Couverture du livre</label>
                    <input name="coverPath" placeholder="Couverture" ref={register} defaultValue={coverPath} />
                    <label htmlFor="favorite">Favoris</label>
                    <input type="checkbox" name="favorite" ref={register} defaultChecked={favorite} />
                    <label htmlFor="read">Lu</label>
                    <input type="checkbox" name="read" ref={register} defaultChecked={read} />
                    <label htmlFor="wish">Envie</label>
                    <input type="checkbox" name="wish" ref={register} defaultChecked={wish} />
                    <input type="submit" />
                </form>
            </Fragment>
        );
    }

}

export default BookUpdate;