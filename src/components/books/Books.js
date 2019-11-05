import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoadingView from '../layout/LoadingView';
import EmptyBooks from './EmptyBooks';
import CreateBook from './CreateBook';
import BooksList from './BooksList';

import BookContext from '../../context/book/BookContext';

const Books = () => {

    // Get books context
    const bookContext = useContext(BookContext);

    const { isLoading, books } = bookContext;

    // Render
    if (isLoading) 
        return <LoadingView />
    else if (books.length === 0)
        return <EmptyBooks />
    else {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={BooksList} />
                    <Route exact path="/create" component={CreateBook} />
                </Switch>
            </Router>
        )
    }

}

export default Books;