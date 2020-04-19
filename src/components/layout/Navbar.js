import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Favorite, Back, Update } from '../svg';

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
        <h1>Créer un livre</h1>
    </div>
);

// Details navbar component
const DetailsBar = ({ props }) => (
    <div className="container nav-container">
        <Link className="button" to='/'>
            <Back />
        </Link>
        <div>
            <button type="button" onClick={() => props.toggleFavorite(props.book)}>
                <Favorite favorite={props.book.favorite} />
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
    </div>
);

// Rendering navbar component
const Navbar = ({ route, props }) => {

    // Get routes history
    const history = useHistory();

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
            <nav>
                { renderNav(route) }
            </nav>
        </header>
    );

}

export default Navbar;