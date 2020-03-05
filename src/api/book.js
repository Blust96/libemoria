import db from './config';
import { generateId } from '../utils';

/**
 * Get all books
 */
const getBooks = async () => {

    try {

        let res = await db.allDocs({
            include_docs: true,
            attachments: true
        });

        let docs = Promise.all(
            res.rows.map(async row => {
                if(row.doc._attachments && Object.keys(row.doc._attachments).length > 0)
                    row.doc.cover = await getCover(row.doc._id, Object.keys(row.doc._attachments)[0]);
                return row.doc;
            })
        );

        return docs;

    } catch(err) {
        console.log(err);
    }

}

/**
 * Get book by id
 * 
 * @param {String} id Book id
 */
const getBook = async id => {

    try {
        let book = await db.get(id, {attachments: true});
        if(book._attachments && Object.keys(book._attachments).length > 0)
            book.cover = await getCover(book._id, Object.keys(book._attachments)[0]);
        console.log(book);
        return book;
    } catch(err) {
        console.log(err);
    }

}

/**
 * Create new book
 * 
 * @param {Object} props Book fields
 */
const createBook = async props => {

    try {
        let res = await db.put({
            _id: generateId(),
            _attachments: props._attachments,
            title: props.title,
            author: props.author,
            genre: props.genre,
            isbn: props.isbn,
            description: props.description,
            favorite: props.favorite,
            read: props.read,
            wish: props.wish
        });
        return res;
    } catch(err) {
        console.log(err);
    }

}

/**
 * Update existing book
 * 
 * @param {Object} props Book fields
 */
const updateBook = async props => {

    try {
        const book = await db.get(props._id);
        let res = await db.put({
            _id: props._id,
            _rev: book._rev,
            _attachments: props._attachments,
            title: props.title,
            author: props.author,
            genre: props.genre,
            isbn: props.isbn,
            description: props.description,
            favorite: props.favorite,
            read: props.read,
            wish: props.wish
        });
        return res;
    } catch(err) {
        console.log(err);
    }

}

/**
 * Delete existing book
 * 
 * @param {String} id Book id
 */
const deleteBook = async id => {

    try {
        const book = await db.get(id);
        let res = await db.remove(book);
        return res;
    } catch (err) {
        console.log(err);
    }

}

/**
 * Get book's cover
 * 
 * @param {String} id Book id
 * @param {String} name Attachment name
 */
const getCover = async (id, name) => {
    
    try {
        return await db.getAttachment(id, name);
    } catch(err) {
        console.log(err);
    }

}

export {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}