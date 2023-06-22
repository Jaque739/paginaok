import Head from 'next/head'
import Layout from '../components/Layout.js';
import {gql, useQuery} from '@apollo/client';
import Sitio from '../components/Sitio.js';
import Link from 'next/Link.js';
import {useRouter} from 'next/router';

const OBTENER_SITIOS = gql`
    query obtenerSitio {
        obtenerSitio {
            nombre
            id
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
            creado
        }
        }

    `;




const Sitios = () => {

    const router = useRouter();
    //Consultar los productos
    const {data, loading, error} = useQuery(OBTENER_SITIOS);

     console.log(data)
     console.log(loading)
    console.log(error)
  
    if(loading) return 'Cargando.....';

    const cerrarSesion = () => {
        router.push('/loginClientes');
    
    }

    return(
        <div>
            <Layout>
            <h1 className = "text-2xl text-gray-800 font-light"> Sitios </h1>
            
            <div className='h-screen'>
            <div className="flex justify-end mt-6">
            <Link href={"/clientes"} className='bg-blue-800 font-bold uppercase text-xs text-white shadow-md rounded py-5 px-5 mt-5 mr-5 hover:bg-gray-500'>Clientes</Link>

            <button 
            onClick={() => cerrarSesion()}
            type="button"
            className= "bg-blue-800 font-bold uppercase text-xs text-white shadow-md rounded py-5 px-5 mt-5 mr-5 hover:bg-gray-500"
            >
                Cerrar Sesión
            </button>
            </div>
        <div className='grid justify-items-center '>
            <table className="table-auto shadow-md mt-10 m-10 justify-self-auto">
                <thead className="bg-gray-800">
                    <tr className="text-white">
                        <th className="w-1/5 py-2">Nombre </th>
                        <th className="w-1/5 py-2">RFC </th>
                        <th className="w-1/5 py-2">Dirección </th>
                        <th className="w-1/5 py-2"> Telefono </th>
                        <th className="w-1/5 py-2"> Horarios </th>
                      
                    </tr>
                </thead>

            <tbody className="bg-white">
            {data.obtenerSitio.map( sitio => (
                <Sitio 
                key={sitio.id}
                sitio={sitio}
                />
                
            ))}
            </tbody>
            </table>
            </div>
            </div>
            </Layout>
        </div>
    
    )
}

export default Sitios