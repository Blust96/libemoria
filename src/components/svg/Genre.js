import React from 'react'

const Genre = props => {

    switch(props.genre) {

        case 'science_fiction':
            return (
                <svg width="25" height="25" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#ffffff" d="M10.8582 0.22529C11.006 0.0775062 11.2082 -0.000274658 11.4027 -0.000274658C11.6049 -0.000274658 11.7994 0.0697281 11.9549 0.22529L13.775 2.04536C14.0783 2.34871 14.0783 2.83873 13.775 3.14207L12.3516 4.56546L9.43482 1.64868L10.8582 0.22529ZM0 11.0835L8.60256 2.48094L11.5193 5.39772L2.91678 14.0003H0V11.0835Z" />
                </svg>
            )
        case 'policier':
            return (
                <svg width="25" height="25" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#ffffff" d="M10.8582 0.22529C11.006 0.0775062 11.2082 -0.000274658 11.4027 -0.000274658C11.6049 -0.000274658 11.7994 0.0697281 11.9549 0.22529L13.775 2.04536C14.0783 2.34871 14.0783 2.83873 13.775 3.14207L12.3516 4.56546L9.43482 1.64868L10.8582 0.22529ZM0 11.0835L8.60256 2.48094L11.5193 5.39772L2.91678 14.0003H0V11.0835Z" />
                </svg>
            )
        case 'thriller':
            return (
                <svg width="25" height="25" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#ffffff" d="M10.8582 0.22529C11.006 0.0775062 11.2082 -0.000274658 11.4027 -0.000274658C11.6049 -0.000274658 11.7994 0.0697281 11.9549 0.22529L13.775 2.04536C14.0783 2.34871 14.0783 2.83873 13.775 3.14207L12.3516 4.56546L9.43482 1.64868L10.8582 0.22529ZM0 11.0835L8.60256 2.48094L11.5193 5.39772L2.91678 14.0003H0V11.0835Z" />
                </svg>
            )
        case 'manga':
            return (
                <svg width="25" height="25" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#ffffff" d="M10.8582 0.22529C11.006 0.0775062 11.2082 -0.000274658 11.4027 -0.000274658C11.6049 -0.000274658 11.7994 0.0697281 11.9549 0.22529L13.775 2.04536C14.0783 2.34871 14.0783 2.83873 13.775 3.14207L12.3516 4.56546L9.43482 1.64868L10.8582 0.22529ZM0 11.0835L8.60256 2.48094L11.5193 5.39772L2.91678 14.0003H0V11.0835Z" />
                </svg>
            )
        default:
            return null;

    }

}

export default Genre;