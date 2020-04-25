import React from 'react'

const Bought = props => (
    <svg width="25" height="20" style={props.style} viewBox="0 0 40 40" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" >
        <path 
        fill={
            props.wish === undefined ? 
            '#bb6bd9' : 
            props.wish ?
            '#bb6bd9' :
            '#cacaca'
        } 
        d="M15.2,25v8.3h-5.1V25H15.2z M16.9,25v8.3H44V25H16.9z M10.2,15v8.3h27.1V15H10.2z M38.9,15v8.3H44V15H38.9z M0,33.3h2.4V38 l1.9-1.4L6.1,38v-4.7h2.4V6.7H0V33.3z M0,0v5h8.5V0H0z"/>
    </svg>
);

export default Bought;