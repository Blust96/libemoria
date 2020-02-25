import React,  { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Home navbar component
const HomeBar = () => (
    <Fragment>
        <Link to='/'>Accueil</Link>
        <Link to='/create'>Créer</Link>
    </Fragment>
);

// Create navbar component
const CreateBar = ({ history }) => (
    <Fragment>
        <button type="button" onClick={() => history.goBack()}>
            Retour
        </button>
        <h1>Créer un livre</h1>
    </Fragment>
);

// Details navbar component
const DetailsBar = ({ history, props }) => (
    <Fragment>
        <button type="button" onClick={() => history.goBack()}>
            Retour
        </button>
        <h1>{props.title}</h1>
        <button type="button" onClick={() => props.toggleFavorite(props.books, props.book)}>
            {props.book.favorite ? 'favoris' : 'pas favoris'}
        </button>
        <Link to={`/update/${props.id}`}>Modifier</Link>
    </Fragment>
);

// Update navbar component
const UpdateBar = ({ history, title }) => (
    <Fragment>
        <button type="button" onClick={() => history.goBack()}>
            Retour
        </button>
        <h1>Modifier {title}</h1>
    </Fragment>
);

// Rendering navbar component
const Navbar = ({ route, props }) => {

    // Get routes history
    const history = useHistory();

    const renderNav = (route) => {
        switch(route) {
            case 'create': 
                return <CreateBar history={history} />;
            case 'details': 
                return <DetailsBar history={history} props={props} />;
            case 'update':
                return <UpdateBar history={history} title={props.title} />
            case 'home':
            default:
                return <HomeBar />;
        }
    }

    return (
        <nav>
        { renderNav(route) }
        </nav>
    );

}

export default Navbar;