import React from 'react'

const Sitio = ({sitio}) => {
    const {nombre, rfc, direc, telf, horario } = sitio;
    return(
        <tr>
            <td className='border px-4 py-2'>{nombre}</td>
            <td className='border px-4 py-2'>{rfc}</td>
            <td className='border px-4 py-2'>{direc}</td>
            <td className='border px-4 py-2'>{telf}</td>
            <td className='border px-4 py-2'>{horario}</td>
        </tr>
       

    );

}

export default Sitio;