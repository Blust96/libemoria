import React from 'react';
import { Link, useHistory } from 'react-router-dom';

// Home navbar component
const HomeBar = () => (
    <section>
        <Link to='/'>Accueil</Link>
        <Link to='/create'>Créer</Link>
    </section>
);

// Create navbar component
const CreateBar = () => (
    <section>
        <Link to='/'>Retour</Link>
        <h1>Créer un livre</h1>
    </section>
);

// Details navbar component
const DetailsBar = ({ props }) => (
    <section>
        <Link to='/'>Retour</Link>
        <h1>{props.title}</h1>
        <button type="button" onClick={() => props.toggleFavorite(props.book)}>
            {props.book.favorite ? 'favoris' : 'pas favoris'}
        </button>
        <Link to={`/update/${props.id}`}>Modifier</Link>
    </section>
);

// Update navbar component
const UpdateBar = ({ history, props }) => (
    <section>
        <button type="button" onClick={() => history.goBack()}>
            Retour
        </button>
        <h1>Modifier {props.title}</h1>
    </section>
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