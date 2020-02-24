import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Books from './components/books/Books';
import CreateBook from './components/books/CreateBook';
import BookDetails from './components/books/BookDetails';
import BookUpdate from './components/books/BookUpdate';
import NotFound from './components/pages/NotFound';

import BookState from './context/book/BookState';

import './App.css';

function App() {
    return (
        <BookState>
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact path='/' component={Books} />
                        <Route exact path='/create' component={CreateBook} />
                        <Route exact path='/details/:id' component={BookDetails} />
                        <Route exact path='/update/:id' component={BookUpdate} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        </BookState>
    );
}

export default App;
