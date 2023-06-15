import React from 'react';
import Layout2 from '../components/Layout2';
import { gql, useQuery } from '@apollo/client';

const OBTENER_SITIO = gql `
    query obtenerSitioCliente{
        obtenerSitioCliente {
            nombre
            rfc
            telf
            direc
            horario
            pag_web
            fb
            ig
            form_pago
            foto_pres
            foto_menu
            foto_lugar
            cliente
        }
    }
`;

const MiSitio = () => {
    return(
        <Layout2>
            <div className='bg-gray-00 text-center text-white text-4xl  pt-5 pb-5 '  id='Inicio' >______________</div>
        <h1>Mi sitio </h1>
        </Layout2>
    )

}

export default MiSitio;