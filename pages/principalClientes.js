import React from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation, useQuery } from '@apollo/client';
import Layout2 from '../components/Layout2';


const OBTENER_CLIENTE = gql  `
    query obtenerUsuarioID {
        obtenerUsuarioID {
            nombre
            apellido
            email
            telefono
            us
            vendedor
       }
    }`

const  PrincipalClientes = () => {

    //obtener la Id actual
    const router = useRouter();

    //Query para obtener los datos del usuario

    const {data, loading, error} = useQuery(OBTENER_CLIENTE, );

    if (loading) return "loading..."
    const {obtenerUsuarioID} = data;

    console.log(data);

    return (
        <Layout2>
           <div className='bg-gray-00 text-center text-white text-4xl  pt-5 pb-5 '  id='Inicio' >______________</div>
            <div className="flex  h-screen mt-5">
          

<div>
      <div className="px-4 sm:px-0 ml-10">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Informacion General del Cliente</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Datos Personales</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ml-10">
            <dt className="text-sm font-medium leading-6 text-gray-900">Nombre</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{obtenerUsuarioID.nombre}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4  ml-10 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Apellido</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{obtenerUsuarioID.apellido}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4  ml-10 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Correo Electronico</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{obtenerUsuarioID.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 ml-10 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Telefono</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{obtenerUsuarioID.telefono}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 ml-10 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Usuario</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{obtenerUsuarioID.us}</dd>
          </div>
            
                
          </dl>
          </div>
</div>
            </div>
        </Layout2>
    
  )
}

export default PrincipalClientes;