import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Alerts from './components/layout/Alerts';
import Books from './components/books/Books';
import BookCreation from './components/books/BookCreation';
import BookDetails from './components/books/BookDetails';
import BookUpdate from './components/books/BookUpdate';
import NotFound from './components/pages/NotFound';

import BookState from './context/book/BookState';
import AlertState from './context/alert/AlertState';

function App() {
    return (
        <BookState>
            <AlertState>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Books} />
                        <Route exact path='/create' component={BookCreation} />
                        <Route exact path='/details/:id' component={BookDetails} />
                        <Route exact path='/update/:id' component={BookUpdate} />
                        <Route component={NotFound} />
                    </Switch>
                    <Alerts />
                </Router>
            </AlertState>
        </BookState>
    );
}

export default App;
