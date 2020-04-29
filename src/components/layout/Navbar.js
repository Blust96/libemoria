import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { Favorite, Back, Update, Read } from '../svg';

import { getCurrentRoute } from '../../utils.js';

// Home navbar component
const HomeBar = () => (
    <div className="container nav-container">
        <h1>Home</h1>
    </div>
);

// Create navbar component
const CreateBar = () => (
    <div className="container nav-container">
        <Link className="button" to='/'>
            <Back />
        </Link>
    </div>
);

// Details navbar component
const DetailsBar = ({ props }) => (
    <div className="container nav-container">
        <Link className="button" to='/'>
            <Back />
        </Link>
        <div>
            <button type="button" onClick={() => props.setFavorite()}>
                <Favorite favorite={props.book.favorite} style={{ marginTop: 2 }} />
            </button>
            <Link className="button" to={`/update/${props.id}`}>
                <Update />
            </Link>
        </div>
    </div>
);

// Update navbar component
const UpdateBar = ({ history }) => (
    <div className="container nav-container">
        <button type="button" onClick={() => history.goBack()}>
            <Back />
        </button>
        <button type="submit" form="update-form">
            <Read />
        </button>
    </div>
);

// Rendering navbar component
const Navbar = ({ props }) => {

    // Get routes history
    const history = useHistory();

    // Get route location
    const location = useLocation();
    const route = getCurrentRoute(location.pathname);

    const renderNav = (route) => {
        switch(route) {
            case 'create': 
                return <CreateBar />;
            case 'details': 
                return <DetailsBar props={props} />;
            case 'update':
                return <UpdateBar history={history} props={props} />
            case 'home':
            default:
                return <HomeBar />;
        }
    }

    return (
        <header>
            <nav id={`nav-${route}`}>
                { renderNav(route) }
            </nav>
        </header>
    );

}

export default Navbar;