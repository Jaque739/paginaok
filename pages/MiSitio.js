import React from 'react';
import Layout2 from '../components/Layout2';
import { gql, useQuery } from '@apollo/client';
import Sitio2 from '../components/sitio2';
import Sitio3 from '../components/sitio2';

const OBTENER_SITIO = gql `
    query obtenerSitioCliente{
        obtenerSitioCliente { 
            id
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

//Query para obtener los datos del usuario

const {data, loading, error} = useQuery(OBTENER_SITIO );

if (loading) return "loading..."


console.log(data);

    return(
        <Layout2>
            <div className='bg-gray-00 text-center text-white text-4xl  pt-5 pb-5 '  id='Inicio' >______________</div>

     <div>
        <div className="px-4 sm:px-0 ml-10">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Informacion General del Sitio</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Datos del Sitio</p>
        </div>
        
        <div className='grid justify-items-center '>
        <table className="table-auto shadow-md mt-10 m-10 justify-self-auto">
                <thead className="bg-white">
                    <tr className="text-black">
                        <th className="w-1/5 py-2">Nombre </th>
                        <th className="w-1/5 py-2">RFC</th>
                        <th className="w-1/5 py-2">Telefono </th>
                        <th className="w-1/5 py-2">Direccion</th>
                        <th className="w-1/5 py-2">Horarios</th>

                    </tr>
                </thead>
            <tbody className="bg-white">
            {data.obtenerSitioCliente.map( sitio => (
                <Sitio2 
                key={sitio.id}
                sitio={sitio}
                />
                
            ))}
            </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                     <th className="w-1/7 py-2">Pagina Web </th>
                    <th className="w-1/7 py-2">Facebook </th>
                     <th className="w-1/7 py-2">Instagram </th>
                     <th className="w-1/7 py-2">Forma de pago </th>
                     <th className="w-1/7 py-2">Foto de precios </th>
                     <th className="w-1/7 py-2">Foto menu </th>
                     <th className="w-1/7 py-2">Foto lugar </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
            {data.obtenerSitioCliente.map( sitio => (
                <Sitio3 
                key={sitio.id}
                sitio={sitio}
                />
                
            ))}
            </tbody>
            </table>

            </div>
      
    </div>
        </Layout2>
    )

}

export default MiSitio;