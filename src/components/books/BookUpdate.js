import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Prompt, useParams, useHistory } from 'react-router-dom';

import { isISBN } from '../../utils';

import { Capture, Delete, Favorite, Read, Bought } from '../svg';
import Navbar from '../layout/Navbar';
import LoadingView from '../layout/LoadingView';

import BookContext from '../../context/book/BookContext';
import AlertContext from '../../context/alert/AlertContext';

const BookUpdate = () => {

    // Get books context
    const bookContext = useContext(BookContext);
    const { isLoading, book, setBook, modifyBook, resetCover } = bookContext;

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

    // Set preview cover
    const [bookCover, setBookCover] = useState(null);
    // Input file event
    const [fileEvent, setFileEvent] = useState(null);

    const {
        title,
        author,
        genre,
        isbn,
        description,
        cover,
        favorite,
        read,
        bought
    } = book;

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

    // onCoverChange function
    const onCoverChange = event => {
        event.persist();
        setBookCover(event.target.files[0]);
        setFileEvent(event);
    }

    // Reset current cover input value
    const resetBookCover = async () => {
        await resetCover();
        if(fileEvent) {
            fileEvent.target.value = '';
            setBookCover(null);
        }
    }

    if (isLoading) 
        return <LoadingView />
    else {
        return (
            <div id="background" style={ 
                cover 
                ? { backgroundImage: `linear-gradient(rgba(167, 62, 208, 0.2), white), url(${URL.createObjectURL(cover)})` } 
                : { backgroundColor: '#edc0ff' } }>
                <Navbar props={{ id: params.id }}/>
                <section className="content-section">
                    <div className="container">
                        <form id="update-form" onSubmit={handleSubmit(onSubmit)} onChange={event => { setIsBlocking(event.target.value.length > 0) }} autoComplete="off">
                            {/* Couverture */}
                            <div className="book-input-cover">
                                <input type="file" accept="image/*" capture name="cover" id="cover" ref={register} onChange={event => onCoverChange(event)} />
                                <label htmlFor="cover" className="cover-button update-cover-button">
                                    <Capture />
                                </label>
                                {
                                    bookCover
                                    ? <img className='book-cover' src={URL.createObjectURL(bookCover)} alt={title} />
                                    : cover
                                    ? <img className='book-cover' src={URL.createObjectURL(cover)} alt={title} />
                                    : <img className='book-cover' src='/cover_placeholder.png' alt='Cover placeholder' />
                                }
                                <button className="cover-button delete-cover-button" type="button" onClick={resetBookCover}>
                                    <Delete />
                                </button>
                            </div>
                            <div className="book-state">
                                {/* Favoris */}
                                <div>
                                    <input type="checkbox" name="favorite" id="favorite" ref={register} defaultChecked={favorite} />
                                    <label htmlFor="favorite">
                                        <Favorite />
                                        <br/>
                                        Favoris
                                    </label>
                                </div>
                                {/* Lu */}
                                <div>
                                    <input type="checkbox" name="read" id="read" ref={register} defaultChecked={read} />
                                    <label htmlFor="read">
                                        <Read />
                                        <br/>
                                        Lu
                                    </label>
                                </div>
                                {/* Envie */}
                                <div>
                                    <input type="checkbox" name="bought" id="bought" ref={register} defaultChecked={bought} />
                                    <label htmlFor="bought">
                                        <Bought />
                                        <br/>
                                        Acheté
                                    </label>
                                </div>
                            </div>
                            <h3>Informations</h3>
                            {/* Titre */}
                            <div className={errors.title ? "book-input book-input-error" : "book-input"}>
                                <input name="title" id="title" placeholder="ex. Le Petit Prince" ref={register({ required: true })} defaultValue={title} />
                                <label htmlFor="title">
                                    {errors.title ? 'Titre du livre - Requis' : 'Titre du livre'}
                                </label>
                            </div>
                            {/* Auteur */}
                            <div className={errors.author ? "book-input book-input-error" : "book-input"}>
                                <input name="author" id="author" placeholder="ex. Antoine de Saint-Exupéry" ref={register({ required: true })} defaultValue={author} />
                                <label htmlFor="author">
                                    {errors.author ? 'Auteur du livre - Requis' : 'Auteur du livre'}
                                </label>
                            </div>
                            {/* Genre */}
                            <div className="book-input book-input-genre">
                                <select name="genre" id="genre" placeholder="Genre" ref={register} defaultValue={genre} >
                                    <option value="science_fiction">Science-fiction</option>
                                    <option value="policier">Policier</option>
                                    <option value="thriller">Thriller</option>
                                    <option value="passion">Passion</option>
                                </select>
                                <label htmlFor="genre">Genre</label>
                            </div>
                            {/* ISBN */}
                            <div className={errors.isbn ? "book-input book-input-error" : "book-input"}>
                                <input name="isbn" id="isbn" placeholder="ex. 2070612759" ref={register({ validate: value => isISBN(value) })} defaultValue={isbn} />
                                <label htmlFor="isbn">
                                    {errors.isbn ? 'ISBN incorrect' : 'ISBN'}
                                </label>
                            </div>
                            {/* Description */}
                            <div className="book-input">
                                <textarea name="description" id="description" placeholder="ex. Le premier soir, je me suis donc endormi sur le sable à mille milles de toute terre habitée. J'étais bien plus isolé qu'un naufragé..." ref={register} defaultValue={description}></textarea>
                                <label htmlFor="description">
                                    Description
                                </label>
                            </div>
                        </form>
                    </div>
                </section>
                <Prompt
                    when={isBlocking}
                    message={() => "Voulez-vous abandonner la modification du livre ?"}
                />
            </div>
        );
    }

}

export default BookUpdate;