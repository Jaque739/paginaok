import React from 'react'

const Sitio = ({sitio}) => {
    const { nombre } = sitio;
    return(

        <h1>{nombre}</h1>
    );

}

export default Sitio;