import React,  { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ route, props }) => {

    const HomeBar = (
        <Fragment>
            <Link to='/'>Accueil</Link>
            <Link to='/create'>Créer</Link>
        </Fragment>
    );

    const DetailsBar = (
        <Fragment>
            <Link to='/update'>Modifier</Link>
        </Fragment>
    )

    const renderNav = (route) => {
        switch(route) {
            case 'details': 
                return DetailsBar;
            case 'home':
            default:
                return HomeBar;
        }
    }

    return (
        <nav>
        { renderNav(route) }
        </nav>
    );

}

export default Navbar;