import Head from 'next/head'
import Layout from '../components/Layout.js';
import Usuario from '../components/Usuario.js';
import {gql, useQuery} from '@apollo/client';
import {useRouter} from 'next/router';
import Link from 'next/Link.js';


const OBTENER_USUARIO = gql `
query ObtenerusuariosVendedor{
    obtenerUsuariosVendedor {
      id
      nombre
      apellido
      telefono
      email
      us
      contra
    }
  }

`;


const Clientes = () => {
    const router = useRouter();
//Comsulta de apollo
const {data, loading, error} = useQuery(OBTENER_USUARIO);

console.log(data)
console.log(loading)
console.log(error)

if(loading) return 'Cargando.....';

const cerrarSesion = () => {
    router.push('/login');

}

return (


        <div >
        <Layout>
        <div className='bg-gray-00 text-center text-white text-4xl  pt-5 pb-5 '  id='Inicio' >______________</div>
            <div className='h-screen'>
            <div className="flex justify-end mt-6">
            <Link href={"/sitios"} className='bg-blue-800 font-bold uppercase text-xs text-white shadow-md rounded py-5 px-5 mt-5 mr-5 hover:bg-gray-500'>Sitios Registrados</Link>

            <Link href={"/nuevocliente"} className='bg-blue-800 font-bold uppercase text-xs text-white shadow-md rounded py-5 px-5 mt-5 mr-5 hover:bg-gray-500'>Nuevo Clientes</Link>

            <button 
            onClick={() => cerrarSesion()}
            type="button"
            className= "bg-blue-800 font-bold uppercase text-xs text-white shadow-md rounded py-5 px-5 mt-5 mr-5 hover:bg-gray-500"
            >
                Cerrar Sesión
            </button>
            </div>
        <div className='grid justify-items-stretch '>
            <table className="table-auto shadow-md mt-10 m-10 justify-self-auto">
                <thead className="bg-gray-800">
                    <tr className="text-white">
                        <th className="w-1/4 py-2">Nombre </th>
                        <th className="w-1/4 py-2">Telefono </th>
                        <th className="w-1/4 py-2">Email </th>
                        <th className="w-1/4 py-2">Usuario </th>
                        <th className="w-1/4 py-2">Contraseña </th>
                        <th className="w-1/4 py-2">Eliminar </th>
                        <th className="w-1/4 py-2">Editar </th>
                    </tr>

                </thead>
            <tbody className="bg-white">
            {data.obtenerUsuariosVendedor.map( usuario => (
                <Usuario 
                key={usuario.id}
                usuario={usuario}
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
    


export default Clientes;