import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

import BookState from './context/book/BookState';

import './App.css';

function App() {
    return (
        <BookState>
            <Router>
                <div className="App">
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        </BookState>
    );
}

export default App;
