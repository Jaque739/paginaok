import React from 'react'

const Sitio2 = ({sitio}) => {
    const {nombre, rfc, direc, telf, horario } = sitio;
    return(

        
        <tr >
            <td className='justify-center w-1/5  px-5 py-2'>{nombre}</td>
            <td className='justify-center w-1/5  px-5 py-2'>{rfc}</td>
            <td className='justify-center w-1/5  px-5 py-2'>{telf}</td>
            <td className='justify-center w-1/5  px-5 py-2'>{direc}</td>
            <td className='justify-center w-1/5  px-5 py-2'>{horario}</td>
        </tr>
       
    );

}

export default Sitio2