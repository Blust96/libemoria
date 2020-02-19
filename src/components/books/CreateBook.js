import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';

const CreateBook = () => {

    // React hook form declarations
    const { register, handleSubmit, errors } = useForm();

    // onSubmit function
    const onSubmit = values => {
        console.log(values);
    }

    return <Fragment>
        <h1>Créer un livre !</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="title" placeholder="Titre du livre" ref={register({ required: true })} />
            <input name="author" placeholder="Auteur du livre" ref={register({ required: true })} />
            <label htmlFor="genre">Genre</label>
            <select name="genre" placeholder="Genre" ref={register({ required: true })}>
                <option value="male">male</option>
                <option value="female">female</option>
            </select>
            <input name="isbn" placeholder="ISBN" ref={register({ required: true })} />
            <input name="description" placeholder="Description" ref={register({ required: true })} />
            <input name="coverPath" placeholder="Couverture" ref={register({ required: true })} />
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