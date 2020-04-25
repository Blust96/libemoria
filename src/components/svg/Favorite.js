import React from 'react'

const Favorite = props => {
    return props.favorite
    ? (
        <svg width="20" height="20" style={props.style} viewBox="0 0 16 15" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
            <path fill='#bb6bd9' d="M11.5191 0C10.1584 0 8.8524 0.633433 8 1.63441C7.14761 0.633433 5.84164 0 4.48093 0C2.07232 0 0.17984 1.89248 0.17984 4.30109C0.17984 7.25711 2.8387 9.66572 6.86608 13.3256L8 14.35L9.13393 13.3177C13.1613 9.66572 15.8202 7.25711 15.8202 4.30109C15.8202 1.89248 13.9277 0 11.5191 0Z" />
        </svg>
    ) : (
        <svg width="20" height="20" style={props.style} viewBox="0 0 16 15" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
            <path fill='#bb6bd9' d="M8 1.63441C8.8524 0.633433 10.1584 0 11.5191 0C13.9277 0 15.8202 1.89248 15.8202 4.30109C15.8202 7.25469 13.1657 9.66177 9.14384 13.3088L9.13393 13.3177L8 14.35L6.86608 13.3256L6.83521 13.2975C2.82511 9.6534 0.17984 7.24955 0.17984 4.30109C0.17984 1.89248 2.07232 0 4.48093 0C5.84164 0 7.14761 0.633433 8 1.63441ZM8 12.2386L8.07821 12.1604C11.8006 8.78986 14.2561 6.56112 14.2561 4.30109C14.2561 2.73706 13.0831 1.56403 11.5191 1.56403C10.3148 1.56403 9.14175 2.33823 8.7351 3.40959H7.27273C6.85826 2.33823 5.68524 1.56403 4.48093 1.56403C2.9169 1.56403 1.74387 2.73706 1.74387 4.30109C1.74387 6.56112 4.1994 8.78986 7.9218 12.1604L8 12.2386Z" />
        </svg>
    );
}

export default Favorite;