import React, { useContext } from 'react';

import LoadingView from '../layout/LoadingView';
import EmptyBooks from './EmptyBooks';
import BookCard from './BookCard';

import BookContext from '../../context/book/BookContext';

const Books = () => {

    // Get books context
    const bookContext = useContext(BookContext);
    // const { isLoading, books } = bookContext;

    const isLoading = false;
    const books = 
        [
            {
                _id: '19EIF348UG802DF82',
                title: 'Métro 2033',
                author: 'Dmitry Dffigjigjei',
                genre: 'Science-Fiction',
                isbn: 1111-1111-2222-2222,
                description: "Vingt années se sont écoulées depuis l'apocalypse nucléaire qui a ravagé la planète, obligeant les quelques survivants à se mettre à l'abri sous terre pour fuir une surface désormais inhabitable. Réfugiés dans les souterrains du métro de Moscou, ils se sont organisés en micro sociétés et survivent tant bien que mal aux pénuries, maladies et aux guerres pour la possession des dernières ressources. Mais l'apocalypse n'a pas fait que réduire l'humanité à la déchéance. Des créatures mutantes, appelées « les Noirs » (ou les Sombres dans le jeu) nées du chaos peuplent désormais la surface de la terre menaçant directement les quelques survivants qui s'y aventurent. Pire encore, comme si les pénuries, maladies et guerres civiles ne suffisaient pas, les tunnels du métro semblent abriter de sombres et invisibles menaces : sont-elles nées de l'apocalypse ou rôdaient-elles déjà avant le cataclysme ? En 2033, le jeune Artyom, citoyen de la station VDNKh, doit avec ses camarades faire face à la menace de créatures mystérieuses venant des tunnels. La visite d'un Stalker réputé nommé Hunter va le précipiter dans une quête désespérée pour obtenir l'aide du dernier « bastion de la Civilisation », le regroupement de stations de métro « Polis ». Précipité dans les lugubres et dangereux tunnels, Artyom survivra-t-il à son voyage ? Et quelle est cette sourde menace que même les plus endurcis et les plus téméraires des Stalkers semblent craindre ?",
                coverPath: '',
                favorite: true,
                read: true,
                wish: false
            }
        ];

    // Render
    if (isLoading) 
        return <LoadingView />
    else if (books.length === 0)
        return <EmptyBooks />
    else {
        return (
            books.map(book => (
                <BookCard key={book._id} book={book} />
            ))
        )
    }

}

export default Books;