import PouchDB from 'pouchdb';
const db = new PouchDB('book-reminder');
const remoteCouch = false;

export default db;