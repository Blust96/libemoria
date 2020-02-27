import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Alerts from './components/layout/Alerts';
import Books from './components/books/Books';
import CreateBook from './components/books/CreateBook';
import BookDetails from './components/books/BookDetails';
import BookUpdate from './components/books/BookUpdate';
import NotFound from './components/pages/NotFound';

import BookState from './context/book/BookState';
import AlertState from './context/alert/AlertState';

import './App.css';

function App() {
    return (
        <BookState>
            <AlertState>
                <Router>
                    <div className="App">
                        <Switch>
                            <Route exact path='/' component={Books} />
                            <Route exact path='/create' component={CreateBook} />
                            <Route exact path='/details/:id' component={BookDetails} />
                            <Route exact path='/update/:id' component={BookUpdate} />
                            <Route component={NotFound} />
                        </Switch>
                        <Alerts />
                    </div>
                </Router>
            </AlertState>
        </BookState>
    );
}

export default App;
