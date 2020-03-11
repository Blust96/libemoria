import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Prompt, useParams, useHistory } from 'react-router-dom';

import { isISBN } from '../../utils';

import Navbar from '../layout/Navbar';
import LoadingView from '../layout/LoadingView';

import BookContext from '../../context/book/BookContext';
import AlertContext from '../../context/alert/AlertContext';

const BookUpdate = () => {

    // Get books context
    const bookContext = useContext(BookContext);
    const { isLoading, book, setBook, modifyBook } = bookContext;

    // Get alerts context
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    // React hook form declarations
    const { register, handleSubmit, errors } = useForm();

    // Get routes history
    const history = useHistory();

    // Get params
    const params = useParams();

    // Boolean to check if form have been submitted
    const [submitted, setSubmitted] = useState(false);

    // Boolean to check if navigation should be blocked
    const [isBlocking, setIsBlocking] = useState(false);

    useEffect(() => {
        submitted && history.push(`/details/${params.id}`);
        setBook(params.id);
    }, [submitted]);

    // onSubmit function
    const onSubmit = values => {
        modifyBook({ ...book, ...values });
        setIsBlocking(false);
        setSubmitted(true);
    }

    const {
        title,
        author,
        genre,
        isbn,
        description,
        cover,
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
                <form onSubmit={handleSubmit(onSubmit)}  onChange={event => { setIsBlocking(event.target.value.length > 0) }}>
                    {/* Titre */}
                    <div>
                        <label htmlFor="title">Titre du livre</label>
                        <input name="title" placeholder="Titre du livre" ref={register({ required: true })} defaultValue={title} />
                        {errors.title && "Requis"}
                    </div>
                    {/* Auteur */}
                    <div>
                        <label htmlFor="author">Auteur du livre</label>
                        <input name="author" placeholder="Auteur du livre" ref={register({ required: true })} defaultValue={author} />
                        {errors.author && "Requis"}
                    </div>
                    {/* Genre */}
                    <div>
                        <label htmlFor="genre">Genre</label>
                        <select name="genre" placeholder="Genre" ref={register} defaultValue={genre} >
                            <option value="science_fiction">Science-fiction</option>
                            <option value="policier">Policier</option>
                            <option value="thriller">Thriller</option>
                            <option value="manga">Manga</option>
                        </select>
                    </div>
                    {/* ISBN */}
                    <div>
                        <label htmlFor="isbn">ISBN</label>
                        <input name="isbn" placeholder="ISBN" ref={register({ validate: value => isISBN(value) })} defaultValue={isbn} />
                        {errors.isbn && "ISBN incorrect"}
                    </div>
                    {/* Description */}
                    <div>
                        <label htmlFor="description">Description</label>
                        <input name="description" placeholder="Description" ref={register} defaultValue={description} />
                    </div>
                    {/* Couverture */}
                    <div>
                        <label htmlFor="cover">Couverture du livre</label>
                        {
                            cover
                            ? <img src={URL.createObjectURL(cover)} alt={title} />
                            : (<div style={{ width: '80px', height: '140px', backgroundColor: '#000' }}></div>)
                        }
                        <input type="file" accept="image/*" capture name="cover" ref={register} />
                    </div>
                    {/* Favoris */}
                    <label htmlFor="favorite">Favoris</label>
                    <input type="checkbox" name="favorite" ref={register} defaultChecked={favorite} />
                    {/* Lu */}
                    <label htmlFor="read">Lu</label>
                    <input type="checkbox" name="read" ref={register} defaultChecked={read} />
                    {/* Envie */}
                    <label htmlFor="wish">Envie</label>
                    <input type="checkbox" name="wish" ref={register} defaultChecked={wish} />
                    <input type="submit" />
                </form>
                <Prompt
                    when={isBlocking}
                    message={() => "Voulez-vous abandonner la modification du livre ?"}
                />
            </Fragment>
        );
    }

}

export default BookUpdate;