import React from 'react'
import Swal from 'sweetalert2';
import {gql, useMutation} from '@apollo/client';
import Router from 'next/router';
import * as Yup from 'yup';

const ELIMINAR_USUARIO = gql `
mutation eliminarUsuario($id: ID!){
    eliminarUsuario(id: $id)
  }

`;

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


const Usuario = ({usuario})  => {

    //mtation para eliminar usuario
    const [ eliminarUsuario ] = useMutation ( ELIMINAR_USUARIO, {
        update(cache) {
            //obtener una copia del objeto cache
            const { obtenerUsuariosVendedor } = cache.readQuery({ query: OBTENER_USUARIO});

            //Rescrive el cache 
            cache.writeQuery({
                query: OBTENER_USUARIO,
                data: {
                    obtenerUsuariosVendedor : obtenerUsuariosVendedor.filter( usuarioActual => usuarioActual.id !== id )
                }
            })

        }
    });

const {nombre,apellido,telefono,email,us,contra, id} = usuario;

//Elimina un usuario

    const confirmarEliminarUsuario = () => {
        Swal.fire({
            title: '¿Deseas eliminar a este usuario?',
            text: "Esta aación no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Elimanar',
          }).then(async (result) => {
            if (result.isConfirmed) {

                try {

                    //Eliminar por ID
                        const {data} = await eliminarUsuario({
                            variables: {
                                id
                            }
                        });
                        //console.log(data);
                    //Mostrar una alerta
            
                    Swal.fire(
                'Eliminado',
                data.eliminarUsuario,
                'success'
              )
                } catch (error) {
                    console.log(error);
                }
              
            }
          })
    }

    const editarUsuario = () => {
        Router.push({
            pathname:"/editarusuario/[id]",
            query:{id}
        })
    }

    return (

        <tr>
        <td className="border px-4 py-2">{nombre} {apellido}</td>
        <td className="border px-4 py-2">{telefono}</td>
        <td className="border px-4 py-2">{email}</td>
        <td className="border px-4 py-2">{us}</td>
        <td className="border px-4 py-2">{contra}</td>
        <td className="border px-4 py-2">
            <button
            type='button'
            className='bg-red-700 py-2 px-4 w-full text-white rounded '
            onClick={() => confirmarEliminarUsuario() }
            >

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

            </button>
        </td>
        <td className="border px-4 py-2">
            <button
            type='button'
            className='bg-green-600 py-2 px-4 w-full text-white rounded '
            onClick={() => editarUsuario() }
            >

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>


            </button>
        </td>

        
    </tr>

    );
    

}

export default Usuario;