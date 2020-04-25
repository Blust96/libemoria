import React from 'react'

const Read = props => (
    <svg width="20" height="20" style={props.style} viewBox="0 0 16 15" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <path fill={
            props.read === undefined ? 
            '#bb6bd9' : 
            props.read ?
            '#bb6bd9' :
            '#cacaca'
        } 
        d="M12.3563 0.825012L5.26875 7.91251L2.64375 5.28751L0 7.93126L5.26875 13.2L15 3.46876L12.3563 0.825012Z" />
    </svg>
);

export default Read;