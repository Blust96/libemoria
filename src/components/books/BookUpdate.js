import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Prompt, useParams, useHistory } from 'react-router-dom';

import { isISBN } from '../../utils';

import { Favorite, Read, Bought } from '../svg';
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M 9.28125 3 C 8.179688 3 7.230469 3.808594 7.007813 4.929688 L 6.8125 6 L 4.351563 6 C 3.050781 6 2 7.050781 2 8.339844 L 2 18.671875 C 2 19.960938 3.050781 21 4.339844 21 L 19.660156 21 C 20.949219 21 22 19.960938 22 18.671875 L 22 8.328125 C 22 7.039063 20.949219 6 19.660156 6 L 17.1875 6 L 16.988281 4.929688 C 16.769531 3.808594 15.820313 3 14.71875 3 Z M 11.96875 9 C 14.511719 9 16.570313 11.011719 16.570313 13.5 C 16.570313 15.988281 14.511719 18 11.96875 18 C 9.429688 18 7.367188 15.988281 7.367188 13.5 C 7.367188 11.011719 9.429688 9 11.96875 9 Z M 11.96875 11 C 10.53125 11 9.367188 12.121094 9.367188 13.5 C 9.367188 14.878906 10.53125 16 11.96875 16 C 13.402344 16 14.570313 14.878906 14.570313 13.5 C 14.570313 12.121094 13.402344 11 11.96875 11 Z"/>
                                    </svg>
                                </label>
                                {
                                    bookCover
                                    ? <img className='book-cover' src={URL.createObjectURL(bookCover)} alt={title} />
                                    : cover
                                    ? <img className='book-cover' src={URL.createObjectURL(cover)} alt={title} />
                                    : <img className='book-cover' src='/cover_placeholder.png' alt='Cover placeholder' />
                                }
                                <button className="cover-button delete-cover-button" type="button" onClick={resetBookCover}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M 10.3125 -0.03125 C 8.589844 -0.03125 7.164063 1.316406 7 3 L 2 3 L 2 5 L 6.96875 5 L 6.96875 5.03125 L 17.03125 5.03125 L 17.03125 5 L 22 5 L 22 3 L 17 3 C 16.84375 1.316406 15.484375 -0.03125 13.8125 -0.03125 Z M 10.3125 2.03125 L 13.8125 2.03125 C 14.320313 2.03125 14.695313 2.429688 14.84375 2.96875 L 9.15625 2.96875 C 9.296875 2.429688 9.6875 2.03125 10.3125 2.03125 Z M 4 6 L 4 22.5 C 4 23.300781 4.699219 24 5.5 24 L 18.59375 24 C 19.394531 24 20.09375 23.300781 20.09375 22.5 L 20.09375 6 Z M 7 9 L 8 9 L 8 22 L 7 22 Z M 10 9 L 11 9 L 11 22 L 10 22 Z M 13 9 L 14 9 L 14 22 L 13 22 Z M 16 9 L 17 9 L 17 22 L 16 22 Z"/>
                                    </svg>
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